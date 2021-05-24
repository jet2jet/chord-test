import ControlObject from './ControlObject';
export default class ControllerControl extends ControlObject {
    channel: number;
    value1: number;
    value2: number;
    constructor();
    constructor(posNumerator: number, posDenominator: number, channel: number, value1: number, value2: number);
    toJSON(): any;
    fromJSONObject(obj: any): void;
    equals(obj: any): boolean;
    isEqualType(obj: any): obj is ControllerControl;
    isSimilar(obj: any): boolean;
    compareTo(obj: any): number;
}
