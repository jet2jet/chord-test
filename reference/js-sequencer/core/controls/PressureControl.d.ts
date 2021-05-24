import ControlObject from './ControlObject';
export default class PressureControl extends ControlObject {
    channel: number;
    value: number;
    constructor();
    constructor(posNumerator: number, posDenominator: number, channel: number, value: number);
    toJSON(): any;
    fromJSONObject(obj: any): void;
    equals(obj: any): boolean;
    isEqualType(obj: any): obj is PressureControl;
    isSimilar(obj: any): boolean;
}
