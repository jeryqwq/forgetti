export declare function $$equals(cache: unknown[], index: number, b: unknown): boolean;
export interface Ref<T> {
    current: T;
}
export type RefHook = <T>(callback: T) => Ref<T>;
export declare function $$ref(hook: RefHook, size: number): unknown[];
export type MemoHook = <T>(callback: () => T, dependencies: unknown[]) => T;
export declare function $$cache(hook: MemoHook, size: number): unknown[];
export declare function $$branch(parent: unknown[], index: number, size: number): unknown[];
export interface MemoProps {
    v: unknown[];
}
type MemoComponent = (props: MemoProps) => unknown;
export type MemoFunction = (Component: MemoComponent, arePropsEqual: (prev: MemoProps, next: MemoProps) => boolean) => MemoComponent;
export declare function $$memo(memoFunc: MemoFunction, render: (values: unknown[]) => unknown): MemoComponent;
export {};
