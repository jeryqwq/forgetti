import type * as babel from '@babel/core';
import * as t from '@babel/types';
import type { HookIdentity } from './presets';
import type { StateContext } from './types';
type HookCallType = HookIdentity | 'custom' | 'none';
export declare function getHookCallType(ctx: StateContext, path: babel.NodePath<t.CallExpression | t.OptionalCallExpression>): HookCallType;
export {};
