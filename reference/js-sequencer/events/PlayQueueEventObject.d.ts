import EventObjectBase from './EventObjectBase';
import Player from '../core/Player';
export default class PlayQueueEventObject extends EventObjectBase {
    readonly player: Player;
    readonly current: number;
    readonly total: number;
    readonly playing: number;
    readonly totalPlayed: number;
    constructor(player: Player, current: number, total: number, playing: number, totalPlayed: number);
}
