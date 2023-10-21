import type * as babel from '@babel/core';
import * as t from '@babel/types';
import type { ComponentNode, StateContext } from './types';
import getImportIdentifier from './get-import-identifier';
import { RUNTIME_MEMO } from './imports';
import { shouldSkipJSX, isPathValid } from './checks';
import type { ImportDefinition } from './presets';

interface JSXReplacement {
  id: t.Identifier;
  value: t.Expression;
}

interface State {
  // Identifier of the value argument
  source: t.Identifier;
  // List of dependency expressions
  expressions: t.Expression[];
  // List of JSX replacements
  jsxs: JSXReplacement[];
  // key
  key?: t.Expression;
}

function getJSXIdentifier(
  el: babel.NodePath<t.JSXIdentifier | t.JSXNamespacedName | t.JSXMemberExpression>,
): babel.NodePath<t.JSXIdentifier | t.JSXNamespacedName> {
  if (isPathValid(el, t.isJSXMemberExpression)) {
    return getJSXIdentifier(el.get('object'));
  }
  return el as babel.NodePath<t.JSXIdentifier | t.JSXNamespacedName>;
}

function extractJSXExpressions(
  path: babel.NodePath<t.JSXElement | t.JSXFragment>,
  state: State,
  top: boolean,
): void {
  // Iterate attributes
  if (isPathValid(path, t.isJSXElement)) {
    const openingElement = path.get('openingElement');
    const openingName = openingElement.get('name');
    const trueOpeningName = getJSXIdentifier(openingName);
    const isJSXMember = isPathValid(openingName, t.isJSXMemberExpression);
    if (isPathValid(trueOpeningName, t.isJSXIdentifier)) {
      if (isJSXMember || /^[A-Z_]/.test(trueOpeningName.node.name)) { // 当前jsx是组件 , 例如 const a = <App1 />
        const id = path.scope.generateUidIdentifier('Component');
        const index = state.expressions.length;
        state.expressions.push(t.identifier(trueOpeningName.node.name));
        state.jsxs.push({ // 生成缓存values[index]下标的变量
          id,
          value: t.memberExpression(
            state.source,
            t.numericLiteral(index),
            true,
          ),
        });
        const replacement = t.jsxIdentifier(id.name);
        trueOpeningName.replaceWith(replacement);

        const closingElement = path.get('closingElement');
        if (isPathValid(closingElement, t.isJSXClosingElement)) {
          const closingName = getJSXIdentifier(closingElement.get('name'));
          closingName.replaceWith(replacement);
        }
      }
    }
    const attrs = openingElement.get('attributes'); // 获取jsx attributes 处理表达式缓存 <App a={props.a}/>
    for (let i = 0, len = attrs.length; i < len; i++) { // 使用values[index]对应的下标索引替换attributes
      const attr = attrs[i];

      if (isPathValid(attr, t.isJSXAttribute)) {
        const key = attr.get('name');
        if (top && isPathValid(key, t.isJSXIdentifier) && key.node.name === 'key') { // 参数为key的时候 <div key={'123'}></div>
          const value = attr.get('value');
          if (isPathValid(value, t.isExpression)) {
            state.key = value.node;
          } else if (isPathValid(value, t.isJSXExpressionContainer)) {
            const expr = value.get('expression');
            if (isPathValid(expr, t.isExpression)) {
              state.key = expr.node;
              attr.remove();
            }
          }
        } else {
          const value = attr.get('value');
          if (isPathValid(value, t.isJSXElement) || isPathValid(value, t.isJSXFragment)) { // 如果value还是jsx， 递归优化 <div a={<div b={{}}></div>}></div>
            extractJSXExpressions(value, state, false);
          }
          if (isPathValid(value, t.isJSXExpressionContainer)) {
            const expr = value.get('expression');
            if (isPathValid(expr, t.isJSXElement) || isPathValid(expr, t.isJSXFragment)) { // 奇葩的情况，不知道啥时候会出现
              extractJSXExpressions(expr, state, false);
            } else if (isPathValid(expr, t.isExpression)) { // 替换表达式values对应的索引， props.a -> value[i]
              const id = state.expressions.length;
              state.expressions.push(expr.node);
              expr.replaceWith(
                t.memberExpression(
                  state.source,
                  t.numericLiteral(id),
                  true,
                ),
              );
            }
          }
        }
      }
      if (isPathValid(attr, t.isJSXSpreadAttribute)) {
        const arg = attr.get('argument');
        if (isPathValid(arg, t.isJSXElement) || isPathValid(arg, t.isJSXFragment)) {
          extractJSXExpressions(arg, state, false);
        } else {
          const id = state.expressions.length;
          state.expressions.push(arg.node);
          arg.replaceWith(
            t.memberExpression(
              state.source,
              t.numericLiteral(id),
              true,
            ),
          );
        }
      }
    }
  }

  const children = path.get('children'); //  处理children表达式缓存 <div>{a.b} {a.b + c}</div> ， 核心和上述一致
  for (let i = 0, len = children.length; i < len; i++) {
    const child = children[i];

    if (isPathValid(child, t.isJSXElement) || isPathValid(child, t.isJSXFragment)) {
      extractJSXExpressions(child, state, false);
    } else if (isPathValid(child, t.isJSXExpressionContainer)) {
      const expr = child.get('expression');
      if (isPathValid(expr, t.isJSXElement) || isPathValid(expr, t.isJSXFragment)) {
        extractJSXExpressions(expr, state, false);
      } else if (isPathValid(expr, t.isExpression)) {
        const id = state.expressions.length; // 下标每一次push后都+1
        state.expressions.push(expr.node);
        expr.replaceWith( // 使用_values+下标 动态替换对应的表达式
          t.memberExpression(
            state.source,
            t.numericLiteral(id), // 对应的下标
            true,
          ),
        );
      }
    } else if (isPathValid(child, t.isJSXSpreadChild)) { // children还是jsx的话
      const arg = child.get('expression'); // 参数还是jsx的话， 缓存参数内的jsx
      if (isPathValid(arg, t.isJSXElement) || isPathValid(arg, t.isJSXFragment)) {
        extractJSXExpressions(arg, state, false);
      } else { // 这里参数就还是表达式
        const id = state.expressions.length;
        state.expressions.push(arg.node);
        arg.replaceWith(
          t.memberExpression(
            state.source,
            t.numericLiteral(id),
            true,
          ),
        );
      }
    }
  }
}

