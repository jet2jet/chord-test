import ControlObject from './ControlObject';
export default class SysExControl extends ControlObject {
    rawData: Uint8Array;
    constructor();
    constructor(posNumerator: number, posDenominator: number, data: Uint8Array, move?: boolean);
    constructor(posNumerator: number, posDenominator: number, arrayBuffer: ArrayBuffer, offset?: number, len?: number);
    toJSON(): any;
    fromJSONObject(obj: any): void;
    equals(obj: any): boolean;
    isEqualType(obj: any): obj is SysExControl;
    isSimilar(obj: any): boolean;
}
