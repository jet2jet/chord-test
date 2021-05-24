import * as JSSeq from 'js-sequencer';
import * as JSSynth from 'js-synthesizer';

import type PlayerBase from '../PlayerBase';
import loadBinary from './loadBinary';
import volumeToMidiVolume from './volumeToMidiVolume';

/* eslint-disable @typescript-eslint/naming-convention */
declare global {
	let CTWorkerName: string;
	let CTWorkletName: string;
	let CTWorkerDeps: string[];
	let CTPianoSF2: string;
}
/* eslint-enable @typescript-eslint/naming-convention */

export default class SoundfontPlayer implements PlayerBase {
	public volume: number = 0.75;
	public rootVolume: number = 1;

	private readonly player: JSSeq.Core.PlayerBase;
	private readonly ctx: BaseAudioContext;
	private startPromise: Promise<void> | undefined;
	private releasePlayerTimerId: ReturnType<typeof setTimeout> | undefined;
	private startTime: number;

	private constructor(player: JSSeq.Core.PlayerBase, ctx: BaseAudioContext) {
		this.player = player;
		this.ctx = ctx;
		this.startTime = 0;
		player.addEventHandler('playuserevent', this.onUserEvent.bind(this));
	}

	public static async instantiate(
		ctx: BaseAudioContext
	): Promise<SoundfontPlayer> {
		const sf2BufferPromise = loadBinary(CTPianoSF2);
		const playerPromise = JSSeq.Core.PlayerBase.instantiatePlayerBase(
			CTWorkerName,
			CTWorkerDeps,
			true
		);
		const player = await playerPromise;
		player.setMasterVolume(1);
		player.setAudioWorkletScripts([CTWorkletName]);
		await player.setRenderFrameCount(3072);
		player.setPlayOptions({
			prerenderSeconds: 0,
			maxQueueSeconds: 0.25,
		});
		const sf2Buffer = await sf2BufferPromise;
		await player.loadSoundfont(sf2Buffer);
		return new SoundfontPlayer(player, ctx);
	}

	protected midiNoteOn(
		channel: number,
		key: number,
		vel: number,
		vol: number,
		durationSeconds: number,
		onStop?: () => void
	): void {
		(async () => {
			await this.start();
			const midiVol = volumeToMidiVolume(vol);
			const t = (Date.now() - this.startTime + 100) / 1000;
			this.player.changeVolume(channel, midiVol, t);
			this.player.sendEvent(
				{
					type: JSSynth.SequencerEventTypes.EventType.NoteOn,
					channel,
					key,
					vel,
				},
				t
			);
			this.player.sendEvent(
				{
					type: JSSynth.SequencerEventTypes.EventType.NoteOff,
					channel,
					key,
				},
				t + durationSeconds
			);
			if (onStop !== undefined) {
				this.player.sendUserEvent(
					'onStop',
					t + durationSeconds,
					onStop
				);
			}
		})().catch(
			/* istanbul ignore next */ () => {
				// do nothing
			}
		);
	}

	public play(
		midiNote: number,
		durationSeconds: number,
		isRootNote: boolean,
		onStop?: () => void
	): void {
		this.midiNoteOn(
			isRootNote ? 1 : 0,
			midiNote,
			100,
			isRootNote ? this.rootVolume : this.volume,
			durationSeconds,
			onStop
		);
	}

	public stopAll(): void {
		this.player.sendEvent({
			type: JSSynth.SequencerEventTypes.EventType.AllNotesOff,
			channel: 0,
		});
		this.player.sendEvent({
			type: JSSynth.SequencerEventTypes.EventType.AllNotesOff,
			channel: 1,
		});
	}

	// eslint-disable-next-line @typescript-eslint/promise-function-async
	private start(): Promise<void> {
		if (this.startPromise === undefined) {
			this.startPromise = this.player.startPlayer(this.ctx).then(() => {
				this.startTime = Date.now();
			});
		}
		if (this.releasePlayerTimerId !== undefined) {
			clearTimeout(this.releasePlayerTimerId);
		}
		this.releasePlayerTimerId = setTimeout(() => this.stopPlayer(), 30000);
		return this.startPromise;
	}

	private stopPlayer(): void {
		const t = this.releasePlayerTimerId;
		/* istanbul ignore else */
		if (t !== undefined) {
			this.releasePlayerTimerId = undefined;
			clearTimeout(t);
		}
		this.player.stopPlayer();
		this.player.releasePlayer();
		this.startPromise = undefined;
	}

	private onUserEvent(e: JSSeq.Events.PlayUserEventObject) {
		/* istanbul ignore else */
		if (e.type === 'onStop') {
			const cb: (() => void) | undefined = e.data;
			/* istanbul ignore else */
			if (cb !== undefined) {
				cb();
			}
		}
	}
}
