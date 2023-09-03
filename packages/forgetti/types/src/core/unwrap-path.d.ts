import type * as t from '@babel/types';
type TypeFilter<V extends t.Node> = (node: t.Node) => node is V;
export default function unwrapPath<V extends t.Node>(path: unknown, key: TypeFilter<V>): babel.NodePath<V> | undefined;
export {};
