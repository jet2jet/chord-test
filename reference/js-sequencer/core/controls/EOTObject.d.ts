import ControlObject from './ControlObject';
export default class EOTObject extends ControlObject {
    constructor();
    constructor(posNumerator: number, posDenominator: number);
    toJSON(): any;
    fromJSONObject(obj: any): void;
    equals(obj: any): boolean;
    isEqualType(obj: any): obj is EOTObject;
    isSimilar(obj: any): boolean;
    getText(): string;
}
