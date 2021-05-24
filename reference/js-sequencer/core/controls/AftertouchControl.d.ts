import ControlObject from './ControlObject';
export default class AftertouchControl extends ControlObject {
    noteValue: number;
    channel: number;
    value: number;
    constructor();
    constructor(posNumerator: number, posDenominator: number, noteValue: number, channel: number, value: number);
    toJSON(): any;
    fromJSONObject(obj: any): void;
    equals(obj: any): boolean;
    isEqualType(obj: any): obj is AftertouchControl;
    isSimilar(obj: any): boolean;
}
