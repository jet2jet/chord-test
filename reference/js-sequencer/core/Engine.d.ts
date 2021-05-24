import IPositionObject from '../objects/IPositionObject';
import ISequencerObject from '../objects/ISequencerObject';
import PositionObject from '../objects/PositionObject';
import { TimeRationalValue, TimeValue } from '../types';
import ControlObject from './controls/ControlObject';
import KeySignatureControl from './controls/KeySignatureControl';
import TimeSignatureControl from './controls/TimeSignatureControl';
import NoteObject from './NoteObject';
import Part from './Part';
import EngineEventObjectMap from '../events/EngineEventObjectMap';
export declare function updateControlArray(arr: ControlObject[]): void;
export declare function addToControlArray(arr: ControlObject[], obj: ControlObject): void;
export declare function sortNotesAndControls(arr: ISequencerObject[]): void;
/** Returns the time seconds from position 'valFromNum/valFromDen' to 'valToNum/valToDen' */
export declare function calcTimeExFromSMFTempo2(smfTempo: number, valFromNum: number, valFromDen: number, valToNum: number, valToDen: number): TimeRationalValue;
/** Returns the time seconds from position 'valFromNum/valFromDen' to 'valToNum/valToDen' */
export declare function calcTimeExFromSMFTempo(smfTempo: number, valFromNum: number, valFromDen: number, valToNum: number, valToDen: number): TimeValue;
export declare function calcHoldTime2(note: NoteObject, currentSMFTempo: number, isHolding: boolean, arr: ISequencerObject[], fromIndex: number, disableHold: boolean | undefined): TimeRationalValue;
export declare function calcHoldTime(note: NoteObject, currentSMFTempo: number, isHolding: boolean, arr: ISequencerObject[], fromIndex: number, disableHold: boolean | undefined): number;
export declare function calculatePositionFromSeconds2(notesAndControls: ISequencerObject[], smfTempoFirst: number, timeSecondsFrom: TimeRationalValue, timeSecondsTo: TimeRationalValue | null, returnGreaterOrEqual: boolean, disableHold?: boolean): {
    from: IPositionObject;
    to: IPositionObject;
    timeStartOffset: TimeRationalValue;
    duration: TimeRationalValue;
} | null;
export declare function calculatePositionFromSeconds(notesAndControls: ISequencerObject[], smfTempoFirst: number, timeSecondsFrom: TimeValue, timeSecondsTo: TimeValue, returnGreaterOrEqual: boolean, disableHold?: boolean): {
    from: IPositionObject;
    to: IPositionObject;
    timeStartOffset: TimeValue;
    duration: TimeValue;
} | null;
export interface ILoadSMFContext {
    smfBuffer: ArrayBuffer | null;
    format: number;
    startOffset: number;
    trackCount: number;
    division: number;
    loading: boolean;
    error?: any;
}
export default class Engine {
    /** BPM */
    tempo: number;
    smfDivision: number;
    masterControls: ControlObject[];
    parts: Part[];
    private _evtFileLoaded;
    constructor();
    getTimeSignature(indexLast: number): TimeSignatureControl | null;
    getKeySignature(indexLast: number): KeySignatureControl | null;
    getMeasureFromPosition(numerator: number, denominator: number): number;
    getMeasureFromPosition(pos: PositionObject): number;
    getPositionFromMeasure(measure: number): IPositionObject;
    updateMasterControls(): void;
    raiseEventFileLoaded(): boolean;
    addEventHandler<T extends keyof EngineEventObjectMap>(name: T, fn: (e: EngineEventObjectMap[T]) => void): void;
    removeEventHandler<T extends keyof EngineEventObjectMap>(name: T, fn: (e: EngineEventObjectMap[T]) => void): void;
    reset(): void;
    private getAllNotes;
    getAllNoteValues(): number[];
    getSequenceTitleData(): Uint8Array | null;
    getSequenceCopyrightData(): Uint8Array | null;
    getSequenceTrackName(partIndex: number): Uint8Array | null;
    private getFirstMsgData;
    calculatePosition(timeFrom: TimeValue, timeTo: TimeValue, disableHold?: boolean): {
        from: IPositionObject;
        to: IPositionObject;
        timeStartOffset: TimeValue;
        duration: TimeValue;
    } | null;
    calculatePositionEx(timeFrom: TimeRationalValue, timeTo: TimeRationalValue, disableHold?: boolean): {
        from: IPositionObject;
        to: IPositionObject;
        timeStartOffset: TimeRationalValue;
        duration: TimeRationalValue;
    } | null;
    calculateSeconds(posFrom: IPositionObject, posTo: IPositionObject, disableHold?: boolean): {
        timeFrom: TimeValue;
        timeTo: TimeValue;
        timeStartOffset: TimeValue;
        duration: TimeValue;
    } | null;
    calculateSecondsEx(posFrom: IPositionObject, posTo: IPositionObject | null, disableHold?: boolean): {
        timeFrom: TimeRationalValue;
        timeTo: TimeRationalValue;
        timeStartOffset: TimeRationalValue;
        duration: TimeRationalValue;
    } | null;
    calculateDuration(disableHold?: boolean): number;
    calculateDurationEx(disableHold?: boolean): TimeRationalValue;
    startLoadSMFData(smfBuffer: ArrayBuffer, offset: number): ILoadSMFContext | null;
    canContinueLoadSMFData(ctx: ILoadSMFContext | null): boolean;
    continueLoadSMFData(ctx: ILoadSMFContext): boolean;
    getErrorFromLoadSMFData(ctx: ILoadSMFContext | null): any;
    startLoadFromSMFFile(fileObject: Blob): ILoadSMFContext | null;
    isLoadingSMFData(ctx: ILoadSMFContext | null): boolean;
    private loadContextCallbackImpl;
    private loadContextAsyncImpl;
    loadSMFData(smfBuffer: ArrayBuffer, offset: number, callback: (err?: any) => void): void;
    loadSMFDataPromise(smfBuffer: ArrayBuffer, offset: number): Promise<void>;
    loadFromFile(fileElemId: string | HTMLInputElement, callback?: (error?: any) => void): void;
    loadFromFilePromise(fileElemId: string | HTMLInputElement): Promise<void>;
    isSaveAvailable(): boolean;
    exportSMFToArrayBuffer(): ArrayBuffer;
    makeSMFBlobURL(): string | null;
    saveAsMIDI(baseElement: HTMLElement): boolean;
    loadFromJSON(text: string): boolean;
    saveAsJSON(): string;
}
