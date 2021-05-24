import ISequencerObject from '../../objects/ISequencerObject';
import Engine from '../Engine';
export default class ControlObject implements ISequencerObject {
    engine: Engine | null;
    notePosNumerator: number;
    notePosDenominator: number;
    parentArray: ControlObject[] | null;
    idData: number;
    x: number;
    y: number;
    element?: HTMLElement;
    textNode?: Text;
    toJSON(): any;
    fromJSONObject(obj: any): void;
    attachEngine(engine: Engine): void;
    detachEngine(): void;
    setPosition(numerator: number, denominator: number): void;
    equals(obj: any): boolean;
    isEqualType(obj: any): obj is ControlObject;
    isEqualPosition(obj: any): boolean;
    isSimilar(obj: any): boolean;
    getText(): string;
}
export declare function getControlFromJSONObject(obj: any): ControlObject;
