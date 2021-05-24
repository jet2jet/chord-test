export default class BackgroundChord {
    posNumerator: number;
    posDenominator: number;
    rootNote: number;
    notes: number[];
    constructor(posNum: number, posDen: number, root: number, notes: number[]);
    toJSON(): any;
    fromJSONObject(obj: any): void;
}