function transformJSX(
  ctx: StateContext,
  path: babel.NodePath<t.JSXElement | t.JSXFragment>,
  memoDefinition: ImportDefinition,
): void {
  if (shouldSkipJSX(path.node)) {
    return;
  }
  const state: State = {
    source: path.scope.generateUidIdentifier('values'), // 初始化存储所有jsx依赖的变量value, 组件会传入一个数组渲染 
    expressions: [],
    jsxs: [],
  };
  extractJSXExpressions(path, state, true); // 获取jsx内的表达式依赖，并使用source去替换对应的下标缓存

  const memoComponent = path.scope.generateUidIdentifier('Memo'); // 生成定义缓存组件标识_Memo

  let body: t.Expression | t.BlockStatement;
  if (state.jsxs.length) {
    const declarations: t.VariableDeclarator[] = [];
    for (let i = 0, len = state.jsxs.length; i < len; i++) {
      declarations.push(t.variableDeclarator(
        state.jsxs[i].id,
        state.jsxs[i].value,
      ));
    }
    body = t.blockStatement([
      t.variableDeclaration('const', declarations),
      t.returnStatement(path.node),
    ]);
  } else {
    body = path.node;
  }
  path.scope.getProgramParent().push({ // 当前组件父作用域申明缓存的组件 _Memo1
    kind: 'const',
    id: memoComponent,
    init: t.callExpression( // 赋值为一个执行函数
      getImportIdentifier( // 当前执行的函数来自import语句 import {$$memo} from 'forgetti/runtime'
        ctx,
        path,
        RUNTIME_MEMO,
      ),
      [
        getImportIdentifier( // 对一个参数传入react 的memo函数
          ctx,
          path,
          memoDefinition,
        ),
        t.arrowFunctionExpression( // 第二个传输传入转换后的jsx函数, values => <div>{values[0]}: {value[1]}</div>
          [state.source],
          body, // 此时的body已经是替换转换后的values缓存下标
        ),
      ],
    ),
  });

  const attrs = [];

  if (state.key) {
    attrs.push(
      t.jsxAttribute(
        t.jsxIdentifier('key'),
        t.jsxExpressionContainer(
          state.key,
        ),
      ),
    );
  }

  attrs.push( // 在此之前缓存的jsx已经被提到父级作用域了， 并为一个Memo组件, _Memo = _$$memo(memo, vlaues=> <div>{values[1]}</dvi>))
    t.jsxAttribute( // 生成替换缓存的渲染函数 <Memo v={values}/>
      t.jsxIdentifier('v'),
      t.jsxExpressionContainer(
        t.arrayExpression(state.expressions),
      ),
    ),
  );

  path.replaceWith(
    t.addComment( // 添加注释 /** @forgetti jsx  */
      t.jsxElement(
        t.jsxOpeningElement( // 添加attrs内的缓存函数 _Memox
          t.jsxIdentifier(memoComponent.name),
          attrs,
          true,
        ),
        t.jsxClosingElement(
          t.jsxIdentifier(memoComponent.name),
        ),
        [],
        true,
      ),
      'leading',
      '@forgetti jsx',
      false,
    ),
  );
}

export default function optimizeJSX(
  ctx: StateContext,
  path: babel.NodePath<ComponentNode>,
): void {
  const memoDefinition = ctx.preset.runtime.memo;
  if (memoDefinition) {
    path.traverse({
      JSXElement(p) {
        transformJSX(ctx, p, memoDefinition);
      },
      JSXFragment(p) {
        transformJSX(ctx, p, memoDefinition);
      },
    });
    path.scope.crawl();
  }
}
