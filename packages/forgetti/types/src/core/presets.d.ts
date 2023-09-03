export type HookIdentity = 'memo' | 'callback' | 'effect' | 'ref';
export interface NamedImportDefinition {
    kind: 'named';
    name: string;
    source: string;
}
export interface DefaultImportDefinition {
    kind: 'default';
    source: string;
}
export type ImportDefinition = NamedImportDefinition | DefaultImportDefinition;
export type HookRegistration = ImportDefinition & {
    type: HookIdentity;
};
export interface RawRegExp {
    source: string;
    flags: string;
}
export interface Preset {
    filters: {
        component: RawRegExp;
        hook?: RawRegExp;
    };
    runtime: {
        useRef: ImportDefinition;
        useMemo: ImportDefinition;
        memo?: ImportDefinition;
    };
    imports: {
        hooks: HookRegistration[];
        hocs: ImportDefinition[];
    };
}
export interface Options {
    preset: keyof typeof PRESETS | Preset;
}
export declare function createPreset(preset: Preset): Preset;
export declare const PRESETS: {
    react: Preset;
    preact: Preset;
};
