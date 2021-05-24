import { mocked } from 'ts-jest/utils';

import SoundfontPlayer from './SoundfontPlayer';
import loadBinary from './loadBinary';
import volumeToMidiVolume from './volumeToMidiVolume';

/* eslint-disable @typescript-eslint/no-empty-function */
const dummyPlayer = {
	addEventHandler: jest.fn((() => {}) as (
		name: string,
		fn: (e: any) => void
	) => void),
	setMasterVolume: jest.fn(() => {}),
	setAudioWorkletScripts: jest.fn(() => {}),
	setRenderFrameCount: jest.fn(async () => {}),
	setPlayOptions: jest.fn(() => {}),
	loadSoundfont: jest.fn(async () => {}),
	changeVolume: jest.fn(() => {}),
	sendEvent: jest.fn(() => {}),
	sendUserEvent: jest.fn((() => {}) as (
		type: string,
		time: number,
		data?: any
	) => void),
	startPlayer: jest.fn(async () => {}),
	stopPlayer: jest.fn(() => {}),
	releasePlayer: jest.fn(() => {}),
};
/* eslint-enable @typescript-eslint/no-empty-function */

jest.mock('js-sequencer', () => {
	/* eslint-disable @typescript-eslint/naming-convention */
	return {
		Core: {
			PlayerBase: {
				instantiatePlayerBase: jest.fn(async () => dummyPlayer),
			},
		},
	};
	/* eslint-enable @typescript-eslint/naming-convention */
});
jest.mock('./loadBinary');
jest.mock('./volumeToMidiVolume');

