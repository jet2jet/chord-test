import ControlObject from './ControlObject';
export default class TimeSignatureControl extends ControlObject {
    beatsNumerator: number;
    beatsDenominator: number;
    clocks: number;
    num32ndInQuater: number;
    constructor();
    constructor(posNumerator: number, posDenominator: number, beatsNumerator?: number, beatsDenominator?: number, cl?: number, num?: number);
    toJSON(): any;
    fromJSONObject(obj: any): void;
    equals(obj: any): boolean;
    isEqualType(obj: any): obj is TimeSignatureControl;
    getText(): string;
}
