import type * as babel from '@babel/core';
import type { ComponentNode, StateContext } from './types';
export declare function expandExpressions(ctx: StateContext, path: babel.NodePath<ComponentNode>): void;
