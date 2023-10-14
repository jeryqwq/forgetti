/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import * as t from '@babel/types';
import type * as babel from '@babel/core';
import type { ComponentNode, StateContext } from './types';
import { getHookCallType } from './get-hook-call-type';
import { isPathValid } from './checks';
import unwrapNode from './unwrap-node';

function isStatementValid(path: babel.NodePath): boolean {
  if (path) {
    switch (path.node.type) {
      case 'ForInStatement':
      case 'ForOfStatement':
      case 'ForStatement':
      case 'WhileStatement':
      case 'DoWhileStatement':
        return false;
      default:
        return true;
    }
  }
  return false;
}

function isInValidExpression(path: babel.NodePath): boolean {
  let current = path.parentPath;
  let prev = path;
  while (current) {
    if (
      isPathValid(current, t.isConditionalExpression)
      && (
        current.get('consequent').node === prev.node
        || current.get('alternate').node === prev.node
      )
    ) {
      return false;
    }
    if (
      isPathValid(current, t.isLogicalExpression)
      && current.get('right').node === prev.node
    ) {
      return false;
    }
    prev = current;
    current = current.parentPath;
  }
  return true;
}

const UNDEFINED_LITERAL = t.unaryExpression('void', t.numericLiteral(0));

function transformOptionalCall(path: babel.NodePath<t.OptionalCallExpression>): t.Expression {
  const unwrappedID = unwrapNode(path.node.callee, t.isIdentifier);
  if (unwrappedID) { // 如果是定义的函数， 感觉没多大意义， 对一个已经定义的函数加可选链，这里也做了适配。
    return t.conditionalExpression( // 创建一个三元表达式
      t.binaryExpression( // 包一个二元表达式 unwrappedID == null;
        '==', // 一整句三元表达式为 unwrappedID == null ? void 0 : unwrappedID.call(xxx,xxx);
        unwrappedID,
        t.nullLiteral(),
      ),
      UNDEFINED_LITERAL,
      t.callExpression(
        unwrappedID,
        path.node.arguments,
      ),
    );
  }// 如果不是定义的参数，例如：外部传入，或者其他模块引入等
  const temp = path.scope.generateUidIdentifier('nullish'); // 创建一个临时变量
  path.scope.push({ // 生成变量定义语句 let nullish
    kind: 'let',
    id: temp,
  });
  const unwrappedCallee = unwrapNode(path.node.callee, t.isMemberExpression)
    || unwrapNode(path.node.callee, t.isOptionalMemberExpression);
  if (unwrappedCallee) {
    let unwrappedObject = unwrapNode(unwrappedCallee.object, t.isIdentifier);
    if (!unwrappedObject) { // 如果是b?.()
      unwrappedObject = path.scope.generateUidIdentifier('object');
      path.scope.push({
        kind: 'let',
        id: unwrappedObject,
      });
      unwrappedCallee.object = t.assignmentExpression('=', unwrappedObject, unwrappedCallee.object);
    } // 如果是a.b?.()
    return t.conditionalExpression(
      t.binaryExpression( //  _hoisted == null ? void 0 : _nullish.call(props, props.b, props.c)
        '==',
        t.assignmentExpression('=', temp, unwrappedCallee), // 生成赋值语句  nullish = a.b
        t.nullLiteral(),
      ),
      UNDEFINED_LITERAL,
      t.callExpression(
        t.memberExpression(temp, t.identifier('call')),
        [unwrappedObject, ...path.node.arguments],
      ),
    );
  }
  return t.conditionalExpression( //   _nullish ? void 0 : _nullish(xxx)
    t.binaryExpression(
      '==',
      t.assignmentExpression('=', temp, path.node.callee),
      t.nullLiteral(),
    ),
    UNDEFINED_LITERAL,
    t.callExpression(
      temp,
      path.node.arguments,
    ),
  );
}

function transformOptionalMember(path: babel.NodePath<t.OptionalMemberExpression>): t.Expression {
  const unwrappedID = unwrapNode(path.node.object, t.isIdentifier);
  if (unwrappedID) {
    return t.conditionalExpression(
      t.binaryExpression(
        '==',
        unwrappedID,
        t.nullLiteral(),
      ),
      UNDEFINED_LITERAL,
      t.memberExpression(
        unwrappedID,
        path.node.property,
        path.node.computed,
      ),
    );
  }
  const temp = path.scope.generateUidIdentifier('nullish');
  path.scope.push({
    kind: 'let',
    id: temp,
  });
  return t.conditionalExpression(
    t.binaryExpression(
      '==',
      t.assignmentExpression('=', temp, path.node.object),
      t.nullLiteral(),
    ),
    UNDEFINED_LITERAL,
    t.memberExpression(
      temp,
      path.node.property,
      path.node.computed,
    ),
  );
}

export function expandExpressions(
  ctx: StateContext,
  path: babel.NodePath<ComponentNode>,
): void {
  if (path.node.type === 'ArrowFunctionExpression' && path.node.body.type !== 'BlockStatement') {
    path.node.body = t.blockStatement( // 如果是箭头函数或者没有加{}的函数， 手动添加一个{}, 用来写入缓存代码
      [t.returnStatement(path.node.body)],
    );
  }
  path.traverse({
    OptionalCallExpression(p) { // 可选链函数调用
      const parent = p.getFunctionParent();
      const statement = p.getStatementParent();

      if (
        parent === path
        && statement
      ) {
        p.replaceWith(transformOptionalCall(p));
      }
    },
    OptionalMemberExpression(p) { // 可选链访问
      const parent = p.getFunctionParent();
      const statement = p.getStatementParent();

      if (
        parent === path
        && statement
      ) {
        p.replaceWith(transformOptionalMember(p));
      }
    },
    AssignmentExpression(p) {
      const parent = p.getFunctionParent();
      const statement = p.getStatementParent();

      if (
        parent === path
        && statement
        && isStatementValid(statement)
        && isInValidExpression(p)
        && !isPathValid(p.parentPath, t.isStatement)
        && !isPathValid(p.parentPath, t.isVariableDeclarator)
      ) {
        const id = p.scope.generateUidIdentifier('hoisted');
        statement.insertBefore(
          t.variableDeclaration(
            'let',
            [t.variableDeclarator(id, p.node)],
          ),
        );
        p.replaceWith(id);
      }
    },
    CallExpression(p) {
      const parent = p.getFunctionParent();
      const statement = p.getStatementParent();

      if (
        parent === path
        && statement
        && !isPathValid(p.parentPath, t.isStatement)
        && !isPathValid(p.parentPath, t.isVariableDeclarator)
      ) {
        const hookType = getHookCallType(ctx, p);
        if (hookType === 'custom' || hookType === 'effect') {
          const id = p.scope.generateUidIdentifier('hoisted');
          statement.insertBefore(
            t.variableDeclaration(
              'let',
              [t.variableDeclarator(id, p.node)],
            ),
          );
          p.replaceWith(id);
        }
      }
    },
  });

  path.scope.crawl();
}
