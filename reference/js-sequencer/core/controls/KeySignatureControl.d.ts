import ControlObject from './ControlObject';
export default class KeySignatureControl extends ControlObject {
    sharpFlat: number;
    isMinor: boolean;
    constructor();
    constructor(posNumerator: number, posDenominator: number, sharpFlat?: number, isMinor?: boolean);
    toJSON(): any;
    fromJSONObject(obj: any): void;
    equals(obj: any): boolean;
    isEqualType(obj: any): obj is KeySignatureControl;
    getText(): string;
}
