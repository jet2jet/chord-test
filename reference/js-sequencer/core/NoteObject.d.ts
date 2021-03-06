import { TimeValue } from '../types';
import Engine from './Engine';
import NoteObjectBase from './NoteObjectBase';
export default class NoteObject implements NoteObjectBase {
    engine?: Engine | null;
    notePosNumerator: number;
    notePosDenominator: number;
    noteLengthNumerator: number;
    noteLengthDenominator: number;
    noteValue: number;
    channel: number;
    velocity: number;
    idData: number;
    playStartTime?: TimeValue;
    playEndTime?: TimeValue;
    playEndPosNum?: number;
    playEndPosDen?: number;
    x: number;
    y: number;
    element?: HTMLElement;
    node?: AudioNode;
    constructor();
    constructor(posNumerator: number, posDenominator: number, noteLength: number, noteLengthDenominator: number, noteValue: number, channel: number);
    attachEngine(engine: Engine): void;
    detachEngine(): void;
    toJSON(): any;
    fromJSONObject(obj: any): void;
    setPosition(numerator: number, denominator: number): void;
    setLength(numerator: number, denominator: number): void;
    setNoteValue(value: number): void;
}
export declare function isNoteObject(obj: any): obj is NoteObject;
