import * as Manager from './SoundfontManager';
declare let messageTable: {
    sfont: {
        title: string;
        label: {
            'default': string;
            added: string;
            none: string;
            'selected-sfont': string;
            'sfont-map': string;
            'sfont-map-sfont': string;
            'sfont-map-target-bank': string;
            'sfont-map-target-preset': string;
            'sfont-map-sfont-bank': string;
            'sfont-map-sfont-preset': string;
            'sfont-map-amplifier': string;
            'sfont-map-to': string;
            'sfont-map-on': string;
        };
        button: {
            add: string;
            'add-open': string;
            'close-mark': string;
            remove: string;
        };
    };
};
export declare function initialize(document: Document, done: () => void): void;
export declare function show(done?: (changed: boolean) => void): void;
export declare function setErrorHandler(handler: null | undefined | ((err: Manager.ErrorType) => void)): void;
export declare function setLoadingHandler(showFunc: () => void, hideFunc: () => void): void;
export declare function setMessageTableToDefault(english?: boolean): void;
export declare function setMessageTable(table: typeof messageTable | undefined): void;
export {};
