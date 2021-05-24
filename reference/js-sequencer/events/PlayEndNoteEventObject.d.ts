import EventObjectBase from './EventObjectBase';
import Player from '../core/Player';
export default class PlayEndNoteEventObject extends EventObjectBase {
    readonly player: Player;
    readonly playing: number;
    readonly totalPlayed: number;
    constructor(player: Player, playing: number, totalPlayed: number);
}
