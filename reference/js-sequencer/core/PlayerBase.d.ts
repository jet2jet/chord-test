import * as JSSynth from 'js-synthesizer';
import { TimeValue } from '../types';
import PlayerBaseEventObjectMap from '../events/PlayerBaseEventObjectMap';
import IPlayStream from './IPlayStream';
import Options from './playing/Options';
import PlayerProxy from './playing/PlayerProxy';
export interface StatusData {
    outFrames: number;
    sampleRate: number;
    isQueueEmpty: boolean;
}
export interface UserMarkerData {
    marker: string;
    framesBeforeMarker: number;
    sampleRate: number;
}
export interface SFontMap {
    targetBank: number;
    targetPreset: number;
    /** soundfont identifier or -1 for default soundfont */
    sfontId: number;
    bank: number;
    preset: number;
    /** amplifier (volume rate) of bank/preset in percent */
    ampPercent?: number | null | undefined;
}
interface ChannelStatus {
    bank?: number;
    preset?: number;
    volume: number;
}
/**
 * Process and render MIDI-related events.
 *
 * The instance must be created with PlayerBase.instantiate.
 */
export default class PlayerBase {
    protected channels: ChannelStatus[];
    private proxy;
    private sfontDefault;
    private isSfontDefaultExternal;
    private sfontMap;
    private masterVolume;
    private channel16IsDrums;
    private releasePlayerTimer;
    private outputStream;
    private audioWorkletScripts;
    private debounceEventTimer;
    private debouncedEvents;
    private _evtMap;
    private playOptions;
    private playingStream;
    private audio;
    private audioDest;
    private playingNode;
    private playingGain;
    private isPlayerPreparing;
    private _isPlayerRunning;
    private isNodeConnected;
    private isWorkletLoaded;
    private queuedFrames;
    private playedFrames;
    private isWaitingForStop;
    protected constructor(proxy: PlayerProxy);
    static isSupported(): boolean;
    static isAudioWorkletSupported(): boolean;
    /**
     * Create the player-base instance.
     * @param workerJs worker script file which includes js-sequencer's worker code
     * @param depsJs dependency JS files which workerJs (and js-sequencer's worker) uses
     * @param interval timer interval for worker processing (default: 30)
     * @param framesCount output frame count per one render process (default: 8192)
     * @param sampleRate audio sample rate (default: 48000)
     * @return Promise object which resolves with PlayerBase instance when initialization is done
     */
    static instantiatePlayerBase(workerJs: string, depsJs: string[], shareWorker?: boolean, interval?: number, framesCount?: number, sampleRate?: number): Promise<PlayerBase>;
    protected static instantiateProxy(workerJs: string, depsJs: string[], shareWorker?: boolean, interval?: number, framesCount?: number, sampleRate?: number, channelCount?: number): Promise<PlayerProxy>;
    /**
     * Close and release the player.
     * After called, all methods will not be usable and those behavior will be undefined.
     */
    close(): void;
    /**
     * Load main soundfont data.
     * @param bin soundfont binary data
     * @return Promise object which resolves when loading process is done
     */
    loadSoundfont(bin: ArrayBuffer): Promise<void>;
    /**
     * Load main soundfont data from 'input type="file"' element.
     * @param fileElemId file element ID or file element instance itself
     * @return Promise object which resolves when loading process is done
     */
    loadSoundfontFromFile(fileElemId: string | HTMLInputElement): Promise<void>;
    /**
     * Unload main soundfont data.
     */
    unloadSoundfont(): Promise<void>;
    isSoundfontLoaded(): boolean;
    /**
     * Use loaded soundfont as a default soundfont. The old default soundfont
     * will be unloaded if not specified by 'useSoundfont'.
     * @param sfontId soundfont identifier (returned by addSoundfontForMap or addSoundfontForMapFromFile).
     *     To unset, specify null or undefined.
     */
    useSoundfont(sfontId: number | null | undefined): void;
    /**
     * Add soundfont data to use with addPresetMapWithSoundfont().
     * @param sfontBin soundfont binary data
     * @return Promise object which resolves with soundfont identifier when succeeded
     */
    addSoundfontForMap(sfontBin: ArrayBuffer): Promise<number>;
    /**
     * Add soundfont data from file element, to use with addPresetMapWithSoundfont().
     * @param fileElemId file element ID or file element instance itself
     * @return Promise object which resolves with soundfont identifier when succeeded
     */
    addSoundfontForMapFromFile(fileElemId: string | HTMLInputElement): Promise<number>;
    /**
     * Add preset mapping for replacing specific bank/preset with soundfont one.
     * @param sfont soundfont identifier (returned by addSoundfontForMap(fromFile) method), or
     *     -1 to use main soundfont for mapping
     * @param targetBank target bank number to replace (including LSB value)
     * @param targetPreset target preset number to replace
     * @param bank new bank number defined in specified soundfont
     * @param preset new preset number defined in specified soundfont
     */
    addPresetMapWithSoundfont(sfont: number, targetBank: number, targetPreset: number, bank: number, preset: number, ampPercent?: number | null | undefined): void;
    /**
     * Return all preset mappings.
     */
    getAllMaps(): SFontMap[];
    /**
     * Return all preset mappings for the soundfont.
     * @param sfont soundfont identifier or -1 for using main soundfont
     */
    getAllMapForSoundfont(sfont: number): {
        targetBank: number;
        targetPreset: number;
        bank: number;
        preset: number;
        ampPercent: number | null | undefined;
    }[];
    /**
     * Remove program map for specified target program
     * @param sfont soundfont value (returned by addSoundfontForMap)
     * @param targetBank target to remove map, or omit/undefined to remove all target using the soundfont
     * @param targetPreset target to remove map, or omit/undefined to remove all target using the soundfont
     * @return true if the soundfont is used by another target, or false if unloaded
     */
    removeProgramMap(sfont: number, targetBank?: number, targetPreset?: number): boolean;
    /**
     * Reset (Remove) all registered program maps.
     * If keepSfontLoaded is not true, the associated soundfonts are unloaded.
     * @param keepSfontLoaded true if the loaded soundfonts are not unloaded
     */
    resetAllProgramMap(keepSfontLoaded?: boolean): void;
    protected onQueuedPlayer(s: StatusData): void;
    private onStatusPlayer;
    private onUserMarkerPlayer;
    private onStopPlayer;
    private onResetPlayer;
    private onUserDataPlayer;
    private raiseEventPlayQueued;
    private raiseEventPlayStatus;
    private raiseEventPlayUserEvent;
    private raiseEventPlayUserMarkerEvent;
    private raiseEventSimple;
    /**
     * Add the event handler for the player.
     * @param name event name
     * @param fn event handler
     */
    addEventHandler<T extends keyof PlayerBaseEventObjectMap>(name: T, fn: (e: PlayerBaseEventObjectMap[T]) => void): void;
    /**
     * Remove the event handler from the player.
     * @param name event name
     * @param fn registered event handler
     */
    removeEventHandler<T extends keyof PlayerBaseEventObjectMap>(name: T, fn: (e: PlayerBaseEventObjectMap[T]) => void): void;
    getPlayOptions(): Readonly<Options>;
    setPlayOptions(options: Readonly<Options>): void;
    private resetChannel;
    private prepareAudioContext;
    private prepareForPlay;
    /**
     * Send a sequencer event, especially MIDI-based event.
     * @param ev an event data
     * @param time time to render the event or null to send immediately
     * @return true if the event is sent, or false if not
     *     (indicating render process has been stopped)
     */
    sendEvent(ev: JSSynth.SequencerEvent, time?: TimeValue | null | undefined): boolean;
    sendSysEx(rawData: Uint8Array, time?: TimeValue | null | undefined): boolean;
    protected sendGeneratorValue(channel: number, type: JSSynth.Constants.GeneratorTypes, value: number | null, keepCurrentVoice?: boolean | null, time?: TimeValue | null | undefined): boolean;
    /**
     * Send a user-defined event to sequencer.
     * 'playuserevent' event will be raised when the user-defined event is
     * to be rendered.
     * @param type user-defined event type
     * @param time time to render the event (null/undefined is not allowed)
     * @param data any data for the event
     */
    sendUserEvent(type: string, time: TimeValue, data?: any): void;
    /**
     * Send a 'finish' event to tell that render process has finished.
     * After this, 'stopped' event will be raised.
     */
    sendFinish(time: TimeValue): void;
    /**
     * Send a user-defined marker, which is queued to audio buffer (frames).
     * During render process, when the marker is read, 'playusermarkerevent' will be raised.
     */
    sendUserMarker(marker: string, time: TimeValue): void;
    /**
     * Send 'change program' event to the sequencer.
     * @param channel MIDI channel number
     * @param preset program/preset number
     * @param bank bank number (null or undefined to use the current bank number)
     * @param time time to render the event or null to send immediately
     * @return true if the event is sent, or false if not
     *     (indicating render process has been stopped)
     */
    changeProgram(channel: number, preset: number, bank?: number | null, time?: TimeValue | null): boolean;
    /**
     * Send 'change volume' event to the sequencer.
     * @param channel MIDI channel number
     * @param isMSB true if the value is for MSB, or false if for LSB
     * @param value the volume value (0-127)
     * @param time time time to render the event or null to send immediately
     * @return true if the event is sent, or false if not
     *     (indicating render process has been stopped)
     */
    changeVolume(channel: number, isMSB: boolean, value: number, time?: TimeValue | null | undefined): boolean;
    /**
     * Send 'change volume' event to the sequencer.
     * @param channel MIDI channel number
     * @param value the volume value (0-16383)
     * @param time time time to render the event or null to send immediately
     * @return true if the event is sent, or false if not
     *     (indicating render process has been stopped)
     */
    changeVolume(channel: number, value: number, time?: TimeValue | null | undefined): boolean;
    protected doSendEvent(ev: JSSynth.SequencerEvent, time: TimeValue | null | undefined, noHook?: boolean): boolean;
    private sendDebouncedEvents;
    private doChangeProgram;
    /**
     * Pause or resume rendering frames.
     * @param paused true for pause, false for resume
     * @return resolved with 'isPaused' value (same value with 'paused' parameter for almost all case)
     */
    pausePlaying(paused: boolean): Promise<boolean>;
    /**
     * Start player engine to render MIDI events.
     * @param actx AudioContext or OfflineAudioContext instance, or null to use default AudioContext instance
     * @param dest destination AudioNode (null to use actx.destination).
     *     Note that 'actx' parameter is ignored if dest is specified
     * @param noStop true to prevent from stopping player first
     */
    startPlayer(actx?: BaseAudioContext | null, dest?: AudioNode | null, noStop?: boolean): Promise<void>;
    /**
     * Stop rendering MIDI events for player engine.
     */
    stopPlayer(): void;
    /**
     * Return whether the player is running (rendering).
     */
    isPlayerRunning(): boolean;
    protected setReleaseTimer(): void;
    /**
     * Release render-related objects explicitly.
     * Note that the release process will be done automatically 5 seconds after when stopped.
     * @param resetSynth true to release internal synthesizer instance
     */
    releasePlayer(resetSynth?: boolean): void;
    private _releasePlayerCallback;
    /**
     * Return the current master volume for output with Web Audio.
     */
    getMasterVolume(): number;
    /**
     * Set the master volume for output with Web Audio.
     * This value does not affect to the render process with IPlayStream.
     * When the render process is running, the volume value is updated immediately.
     * @param value the volume/gain value (usually from 0.0 to 1.0, initial value is 0.5)
     */
    setMasterVolume(value: number): void;
    /**
     * Return whether the MIDI channel 16 (15 for zero-based index) is the drums part.
     */
    isChannel16IsDrums(): boolean;
    /**
     * Set whether the MIDI channel 16 (15 for zero-based index) is the drums part.
     * This method does not update the configuration if the render process is running.
     * @param value true if the MIDI channel 16 is the drums part
     * @return a Promise object that resolves when the configuration has done
     */
    setChannel16IsDrums(value: boolean): Promise<void>;
    /**
     * Set the script URLs for audio worklet processings.
     * If nothing is set, the audio worklet is not used.
     */
    setAudioWorkletScripts(audioWorkletScripts: readonly string[] | null | undefined): void;
    /**
     * Set the audio frame count for render process.
     */
    setRenderFrameCount(count: number): Promise<void>;
    /**
     * Set the gain value of the internal synthesizer.
     * Unlike setMasterVolume, this value affects to the render process with IPlayStream.
     * When the render process is running, the update process of
     * the volume value is delayed and does not reflect to already rendered frames.
     * @param value the gain value (usually from 0.0 to 1.0)
     * @return a Promise object that resolves when the configuration has done
     */
    setSynthGain(value: number): Promise<void>;
    /**
     * Resets the player internal time (tick).
     * After reset, the base time value for sendEvent() or other send methods will be the tick of reset.
     */
    resetPlayerTime(): void;
    /**
     * Set the user-defined output stream.
     * If the stream is set, the render process will use it instead of Web Audio.
     * When the render process is running, the stream will not be used until
     * the playing is stopped.
     * @param stream the output stream or null to reset
     */
    setOutputStream(stream: IPlayStream | null): void;
    private calculateVolumeForChannel;
    protected onPlayStart(): void;
    protected preSendEvent(_ev: JSSynth.SequencerEvent, _time: TimeValue | null | undefined): boolean;
    protected preSendSysEx(_data: {
        rawData: Uint8Array | null | undefined;
    }, _time: TimeValue | null | undefined): boolean;
    protected preStopPlayer(): void;
    protected preReleasePlayer(): void;
}
export {};
