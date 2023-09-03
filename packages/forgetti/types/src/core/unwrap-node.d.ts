import type * as t from '@babel/types';
type TypeCheck<K> = K extends (node: t.Node) => node is (infer U extends t.Node) ? U : never;
type TypeFilter = (node: t.Node) => boolean;
export default function unwrapNode<K extends TypeFilter>(node: t.Node, key: K): TypeCheck<K> | undefined;
export {};
