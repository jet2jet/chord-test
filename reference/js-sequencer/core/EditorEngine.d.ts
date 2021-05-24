import BackgroundChord from '../objects/BackgroundChord';
import IPositionObject from '../objects/IPositionObject';
import PositionObject from '../objects/PositionObject';
import EditorEventObjectMap from '../events/EditorEventObjectMap';
import EngineEventObjectMap from '../events/EngineEventObjectMap';
import Engine from './Engine';
import Player from './Player';
declare global {
    interface HTMLElement {
        currentStyle?: CSSStyleDeclaration;
    }
    interface CSSStyleDeclaration {
        pixelLeft?: number;
        pixelTop?: number;
    }
    interface Window {
        scrollLeft?: number;
        scrollTop?: number;
    }
}
export declare const enum MouseMode {
    MOUSEMODE_DRAW = 0,
    MOUSEMODE_MOVE = 1,
    MOUSEMODE_DELETE = 2
}
export default class EditorEngine extends Engine {
    backgroundChords: BackgroundChord[];
    backgroundEndPos: IPositionObject | null;
    scrollPosX: number;
    scrollPosY: number;
    notePosDenominator: number;
    noteLengthDenominator: number;
    private player;
    private playerNote;
    private sfontMapData;
    private sfontMapDataId;
    private curPart;
    private baseElement;
    private parentElement;
    private markerBeforeCPElement;
    private controlParentElement;
    private pianoElement;
    private beatPositionLabels;
    private keyPositionLabels;
    private linesHorizontal;
    private linesVertical;
    private listElement;
    private _width;
    private _height;
    private noteTopmostValue;
    private noteDragging;
    private controlElementMap;
    private noteElementMap;
    private mouseMode;
    private isMoveDragMode;
    private maxScrollX;
    private maxScrollY;
    private _evtScrollX;
    private _evtScrollY;
    private _evtResize;
    private _evtMaxChanged;
    private fnMouseDown;
    private fnMouseUp;
    private fnMouseMove;
    private fnDblClick;
    constructor(elementId: string);
    static posToPixelX(pos: IPositionObject): number;
    initializePlayer(workerJs: string, depsJs: string[], workletJs: string[], interval?: number): Promise<void>;
    getPlayer(): Player | null;
    getPlayerForNote(): Player | null;
    loadSoundfont(bin: ArrayBuffer): Promise<void>;
    loadSoundfontFromFile(fileElemId: string | HTMLInputElement): Promise<void>;
    unloadSoundfont(): Promise<void>;
    isSoundfontLoaded(): boolean;
    addSoundfontForMap(sfontBin: ArrayBuffer): Promise<number>;
    addSoundfontForMapFromFile(fileElemId: string | HTMLInputElement): Promise<number>;
    addPresetMapWithSoundfont(sfont: number, targetBank: number, targetPreset: number, bank: number, preset: number): void;
    getAllMapForSoundfont(sfont: number): {
        targetBank: number;
        targetPreset: number;
        bank: number;
        preset: number;
        ampPercent: number | null | undefined;
    }[];
    removeProgramMap(sfont: number, targetBank?: number, targetPreset?: number): boolean;
    reset(): void;
    setBackgroundChords(chords: BackgroundChord[], endPos: IPositionObject): void;
    changeCurrentPart(index: number): void;
    private _initHorizontalLines;
    private _initVerticalLines;
    private onResize;
    private onMouseDown;
    private onMouseMoveForMoveMode;
    private onMouseMoveForDrawMode;
    private onMouseMove;
    private onMouseUp;
    private onDblClick;
    private updateScrollStatusX;
    private updateScrollStatusY;
    private updateScrollStatus;
    private onScrollParent;
    scrollX(delta: number): void;
    scrollY(delta: number): void;
    getEditWidth(): number;
    getEditHeight(): number;
    getNotePaddingX(): number;
    getXFromPosition(posNum: number, posDen: number): number;
    getXFromPosition(pos: PositionObject): number;
    getMouseMode(): MouseMode;
    setMouseMode(val: MouseMode): void;
    initPartList(listElementId: string): void;
    resetAll(): void;
    resize(): void;
    private appendNoteElement;
    private removeNoteElement;
    private appendControlElement;
    private removeControlElement;
    private calcLastScrollXWithSortedNotes;
    private raiseEventScrollX;
    private raiseEventScrollY;
    private raiseEventResize;
    private raiseEventMaxChanged;
    addEventHandler<T extends keyof EngineEventObjectMap>(name: T, fn: (e: EngineEventObjectMap[T]) => void): void;
    addEventHandler<T extends keyof EditorEventObjectMap>(name: T, fn: (e: EditorEventObjectMap[T]) => void): void;
    removeEventHandler<T extends keyof EngineEventObjectMap>(name: T, fn: (e: EngineEventObjectMap[T]) => void): void;
    removeEventHandler<T extends keyof EditorEventObjectMap>(name: T, fn: (e: EditorEventObjectMap[T]) => void): void;
    playSequenceRange(from?: IPositionObject | null, to?: IPositionObject | null): void;
    playSequence(): void;
    playCurrentPartRange(from?: IPositionObject | null, to?: IPositionObject | null): void;
    playCurrentPart(): void;
}
