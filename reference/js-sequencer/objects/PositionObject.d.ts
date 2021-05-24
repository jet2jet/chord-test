import IPositionObject from './IPositionObject';
export default class PositionObject implements IPositionObject {
    numerator: number;
    denominator: number;
    real?: number;
    constructor(num: number, den: number);
    toJSON(): any;
    fromJSONObject(obj: any): void;
    addPosition(pos: IPositionObject): PositionObject;
    addPositionDirect(numerator: number, denominator: number): PositionObject;
    addPositionMe(pos: IPositionObject): void;
    addPositionMeDirect(numerator: number, denominator: number): void;
}
