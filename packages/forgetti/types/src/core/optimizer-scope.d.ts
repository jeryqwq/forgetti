import * as t from '@babel/types';
import type { OptimizedExpression, StateContext } from './types';
export default class OptimizerScope {
    memo: t.Identifier | undefined;
    ref: t.Identifier | undefined;
    indecesMemo: number;
    indecesRef: number;
    ctx: StateContext;
    path: babel.NodePath;
    parent?: OptimizerScope;
    isInLoop?: boolean;
    statements: t.Statement[];
    constructor(ctx: StateContext, path: babel.NodePath, parent?: OptimizerScope, isInLoop?: boolean);
    createHeader(type?: 'memo' | 'ref'): t.Identifier;
    createIndex(type: 'memo' | 'ref'): t.NumericLiteral;
    getMemoDeclarations(): t.VariableDeclaration[] | undefined;
    loop: t.Identifier | undefined;
    loopIndex: t.Identifier | undefined;
    createLoopHeader(): t.Identifier;
    createLoopIndex(): t.Identifier;
    getLoopMemoDeclaration(): t.VariableDeclaration | undefined;
    getLoopDeclaration(): t.VariableDeclaration;
    getStatements(): t.Statement[];
    push(...statements: t.Statement[]): void;
    optimizedID: WeakMap<t.Identifier, OptimizedExpression>;
    setOptimized(key: t.Identifier, value: OptimizedExpression): void;
    getOptimized(key: t.Identifier): OptimizedExpression | undefined;
    deleteOptimized(key: t.Identifier): void;
    constants: WeakSet<t.Identifier>;
    addConstant(value: t.Identifier): void;
    hasConstant(value: t.Identifier): boolean;
}
