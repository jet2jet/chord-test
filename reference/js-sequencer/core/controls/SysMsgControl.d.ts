import ControlObject from './ControlObject';
export default class SysMsgControl extends ControlObject {
    msgType: number;
    rawData: Uint8Array;
    constructor();
    constructor(posNumerator: number, posDenominator: number, type: number, arrayBuffer: ArrayBuffer, offset?: number, len?: number);
    toJSON(): any;
    fromJSONObject(obj: any): void;
    equals(obj: any): boolean;
    isEqualType(obj: any): obj is SysMsgControl;
    isSimilar(obj: any): boolean;
}
