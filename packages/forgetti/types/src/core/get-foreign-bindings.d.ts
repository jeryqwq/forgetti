import type * as babel from '@babel/core';
import * as t from '@babel/types';
export declare function isForeignBinding(source: babel.NodePath, current: babel.NodePath, name: string): boolean;
export default function getForeignBindings(path: babel.NodePath): t.Identifier[];
