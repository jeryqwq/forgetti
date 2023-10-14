/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import type * as babel from '@babel/core';
import * as t from '@babel/types';
import {
  isComponent,
  isComponentValid,
  getImportSpecifierName,
  isHookOrComponentName,
  shouldSkipNode,
} from './core/checks';
import Optimizer from './core/optimizer';
import type {
  HookRegistration,
  ImportDefinition,
  Options,
} from './core/presets';
import {
  PRESETS,
} from './core/presets';
import type { StateContext, State } from './core/types';
import unwrapNode from './core/unwrap-node';
import unwrapPath from './core/unwrap-path';
import { expandExpressions } from './core/expand-expressions';
import { inlineExpressions } from './core/inline-expressions';
import { simplifyExpressions } from './core/simplify-expressions';
import optimizeJSX from './core/optimize-jsx';
import generate from "@babel/generator";

export type { Options };

function registerHookSpecifiers(
  ctx: StateContext,
  path: babel.NodePath<t.ImportDeclaration>,
  hook: HookRegistration,
): void {
  let specifier: typeof path.node.specifiers[0];
  for (let i = 0, len = path.node.specifiers.length; i < len; i++) {
    specifier = path.node.specifiers[i];
    switch (specifier.type) {
      case 'ImportDefaultSpecifier':
        if (hook.kind === 'default') {
          ctx.registrations.hooks.identifiers.set(specifier.local, hook);
        }
        break;
      case 'ImportNamespaceSpecifier': {
        let current = ctx.registrations.hooks.namespaces.get(specifier.local);
        if (!current) {
          current = [];
        }
        current.push(hook);
        ctx.registrations.hooks.namespaces.set(specifier.local, current);
      }
        break;
      case 'ImportSpecifier':
        if (
          (
            hook.kind === 'named'
            && getImportSpecifierName(specifier) === hook.name
          )
          || (
            hook.kind === 'default'
            && getImportSpecifierName(specifier) === 'default'
          )
        ) {
          ctx.registrations.hooks.identifiers.set(specifier.local, hook);
        }
        break;
      default:
        break;
    }
  }
}

function registerHOCSpecifiers(
  ctx: StateContext,
  path: babel.NodePath<t.ImportDeclaration>,
  hoc: ImportDefinition,
): void {
  let specifier: typeof path.node.specifiers[0];
  for (let i = 0, len = path.node.specifiers.length; i < len; i++) {
    specifier = path.node.specifiers[i];
    switch (specifier.type) {
      case 'ImportDefaultSpecifier':
        if (hoc.kind === 'default') {
          ctx.registrations.hocs.identifiers.set(specifier.local, hoc);
        }
        break;
      case 'ImportNamespaceSpecifier': {
        let current = ctx.registrations.hocs.namespaces.get(specifier.local);
        if (!current) {
          current = [];
        }
        current.push(hoc);
        ctx.registrations.hocs.namespaces.set(specifier.local, current);
      }
        break;
      case 'ImportSpecifier':
        if (
          (
            hoc.kind === 'named'
            && getImportSpecifierName(specifier) === hoc.name
          )
          || (
            hoc.kind === 'default'
            && getImportSpecifierName(specifier) === 'default'
          )
        ) {
          ctx.registrations.hocs.identifiers.set(specifier.local, hoc);
        }
        break;
      default:
        break;
    }
  }
}

function extractImportIdentifiers(
  ctx: StateContext,
  path: babel.NodePath<t.ImportDeclaration>,
): void {
  const mod = path.node.source.value;

  // Identify hooks
  let hook: HookRegistration;
  const { imports } = ctx.preset;
  for (let i = 0, len = imports.hooks.length; i < len; i++) {
    hook = imports.hooks[i];
    if (mod === hook.source) {
      registerHookSpecifiers(ctx, path, hook);
    }
  }
  // Identify hocs
  let hoc: ImportDefinition;
  for (let i = 0, len = imports.hocs.length; i < len; i++) {
    hoc = imports.hocs[i];
    if (mod === hoc.source) {
      registerHOCSpecifiers(ctx, path, hoc);
    }
  }
}

type Argument =
  | t.Expression
  | t.ArgumentPlaceholder
  | t.JSXNamespacedName
  | t.SpreadElement
  | t.FunctionDeclaration;