describe('SoundfontPlayer', () => {
	beforeAll(() => {
		jest.useFakeTimers();
	});
	afterAll(() => {
		jest.useRealTimers();
	});
	describe('for static', () => {
		describe('instantiate', () => {
			it('should return valid instance', async () => {
				const dummyContext: any = { __type: 'AudioContext' };
				const dummyBinary: any = { __type: 'Binary' };
				mocked(loadBinary).mockResolvedValueOnce(dummyBinary);

				const player = await SoundfontPlayer.instantiate(dummyContext);
				expect(player).toBeInstanceOf(SoundfontPlayer);
			});
		});
	});
	describe('for instance', () => {
		let player: SoundfontPlayer;
		beforeEach(async () => {
			const dummyContext: any = { __type: 'AudioContext' };
			const dummyBinary: any = { __type: 'Binary' };
			mocked(loadBinary).mockResolvedValueOnce(dummyBinary);

			player = await SoundfontPlayer.instantiate(dummyContext);
		});
		it('should work volume/rootVolume property', () => {
			const dummyVolume = 321;
			const dummyRootVolume = 654;

			player.volume = dummyVolume;
			player.rootVolume = dummyRootVolume;
			expect(player.volume).toEqual(dummyVolume);
			expect(player.rootVolume).toEqual(dummyRootVolume);
		});
		type Case = [isRootNote: boolean, hasStopHandler: boolean];
		const cases: Case[] = [
			[false, false],
			[true, false],
			[false, true],
			[true, true],
		];
		it.each(cases)(
			'should play and stop correctly (isRootNote: %s, hasStopHandler: %s)',
			async (isRootNote, hasStopHandler) => {
				const dummyVolume = 321;
				const dummyRootVolume = 654;
				const dummyNote: any = { __type: 'NoteValue' };
				const dummyOnStop = jest.fn();
				let resolvePromise: () => void;
				let isResolved = false;
				let promiseSendEventCalled = new Promise<void>((resolve) => {
					resolvePromise = resolve;
				});
				dummyPlayer.sendEvent.mockImplementation(() => {
					if (!isResolved) {
						isResolved = true;
						resolvePromise();
					}
				});

				player.volume = dummyVolume;
				player.rootVolume = dummyRootVolume;
				player.play(
					dummyNote,
					5,
					isRootNote,
					hasStopHandler ? dummyOnStop : undefined
				);
				await promiseSendEventCalled;

				expect(volumeToMidiVolume).toHaveBeenCalledWith(
					isRootNote ? dummyRootVolume : dummyVolume
				);

				expect(dummyPlayer.addEventHandler).toHaveBeenCalledWith(
					'playuserevent',
					expect.any(Function)
				);
				expect(dummyPlayer.sendEvent).toHaveBeenCalled();

				if (hasStopHandler) {
					expect(dummyPlayer.sendUserEvent).toHaveBeenCalled();
					const userEventType =
						dummyPlayer.sendUserEvent.mock.calls[0][0];
					const userEventData =
						dummyPlayer.sendUserEvent.mock.calls[0][2];

					// not called when user event is not toggled
					expect(dummyOnStop).not.toHaveBeenCalled();

					// toggle user event
					const handler =
						dummyPlayer.addEventHandler.mock.calls[0][1];
					handler({
						type: userEventType,
						data: userEventData,
					});
					expect(dummyOnStop).toHaveBeenCalled();
				}

				// once more
				dummyPlayer.sendEvent.mockClear();
				dummyPlayer.sendUserEvent.mockClear();
				dummyOnStop.mockClear();
				isResolved = false;
				promiseSendEventCalled = new Promise<void>((resolve) => {
					resolvePromise = resolve;
				});
				dummyPlayer.sendEvent.mockImplementation(() => {
					if (!isResolved) {
						isResolved = true;
						resolvePromise();
					}
				});
				player.play(
					dummyNote,
					5,
					isRootNote,
					hasStopHandler ? dummyOnStop : undefined
				);
				await promiseSendEventCalled;
				expect(dummyPlayer.sendEvent).toHaveBeenCalled();

				if (hasStopHandler) {
					expect(dummyPlayer.sendUserEvent).toHaveBeenCalled();
					const userEventType =
						dummyPlayer.sendUserEvent.mock.calls[0][0];
					const userEventData =
						dummyPlayer.sendUserEvent.mock.calls[0][2];

					// not called when user event is not toggled
					expect(dummyOnStop).not.toHaveBeenCalled();

					// toggle user event
					const handler =
						dummyPlayer.addEventHandler.mock.calls[0][1];
					handler({
						type: userEventType,
						data: userEventData,
					});
					expect(dummyOnStop).toHaveBeenCalled();
				}

				// once more (with timer)
				jest.runAllTimers();

				dummyPlayer.sendEvent.mockClear();
				dummyPlayer.sendUserEvent.mockClear();
				dummyOnStop.mockClear();
				isResolved = false;
				promiseSendEventCalled = new Promise<void>((resolve) => {
					resolvePromise = resolve;
				});
				dummyPlayer.sendEvent.mockImplementation(() => {
					if (!isResolved) {
						isResolved = true;
						resolvePromise();
					}
				});
				player.play(
					dummyNote,
					5,
					isRootNote,
					hasStopHandler ? dummyOnStop : undefined
				);
				await promiseSendEventCalled;
				expect(dummyPlayer.sendEvent).toHaveBeenCalled();

				if (hasStopHandler) {
					expect(dummyPlayer.sendUserEvent).toHaveBeenCalled();
					const userEventType =
						dummyPlayer.sendUserEvent.mock.calls[0][0];
					const userEventData =
						dummyPlayer.sendUserEvent.mock.calls[0][2];

					// not called when user event is not toggled
					expect(dummyOnStop).not.toHaveBeenCalled();

					// toggle user event
					const handler =
						dummyPlayer.addEventHandler.mock.calls[0][1];
					handler({
						type: userEventType,
						data: userEventData,
					});
					expect(dummyOnStop).toHaveBeenCalled();
				}
			}
		);
		it('should work stopAll', () => {
			player.stopAll();
			expect(dummyPlayer.sendEvent).toHaveBeenCalled();
		});
	});
});
