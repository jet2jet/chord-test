import ControlObject from './ControlObject';
export default class PitchWheelControl extends ControlObject {
    channel: number;
    value: number;
    constructor();
    constructor(posNumerator: number, posDenominator: number, channel: number, value: number);
    toJSON(): any;
    fromJSONObject(obj: any): void;
    equals(obj: any): boolean;
    isEqualType(obj: any): obj is PitchWheelControl;
    isSimilar(obj: any): boolean;
}
