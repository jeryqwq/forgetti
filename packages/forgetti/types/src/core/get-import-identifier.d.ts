import type * as babel from '@babel/core';
import type * as t from '@babel/types';
import type { ImportDefinition } from './presets';
import type { StateContext } from './types';
export default function getImportIdentifier(ctx: StateContext, path: babel.NodePath, definition: ImportDefinition): t.Identifier;
