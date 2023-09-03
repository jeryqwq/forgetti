import type * as babel from '@babel/core';
import * as t from '@babel/types';
import OptimizerScope from './optimizer-scope';
import type { ComponentNode, OptimizedExpression, StateContext } from './types';
export default class Optimizer {
    ctx: StateContext;
    path: babel.NodePath<ComponentNode>;
    scope: OptimizerScope;
    nodeConstantCheckCache: WeakMap<babel.NodePath<babel.types.Expression>, boolean>;
    constructor(ctx: StateContext, path: babel.NodePath<ComponentNode>);
    /**
     * This method declares the memoized value
     * - if the dependencies is an expression, the expression is used
     *   as the memoization condition
     * - if the dependencies is an array, the array is combined with
     *   logical AND into a single expression
     * - if the dependencies is `true`, then this expression is to be
     *   memoized as a "constant" (aka one-time generation)
     * - if the dependencies is `false`, then it means that it is being
     *   used as a dependency and so it must be compared to its memoized
     *   version.
     */
    createMemo(current: t.Expression, dependencies?: t.Expression | (t.Expression | undefined)[] | boolean, type?: 'memo' | 'ref'): OptimizedExpression;
    dependency: WeakMap<babel.types.Expression, OptimizedExpression>;
    /**
     * Registers a dependency
     */
    createDependency<T extends t.Expression>(path: babel.NodePath<T>): OptimizedExpression | undefined;
    memoizeIdentifier(path: babel.NodePath, id: t.Identifier): OptimizedExpression;
    optimizeIdentifier(path: babel.NodePath<t.Identifier>): OptimizedExpression;
    memoizeMemberExpression(path: babel.NodePath<t.MemberExpression>): {
        expr: t.MemberExpression;
        deps: t.Expression[];
    };
    optimizeMemberExpression(path: babel.NodePath<t.MemberExpression>): OptimizedExpression;
    optimizeConditionalExpression(path: babel.NodePath<t.ConditionalExpression>): OptimizedExpression;
    optimizeBinaryExpression(path: babel.NodePath<t.BinaryExpression>): OptimizedExpression;
    optimizeLogicalExpression(path: babel.NodePath<t.LogicalExpression>): OptimizedExpression;
    optimizeUnaryExpression(path: babel.NodePath<t.UnaryExpression>): OptimizedExpression;
    optimizeEffect(path: babel.NodePath<t.CallExpression>): OptimizedExpression;
    optimizeCallback(path: babel.NodePath<t.CallExpression>): OptimizedExpression;
    optimizeMemo(path: babel.NodePath<t.CallExpression>): OptimizedExpression;
    optimizeRef(path: babel.NodePath<t.CallExpression>): OptimizedExpression;
    optimizeCallExpression(path: babel.NodePath<t.CallExpression>): OptimizedExpression;
    optimizeFunctionExpression(path: babel.NodePath<t.ArrowFunctionExpression | t.FunctionExpression>): OptimizedExpression;
    optimizeLVal(path: babel.NodePath<t.LVal>, dirty?: boolean): {
        expr: t.LVal;
        deps?: t.Expression | t.Expression[];
    };
    optimizeAssignmentExpression(path: babel.NodePath<t.AssignmentExpression>): OptimizedExpression;
    optimizeArrayExpression(path: babel.NodePath<t.ArrayExpression | t.TupleExpression>): OptimizedExpression;
    optimizeObjectExpression(path: babel.NodePath<t.ObjectExpression | t.RecordExpression>): OptimizedExpression;
    optimizeNewExpression(path: babel.NodePath<t.NewExpression>): OptimizedExpression;
    optimizeSequenceExpression(path: babel.NodePath<t.SequenceExpression>): OptimizedExpression;
    memoizeTemplateLiteral(path: babel.NodePath<t.TemplateLiteral>): {
        expr: t.TemplateLiteral;
        deps: t.Expression[];
    };
    optimizeTemplateLiteral(path: babel.NodePath<t.TemplateLiteral>): OptimizedExpression;
    optimizedTaggedTemplateExpression(path: babel.NodePath<t.TaggedTemplateExpression>): OptimizedExpression;
    memoizeJSXChildren(path: babel.NodePath<t.JSXFragment | t.JSXElement>): t.Expression[];
    optimizeJSXFragment(path: babel.NodePath<t.JSXFragment>): OptimizedExpression;
    optimizeJSXElement(path: babel.NodePath<t.JSXElement>): OptimizedExpression;
    optimizeExpression(path: babel.NodePath<t.Expression>): OptimizedExpression;
    optimizeExpressionStatement(path: babel.NodePath<t.ExpressionStatement>): void;
    optimizeVariableDeclaration(path: babel.NodePath<t.VariableDeclaration>): void;
    optimizeReturnStatement(path: babel.NodePath<t.ReturnStatement>): void;
    optimizeThrowStatement(path: babel.NodePath<t.ThrowStatement>): void;
    private optimizeBlock;
    optimizeBlockStatement(path: babel.NodePath<t.BlockStatement>, topBlock?: boolean): void;
    optimizeIfStatement(path: babel.NodePath<t.IfStatement>): void;
    optimizeLoopStatement(path: babel.NodePath<t.Loop>): void;
    optimizeForXStatement(path: babel.NodePath<t.ForXStatement>): void;
    optimizeSwitchStatement(path: babel.NodePath<t.SwitchStatement>): void;
    optimizeTryStatement(path: babel.NodePath<t.TryStatement>): void;
    optimizeLabeledStatement(path: babel.NodePath<t.LabeledStatement>): void;
    optimizeStatement(path: babel.NodePath<t.Statement>, topBlock?: boolean): void;
    optimizeArrowComponent(path: babel.NodePath<t.ArrowFunctionExpression>): void;
    optimizeFunctionComponent(path: babel.NodePath<t.FunctionExpression | t.FunctionDeclaration>): void;
    optimize(): void;
}
