import EventObjectBase from './EventObjectBase';
import Player from '../core/Player';
import IPositionObject from '../objects/IPositionObject';
export default class PlayLoopedEventObject extends EventObjectBase {
    readonly player: Player;
    readonly loopStart: IPositionObject;
    readonly loopEnd: IPositionObject | null;
    readonly loopCount: number;
    readonly currentFrame: number;
    readonly sampleRate: number;
    constructor(player: Player, loopStart: IPositionObject, loopEnd: IPositionObject | null, loopCount: number, currentFrame: number, sampleRate: number);
}
