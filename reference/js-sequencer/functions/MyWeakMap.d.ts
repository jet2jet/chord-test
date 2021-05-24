declare global {
    interface WeakMap<K extends object, V> {
        delete(key: K): boolean;
        get(key: K): V | undefined;
        has(key: K): boolean;
        set(key: K, value: V): this;
    }
    interface WeakMapConstructor {
        readonly prototype: WeakMap<object, any>;
        new (): WeakMap<object, any>;
        new <K extends object, V>(entries?: Array<[K, V]>): WeakMap<K, V>;
    }
    var WeakMap: WeakMapConstructor;
}
export default interface MyWeakMap<_K extends object, _V> {
}
export declare function createWeakMap<K extends object, V>(): MyWeakMap<K, V>;
export declare function setWeakMap<K extends object, V>(map: MyWeakMap<K, V>, key: K, value: V): MyWeakMap<K, V>;
export declare function getWeakMap<K extends object, V>(map: MyWeakMap<K, V>, key: K): V | undefined;
export declare function hasWeakMapKey<K extends object, V>(map: MyWeakMap<K, V>, key: K): boolean;
export declare function deleteWeakMapKey<K extends object, V>(map: MyWeakMap<K, V>, key: K): boolean;
