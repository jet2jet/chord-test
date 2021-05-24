import SimpleEventObject from './SimpleEventObject';
import EditorEngine from '../core/EditorEngine';
export default class MaxChangedEventObject extends SimpleEventObject<EditorEngine> {
    readonly max: number;
    readonly posNumerator: number;
    readonly posDenominator: number;
    constructor(editor: EditorEngine, max: number, posNumerator: number, posDenominator: number);
    get editor(): EditorEngine;
}
