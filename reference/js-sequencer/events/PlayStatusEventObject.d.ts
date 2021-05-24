import EventObjectBase from './EventObjectBase';
import PlayerBase from '../core/PlayerBase';
export default class PlayStatusEventObject extends EventObjectBase {
    readonly player: PlayerBase;
    readonly currentFrame: number;
    readonly sampleRate: number;
    constructor(player: PlayerBase, currentFrame: number, sampleRate: number);
}
