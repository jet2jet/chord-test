import { mocked } from 'ts-jest/utils';
import { midiNoteToHertz } from '../note';
import OscillatorPlayer from './OscillatorPlayer';

const dummyCurrentTime = 12345;
const dummyDestination: any = { __type: 'destinationNode' };
const dummyFrequency: any = { __type: 'frequency' };
const dummyFrequencyValue = 1;
const dummyOscillatorType: any = { __type: 'oscillatorType' };
Object.defineProperty(dummyFrequency, 'value', {
	get: () => dummyFrequencyValue,
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	set: () => {},
	configurable: true,
	enumerable: true,
});

jest.mock('../note');

class FakeOscillatorNode implements Partial<OscillatorNode> {
	public static readonly lastNodes: FakeOscillatorNode[] = [];

	public constructor() {
		FakeOscillatorNode.lastNodes.push(this);
	}

	public get frequency(): AudioParam {
		return dummyFrequency;
	}
	public get type(): OscillatorType {
		return dummyOscillatorType;
	}
	public set type(_: OscillatorType) {
		// do nothing
	}
	public connect(): AudioNode {
		// do nothing
		return (this as unknown) as AudioNode;
	}
	public disconnect(): void {
		// do nothing
	}
	public start(): void {
		// do nothing
	}
	public stop(): void {
		// do nothing
	}
	public addEventListener(
		_type: string,
		_listener: EventListenerOrEventListenerObject,
		_options?: boolean | AddEventListenerOptions
	): void {
		// do nothing
	}
}

const dummyGainParam: any = {
	__type: 'gainParam',
};
const dummyGainParamValue = 1;
Object.defineProperty(dummyGainParam, 'value', {
	get: () => dummyGainParamValue,
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	set: () => {},
	configurable: true,
	enumerable: true,
});
class FakeGainNode implements Partial<GainNode> {
	public static readonly lastNodes: FakeGainNode[] = [];

	public constructor() {
		FakeGainNode.lastNodes.push(this);
	}

	public get gain(): AudioParam {
		return dummyGainParam;
	}

	public connect(): AudioNode {
		// do nothing
		return (this as unknown) as AudioNode;
	}
}

class FakeAudioContext implements Partial<BaseAudioContext> {
	public createGain(): GainNode {
		return (new FakeGainNode() as unknown) as GainNode;
	}
	public createOscillator(): OscillatorNode {
		return (new FakeOscillatorNode() as unknown) as OscillatorNode;
	}
	public get currentTime(): number {
		return dummyCurrentTime;
	}
	public get destination(): AudioDestinationNode {
		return dummyDestination;
	}
}

afterEach(() => {
	FakeOscillatorNode.lastNodes.splice(0);
	FakeGainNode.lastNodes.splice(0);
});

