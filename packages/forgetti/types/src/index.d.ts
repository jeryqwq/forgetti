import type * as babel from '@babel/core';
import type { Options } from './core/presets';
import type { State } from './core/types';
export type { Options };
export default function forgettiPlugin(): babel.PluginObj<State>;
