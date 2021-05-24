import * as JSSynth from 'js-synthesizer';
import PlayerBase, { StatusData } from './PlayerBase';
import { FadeoutData, LoopData, TimeValue } from '../types';
import BackgroundChord from '../objects/BackgroundChord';
import IPositionObject from '../objects/IPositionObject';
import PlayerEventObjectMap from '../events/PlayerEventObjectMap';
import Engine from './Engine';
import NoteObject from './NoteObject';
import Part from './Part';
/**
 * Process and render the sequencer objects.
 *
 * The instance must be created with Player.instantiate.
 */
export default class Player extends PlayerBase {
    engine: Engine;
    private _isPlayingSequence;
    private _nextPlayTimerId;
    private _availablePlayNote;
    private _playingNotes;
    private _allPlayedNoteCount;
    private _evtPlayQueue;
    private _evtPlayEndNote;
    private _evtPlayAllQueued;
    private _evtPlayLooped;
    private playingNote;
    private queuedNotesPos;
    private queuedNotesTime;
    private queuedNotesBasePos;
    private queuedNotesBaseTime;
    /** True if 'enable loop' event has been occurred */
    private loopEnabled;
    private fadeout;
    private renderedTime;
    private renderedFrames;
    private playedTime;
    private tempo;
    private isAllNotesPlayed;
    private constructor();
    static isSupported(): boolean;
    static isAudioWorkletSupported(): boolean;
    /**
     * Create the player instance.
     * @param engine Engine instance to receive sequencer objects
     * @param workerJs worker script file which includes js-sequencer's worker code
     * @param depsJs dependency JS files which workerJs (and js-sequencer's worker) uses
     * @param interval timer interval for worker processing (default: 30)
     * @param framesCount output frame count per one render process (default: 8192)
     * @param sampleRate audio sample rate (default: 48000)
     * @return Promise object which resolves with Player instance when initialization is done
     */
    static instantiate(engine: Engine, workerJs: string, depsJs: string[], shareWorker?: boolean, interval?: number, framesCount?: number, sampleRate?: number): Promise<Player>;
    protected onQueuedPlayer(s: StatusData): void;
    /**
     * Add the event handler for the player.
     * @param name event name
     * @param fn event handler
     */
    addEventHandler<T extends keyof PlayerEventObjectMap>(name: T, fn: (e: PlayerEventObjectMap[T]) => void): void;
    /**
     * Remove the event handler from the player.
     * @param name event name
     * @param fn registered event handler
     */
    removeEventHandler<T extends keyof PlayerEventObjectMap>(name: T, fn: (e: PlayerEventObjectMap[T]) => void): void;
    private raiseEventPlayQueue;
    private raiseEventPlayEndNote;
    private raiseEventPlayAllQueued;
    private raiseEventPlayLooped;
    playNote(n: NoteObject, actx?: BaseAudioContext | null, dest?: AudioNode | null): void;
    /**
     * Stop playing the note played by playNote method.
     * The player data is not released, if doReleasePlayer is not true, or until releasePlayer method is called.
     */
    stopPlayingNote(doReleasePlayer?: boolean): void;
    playNoteMultiple(notes: NoteObject | NoteObject[], actx?: BaseAudioContext | null, dest?: AudioNode | null): void;
    stopNoteMultiple(notes: NoteObject | NoteObject[], doReleasePlayer?: boolean): void;
    private _checkStopped;
    protected onPlayStart(): void;
    private prepareBasePos;
    private prepareLoop;
    private doSetupFadeout;
    private doProcessFadeout;
    protected preSendEvent(ev: JSSynth.SequencerEvent, time: TimeValue | null | undefined): boolean;
    protected preSendSysEx(_data: any, time: TimeValue | null | undefined): boolean;
    private doSendFadeoutVolume;
    private doRenderNotes;
    private onPlayUserEvent;
    private onPlayStatusEvent;
    private onPlayUserMarkerEvent;
    /** Load all objects and send appropriate MIDI events except for note-on. */
    private doLoadAllObjects;
    private processObject;
    private processPlayingNotes;
    private noteOffAllPlayingNotes;
    private startPlayData;
    playPartRange(part: Part, from?: IPositionObject | null, to?: IPositionObject | null, backgroundChords?: BackgroundChord[] | null, backgroundEndPos?: IPositionObject | null, actx?: BaseAudioContext | null): void;
    playPart(part: Part, backgroundChords?: BackgroundChord[] | null, backgroundEndPos?: IPositionObject | null, actx?: BaseAudioContext | null): void;
    /** Play sequence data from engine instance, with start position and end position, etc. */
    playSequenceRange(from?: IPositionObject | null, to?: IPositionObject | null, timeStartOffset?: TimeValue | null, backgroundChords?: BackgroundChord[] | null, backgroundEndPos?: IPositionObject | null, actx?: BaseAudioContext | null, dest?: AudioNode | null, loopData?: LoopData, fadeout?: FadeoutData | boolean): void;
    /** Play sequence data from engine instance. */
    playSequence(actx?: BaseAudioContext | null, dest?: AudioNode | null, loopData?: LoopData, fadeout?: FadeoutData | boolean): void;
    playSequenceTimeRange(timeFrom: TimeValue, timeTo: TimeValue, backgroundChords?: BackgroundChord[] | null, backgroundEndPos?: IPositionObject | null, actx?: BaseAudioContext | null, dest?: AudioNode | null, loopData?: LoopData, fadeout?: FadeoutData | boolean): void;
    isPlaying(): boolean;
    protected preStopPlayer(): void;
    protected preReleasePlayer(): void;
    private _stopSequenceImpl;
    /**
     * Stop the playing sequence data.
     * The player data will be released after a few seconds, but
     * it will be reused when playNote/playSequence* methods are called.
     */
    stopSequence(): void;
    resetAll(): void;
}
