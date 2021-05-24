import EventObjectBase from './EventObjectBase';
export default class SimpleEventObject<T> extends EventObjectBase {
    readonly target: T;
    constructor(target: T);
}
