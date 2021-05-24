import EventObjectBase from './EventObjectBase';
import PlayerBase from '../core/PlayerBase';
export default class PlayUserEventObject extends EventObjectBase {
    readonly player: PlayerBase;
    readonly type: string;
    readonly data: any;
    constructor(player: PlayerBase, type: string, data: any);
}
