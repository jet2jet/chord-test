import SimpleEventObject from './SimpleEventObject';
import EditorEngine from '../core/EditorEngine';
export default class ResizeEventObject extends SimpleEventObject<EditorEngine> {
    readonly width: number;
    readonly height: number;
    constructor(editor: EditorEngine, width: number, height: number);
    get editor(): EditorEngine;
}
