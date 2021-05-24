import { midiNoteToHertz } from '../note';
import type PlayerBase from './PlayerBase';

export default class OscillatorPlayer implements PlayerBase {
	public volume: number = 1;
	public rootVolume: number = 1;

	private readonly _context: BaseAudioContext;
	private readonly _playing: Array<
		[node: OscillatorNode, onStop?: () => void]
	>;
	private readonly _destination: AudioNode;
	private _type: OscillatorType;
	private _rootType: OscillatorType;

	public constructor(
		ctx: BaseAudioContext,
		destination: AudioNode = ctx.destination
	) {
		this._context = ctx;
		this._destination = destination;
		this._playing = [];
		this._type = 'square';
		this._rootType = 'sawtooth';
	}

	public get type(): OscillatorType {
		return this._type;
	}

	public set type(value: OscillatorType) {
		this._type = value;
	}

	public get rootType(): OscillatorType {
		return this._rootType;
	}

	public set rootType(value: OscillatorType) {
		this._rootType = value;
	}

	public play(
		midiNote: number,
		durationSeconds: number,
		isRootNote: boolean,
		onStop?: () => void
	): void {
		const ctx = this._context;
		const node = ctx.createOscillator();
		const gain = ctx.createGain();
		this._playing.push([node, onStop]);
		node.addEventListener('ended', () => {
			const playing = this._playing;
			for (let i = 0; i < playing.length; ++i) {
				const [n, cb] = playing[i];
				if (n === node) {
					playing.splice(i, 1);
					node.disconnect();
					if (cb !== undefined) {
						cb();
					}
					break;
				}
			}
		});
		node.frequency.value = midiNoteToHertz(midiNote);
		node.type = isRootNote ? this._rootType : this._type;
		node.connect(gain);
		gain.gain.value = 0.0625 * (isRootNote ? this.rootVolume : this.volume);
		gain.connect(this._destination);
		node.start();
		node.stop(ctx.currentTime + durationSeconds);
	}

	public stopAll(): void {
		const nodes = this._playing.splice(0);
		for (const item of nodes) {
			const [node, cb] = item;
			node.stop();
			node.disconnect();
			if (cb !== undefined) {
				cb();
			}
		}
	}
}
