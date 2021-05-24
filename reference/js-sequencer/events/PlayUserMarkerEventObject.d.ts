import EventObjectBase from './EventObjectBase';
import PlayerBase from '../core/PlayerBase';
export default class PlayUserMarkerEventObject extends EventObjectBase {
    readonly player: PlayerBase;
    readonly currentFrame: number;
    readonly sampleRate: number;
    readonly marker: string;
    constructor(player: PlayerBase, currentFrame: number, sampleRate: number, marker: string);
}
