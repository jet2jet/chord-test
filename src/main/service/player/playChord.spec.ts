import { mocked } from 'ts-jest/utils';
import getRandomBoolean from '../../utils/getRandomBoolean';
import { generateNotes } from '../chord';
import { notesToMidiNotes } from '../note';

import playChord from './playChord';

jest.mock('../chord');
jest.mock('../note');

describe('playChord', () => {
	beforeAll(() => {
		jest.useFakeTimers();
	});
	afterAll(() => {
		jest.useRealTimers();
	});
	it('should call player.play for each notes', async () => {
		const dummyPlay = jest.fn();
		const dummyPlayer: any = {
			play: dummyPlay,
		};
		const dummyChord: any = { __type: 'Chord' };
		const dummyIsAllOptionalIncluded: any = {
			__type: 'IsAllOptionalIncluded',
		};
		const dummyLowestRootValue: any = { __type: 'LowestRootValue' };
		const dummyLowestChordValue: any = { __type: 'LowestChordValue' };
		const dummyDuration: any = { __type: 'Duration' };
		const dummyNote1: any = { __type: 'Note1' };
		const dummyNote2: any = { __type: 'Note2' };
		const dummyNote3: any = { __type: 'Note3' };
		const dummyMidiNote1: any = { __type: 'MidiNote1' };
		const dummyMidiNote2: any = { __type: 'MidiNote2' };
		const dummyMidiNote3: any = { __type: 'MidiNote3' };

		mocked(generateNotes).mockReturnValue([
			dummyNote1,
			dummyNote2,
			dummyNote3,
		]);
		mocked(notesToMidiNotes).mockImplementation((notes) => {
			return notes.map((note) => {
				switch ((note as any).__type) {
					case dummyNote1.__type:
						return dummyMidiNote1;
					case dummyNote2.__type:
						return dummyMidiNote2;
					case dummyNote3.__type:
						return dummyMidiNote3;
					default:
						throw new Error('Unexpected');
				}
			});
		});

		const promise = playChord(
			dummyPlayer,
			dummyChord,
			dummyIsAllOptionalIncluded,
			dummyLowestRootValue,
			dummyLowestChordValue,
			dummyDuration
		);

		expect(generateNotes).toHaveBeenCalledWith(
			dummyChord,
			dummyIsAllOptionalIncluded,
			getRandomBoolean
		);
		expect(notesToMidiNotes).toHaveBeenCalledWith(
			[dummyNote1],
			dummyLowestRootValue
		);
		expect(notesToMidiNotes).toHaveBeenCalledWith(
			[dummyNote1, dummyNote2, dummyNote3],
			dummyLowestChordValue
		);
		// must call four times -- root + chord notes
		expect(dummyPlay).toHaveBeenCalledTimes(4);
		expect(dummyPlay).toHaveBeenCalledWith(
			dummyMidiNote1,
			dummyDuration,
			true,
			expect.any(Function)
		);
		expect(dummyPlay).toHaveBeenCalledWith(
			dummyMidiNote1,
			dummyDuration,
			false,
			expect.any(Function)
		);
		expect(dummyPlay).toHaveBeenCalledWith(
			dummyMidiNote2,
			dummyDuration,
			false,
			expect.any(Function)
		);
		expect(dummyPlay).toHaveBeenCalledWith(
			dummyMidiNote3,
			dummyDuration,
			false,
			expect.any(Function)
		);

		// call 'onStop'
		for (const callData of dummyPlay.mock.calls) {
			callData[3]();
		}
		await expect(promise).resolves.toEqual(undefined);
	});
});
