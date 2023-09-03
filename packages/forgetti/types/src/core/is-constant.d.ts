import type * as babel from '@babel/core';
import * as t from '@babel/types';
import type OptimizerScope from './optimizer-scope';
import type { ComponentNode, StateContext } from './types';
interface OptimizerInstance {
    ctx: StateContext;
    scope: OptimizerScope;
    path: babel.NodePath<ComponentNode>;
    nodeConstantCheckCache: WeakMap<babel.NodePath<t.Expression>, boolean>;
}
export default function isConstant(instance: OptimizerInstance, path: babel.NodePath<t.Expression>): boolean;
export {};