function transformFunction(
  ctx: StateContext,
  path: babel.NodePath<Argument>,
  checkName: boolean,
): void {
  const unwrapped = unwrapPath(path, isComponent);
  if (unwrapped && isComponentValid(ctx, unwrapped.node, checkName)) {
    if (unwrapped.node.async || unwrapped.node.generator) {
      return;
    }
    if (!checkName && unwrapped.node.type !== 'ArrowFunctionExpression') {
      unwrapped.node.id = undefined;
    }
    const {code: initCode} =  generate.default(unwrapped.node);
    // inline expressions
    inlineExpressions(unwrapped);
    const {code: inlineCode} =  generate.default(unwrapped.node);
    simplifyExpressions(unwrapped); // 简化表达式
    const {code: isimplifyCode} =  generate.default(unwrapped.node);
    // expand for assignment and hook calls
    expandExpressions(ctx, unwrapped);
    const { code: expandCode } =  generate.default(unwrapped.node);
    optimizeJSX(ctx, unwrapped); // 修改组件jsx部分生成HOC，把所有jsx依赖的状态转换为参数传入，后续替换对应的value并添加cache逻辑， return (/*@forgetti jsx*/<_Memo v={[() => setDone(true), a, done ? 'finish' : 'doing']} />  );}
    const { code: optimizeJSXCode } =  generate.default(unwrapped.node);
    // optimize
    new Optimizer(ctx, unwrapped).optimize(); // 全文核心，缓存所有表达式函数变量
    const { code: optimizeedCode } =  generate.default(unwrapped.node);
    // inline again
    inlineExpressions(unwrapped);
    const { code: inlineCode_2 } = generate.default(unwrapped.node);
  }
}

function transformHOC(
  ctx: StateContext,
  path: babel.NodePath<t.CallExpression>,
): void {
  if (path.node.arguments.length === 0) {
    return;
  }
  // Check if callee is potentially a named or default import
  const trueID = unwrapNode(path.node.callee, t.isIdentifier);
  if (trueID) {
    const binding = path.scope.getBindingIdentifier(trueID.name);
    if (binding) {
      const registration = ctx.registrations.hocs.identifiers.get(binding);
      if (registration) {
        transformFunction(ctx, path.get('arguments')[0], false);
      }
    }
  // Check if callee is potentially a namespace import
  }
  const trueMember = unwrapNode(path.node.callee, t.isMemberExpression);
  if (
    trueMember
    && !trueMember.computed
    && trueMember.property.type === 'Identifier'
  ) {
    const obj = unwrapNode(trueMember.object, t.isIdentifier);
    if (obj) {
      const binding = path.scope.getBindingIdentifier(obj.name);
      if (binding) {
        const registrations = ctx.registrations.hocs.namespaces.get(binding);
        if (registrations) {
          const propName = trueMember.property.name;
          let registration: typeof registrations[0];
          for (let i = 0, len = registrations.length; i < len; i++) {
            registration = registrations[i];
            if (registration.kind === 'default') {
              if (propName === 'default') {
                transformFunction(ctx, path.get('arguments')[0], false);
              }
            } else if (registration && registration.name === propName) {
              transformFunction(ctx, path.get('arguments')[0], false);
            }
          }
        }
      }
    }
  }
}

function transformVariableDeclarator(
  ctx: StateContext,
  path: babel.NodePath<t.VariableDeclarator>,
): void {
  if (
    path.node.init
    && path.node.id.type === 'Identifier'
    && isHookOrComponentName(ctx, path.node.id)
    && !shouldSkipNode(path.node)
    && (
      path.parent.type === 'VariableDeclaration'
        ? !shouldSkipNode(path.parent)
        : true
    )
  ) {
    transformFunction(ctx, path.get('init') as babel.NodePath<Argument>, false);
  }
}

export default function forgettiPlugin(): babel.PluginObj<State> {
  return {
    name: 'forgetti',
    visitor: {
      Program(programPath, { opts }): void {
        const preset = typeof opts.preset === 'string' ? PRESETS[opts.preset] : opts.preset;
        const ctx: StateContext = {
          imports: new Map(),
          registrations: {
            hooks: {
              identifiers: new Map(),
              namespaces: new Map(),
            },
            hocs: {
              identifiers: new Map(),
              namespaces: new Map(),
            },
          },
          preset,
          filters: {
            component: new RegExp(
              preset.filters.component.source,
              preset.filters.component.flags,
            ),
            hook: preset.filters.hook
              ? new RegExp(preset.filters.hook.source, preset.filters.hook.flags)
              : undefined,
          },
        };

        // Register all import specifiers
        programPath.traverse({
          ImportDeclaration(path) {
            extractImportIdentifiers(ctx, path);
          },
        });

        programPath.traverse({
          // Check for HOCs
          CallExpression(path) {
            transformHOC(ctx, path);
          },
          FunctionDeclaration(path) {
            transformFunction(ctx, path, true);
          },
          FunctionExpression(path) {
            transformFunction(ctx, path, true);
          },
          VariableDeclarator(path) {
            transformVariableDeclarator(ctx, path);
          },
        });
      },
    },
  };
}
