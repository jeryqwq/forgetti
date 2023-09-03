import type * as babel from '@babel/core';
import type { ComponentNode, StateContext } from './types';
export default function optimizeJSX(ctx: StateContext, path: babel.NodePath<ComponentNode>): void;