describe('OscillatorPlayer', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});
	it('should instantiate', () => {
		const ctx = new FakeAudioContext();
		const player = new OscillatorPlayer(ctx as BaseAudioContext);

		expect(player).toBeInstanceOf(OscillatorPlayer);
	});
	it('should work volume/rootVolume property', () => {
		const dummyVolume = 321;
		const dummyRootVolume = 654;
		const ctx = new FakeAudioContext();
		const player = new OscillatorPlayer(ctx as BaseAudioContext);

		player.volume = dummyVolume;
		player.rootVolume = dummyRootVolume;
		expect(player.volume).toEqual(dummyVolume);
		expect(player.rootVolume).toEqual(dummyRootVolume);
	});
	it('should work type/rootType property', () => {
		const dummyType: any = { __type: 'type' };
		const dummyRootType: any = { __type: 'rootType' };
		const ctx = new FakeAudioContext();
		const player = new OscillatorPlayer(ctx as BaseAudioContext);

		// default value
		expect(player.type).toEqual('square');
		expect(player.rootType).toEqual('sawtooth');

		player.type = dummyType;
		player.rootType = dummyRootType;
		expect(player.type).toEqual(dummyType);
		expect(player.rootType).toEqual(dummyRootType);
	});
	describe('for playing', () => {
		it.each([false, true])(
			'should use OscillatorNode and GainNode for playing (force stop: %s)',
			(forceStop) => {
				const dummyFrequencyValue = 1234;
				const dummyVolume = 321;
				const dummyRootVolume = 654;
				const dummyType2: any = { __type: 'type2' };
				const dummyType3: any = { __type: 'type3' };

				const ctx = new FakeAudioContext();
				jest.spyOn(ctx, 'createGain');
				const spyDest = jest.spyOn(ctx, 'destination', 'get');
				const spyCurTime = jest.spyOn(ctx, 'currentTime', 'get');
				const spyGainValueSet = jest.spyOn(
					dummyGainParam,
					'value',
					'set'
				);
				jest.spyOn(FakeGainNode.prototype, 'connect');
				mocked(midiNoteToHertz).mockReturnValue(dummyFrequencyValue);
				jest.spyOn(FakeOscillatorNode.prototype, 'connect');
				jest.spyOn(FakeOscillatorNode.prototype, 'disconnect');
				jest.spyOn(FakeOscillatorNode.prototype, 'start');
				jest.spyOn(FakeOscillatorNode.prototype, 'stop');
				const spyTypeSetter = jest.spyOn(
					FakeOscillatorNode.prototype,
					'type',
					'set'
				);
				const spyFrequency = jest.spyOn(
					FakeOscillatorNode.prototype,
					'frequency',
					'get'
				);
				const spyFrequencySetter = jest.spyOn(
					dummyFrequency,
					'value',
					'set'
				);
				const spyAddEvent = jest.spyOn(
					FakeOscillatorNode.prototype,
					'addEventListener'
				);

				const player = new OscillatorPlayer(ctx as BaseAudioContext);

				player.volume = dummyVolume;
				player.rootVolume = dummyRootVolume;
				player.play(60, 1, false);
				player.type = dummyType2;
				player.play(69, 1, false);
				player.rootType = dummyType3;
				player.play(48, 1, true);

				// test gain
				expect(ctx.createGain).toHaveBeenCalledWith();
				expect(ctx.createGain).toHaveBeenCalledTimes(3);
				expect(FakeGainNode.lastNodes.length).toEqual(3);
				const gainNodes = FakeGainNode.lastNodes;
				expect(spyDest).toHaveBeenCalledTimes(1);
				expect(
					mocked(FakeGainNode.prototype.connect).mock.calls
				).toEqual([
					[dummyDestination],
					[dummyDestination],
					[dummyDestination],
				]);
				expect(FakeGainNode.prototype.connect).toHaveBeenCalledTimes(3);
				expect(spyGainValueSet).toHaveBeenCalledTimes(3);
				expect(spyGainValueSet.mock.calls[0][0]).toEqual(
					0.0625 * dummyVolume
				);
				expect(spyGainValueSet.mock.calls[1][0]).toEqual(
					0.0625 * dummyVolume
				);
				expect(spyGainValueSet.mock.calls[2][0]).toEqual(
					0.0625 * dummyRootVolume
				);

				// test oscillator node initialization
				expect(midiNoteToHertz).toHaveBeenCalled();
				expect(mocked(midiNoteToHertz).mock.calls).toEqual([
					[60],
					[69],
					[48],
				]);
				expect(spyTypeSetter).toHaveBeenCalled();
				expect(spyTypeSetter.mock.calls).toEqual([
					['square'],
					[dummyType2],
					[dummyType3],
				]);
				expect(spyFrequency).toHaveBeenCalled();
				expect(spyFrequencySetter.mock.calls).toEqual([
					[dummyFrequencyValue],
					[dummyFrequencyValue],
					[dummyFrequencyValue],
				]);

				// test oscillator node play
				expect(FakeOscillatorNode.prototype.connect).toHaveBeenCalled();
				expect(
					mocked(FakeOscillatorNode.prototype.connect).mock.calls
				).toEqual([[gainNodes[0]], [gainNodes[1]], [gainNodes[2]]]);
				expect(
					FakeOscillatorNode.prototype.start
				).toHaveBeenCalledWith();
				expect(
					FakeOscillatorNode.prototype.start
				).toHaveBeenCalledTimes(3);
				expect(FakeOscillatorNode.prototype.stop).toHaveBeenCalled();
				expect(
					mocked(FakeOscillatorNode.prototype.stop).mock.calls
				).toEqual([
					[dummyCurrentTime + 1],
					[dummyCurrentTime + 1],
					[dummyCurrentTime + 1],
				]);

				expect(spyCurTime).toHaveBeenCalled();
				expect(
					FakeOscillatorNode.prototype.addEventListener
				).toHaveBeenCalled();
				expect(
					mocked(FakeOscillatorNode.prototype.addEventListener).mock
						.calls
				).toEqual([
					['ended', expect.anything()],
					['ended', expect.anything()],
					['ended', expect.anything()],
				]);
				const fnStop1 = spyAddEvent.mock.calls[0][1] as EventListener;
				const fnStop2 = spyAddEvent.mock.calls[1][1] as EventListener;
				const fnStop3 = spyAddEvent.mock.calls[2][1] as EventListener;
				expect(typeof fnStop1).toEqual('function');
				expect(typeof fnStop2).toEqual('function');
				expect(typeof fnStop3).toEqual('function');

				// test oscillator node stop
				if (forceStop) {
					player.stopAll();
					// OscillatorNode.prototype.stop would call 'ended' handler
					const dummy: any = {};
					fnStop1(dummy);
					fnStop2(dummy);
					fnStop3(dummy);

					expect(
						FakeOscillatorNode.prototype.stop
					).toHaveBeenCalledTimes(6);
					expect(
						mocked(
							FakeOscillatorNode.prototype.stop
						).mock.calls.slice(3)
					).toEqual([[], [], []]);
				} else {
					// emulate auto-stop
					const dummy: any = {};
					fnStop1(dummy);
					fnStop2(dummy);
					fnStop3(dummy);

					expect(
						FakeOscillatorNode.prototype.disconnect
					).toHaveBeenCalled();
					expect(
						mocked(FakeOscillatorNode.prototype.disconnect).mock
							.calls
					).toEqual([[], [], []]);

					player.stopAll();
					// stop should not be called twice
					expect(
						FakeOscillatorNode.prototype.stop
					).toHaveBeenCalledTimes(3);
				}

				// disconnect should be called only on stop
				expect(
					FakeOscillatorNode.prototype.disconnect
				).toHaveBeenCalledTimes(3);
			}
		);
	});
});
