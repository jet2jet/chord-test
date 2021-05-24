import ControlObject from './ControlObject';
export default class TempoControl extends ControlObject {
    /** BPM = 60000000 / value */
    value: number;
    constructor();
    constructor(posNumerator: number, posDenominator: number, value?: number);
    toJSON(): any;
    fromJSONObject(obj: any): void;
    equals(obj: any): boolean;
    isEqualType(obj: any): obj is TempoControl;
    isSimilar(obj: any): boolean;
    getText(): string;
}
