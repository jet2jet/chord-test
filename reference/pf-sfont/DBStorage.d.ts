declare global {
}
export declare type StorageCallback = (this: void, error: DOMException | Error | null) => void;
export declare function initialize(storeName: string, callback: StorageCallback): void;
export declare type StorageLoadCallback<T> = (this: void, error: DOMException | Error | null, result: {
    data: T;
} | null) => void;
export declare function load<T>(key: string, callback: StorageLoadCallback<T>): void;
export declare type StorageLoadMultipleCallback = (this: void, error: DOMException | Error | null, results: Array<{
    key: string;
    data: any | null;
}> | null) => void;
export declare function loadMultiple(keys: string[], callback: StorageLoadMultipleCallback): void;
export declare function saveAndDeleteMultiple<T1>(entriesSave: [{
    key: string;
    data: T1;
}], keysDelete: string[], callback?: StorageCallback): void;
export declare function saveAndDeleteMultiple<T1, T2>(entriesSave: [{
    key: string;
    data: T1;
}, {
    key: string;
    data: T2;
}], keysDelete: string[], callback?: StorageCallback): void;
export declare function saveAndDeleteMultiple<T1, T2, T3>(entriesSave: [{
    key: string;
    data: T1;
}, {
    key: string;
    data: T2;
}, {
    key: string;
    data: T3;
}], keysDelete: string[], callback?: StorageCallback): void;
export declare function saveAndDeleteMultiple(entriesSave: Array<{
    key: string;
    data: any;
}>, keysDelete: string[], callback?: StorageCallback): void;
export declare function save<T>(key: string, data: T, callback?: StorageCallback): void;
export declare function saveMultiple<T1>(entries: [{
    key: string;
    data: T1;
}], callback?: StorageCallback): void;
export declare function saveMultiple<T1, T2>(entries: [{
    key: string;
    data: T1;
}, {
    key: string;
    data: T2;
}], callback?: StorageCallback): void;
export declare function saveMultiple<T1, T2, T3>(entries: [{
    key: string;
    data: T1;
}, {
    key: string;
    data: T2;
}, {
    key: string;
    data: T3;
}], callback?: StorageCallback): void;
export declare function saveMultiple(entries: Array<{
    key: string;
    data: any;
}>, callback?: StorageCallback): void;
declare function _delete(key: string, callback?: StorageCallback): void;
export { _delete as delete };
export declare function deleteMultiple(keys: string[], callback?: StorageCallback): void;
