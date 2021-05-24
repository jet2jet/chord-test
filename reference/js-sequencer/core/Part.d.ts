import ControlObject from './controls/ControlObject';
import Engine from './Engine';
import NoteObject from './NoteObject';
export default class Part {
    notes: NoteObject[];
    controls: ControlObject[];
    channel: number;
    toJSON(): any;
    fromJSONObject(obj: any): void;
    attachEngine(engine: Engine): void;
    detachEngine(): void;
}
