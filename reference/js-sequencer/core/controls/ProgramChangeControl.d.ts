import ControlObject from './ControlObject';
export default class ProgramChangeControl extends ControlObject {
    channel: number;
    value: number;
    constructor();
    constructor(posNumerator: number, posDenominator: number, channel: number, value: number);
    toJSON(): any;
    fromJSONObject(obj: any): void;
    equals(obj: any): boolean;
    isEqualType(obj: any): obj is ProgramChangeControl;
    isSimilar(obj: any): boolean;
}
