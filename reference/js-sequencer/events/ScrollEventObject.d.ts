import SimpleEventObject from './SimpleEventObject';
import EditorEngine from '../core/EditorEngine';
export default class ScrollEventObject extends SimpleEventObject<EditorEngine> {
    readonly value: number;
    constructor(editor: EditorEngine, value: number);
    get editor(): EditorEngine;
}
