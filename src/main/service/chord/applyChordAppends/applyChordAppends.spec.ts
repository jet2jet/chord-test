import { mocked } from 'ts-jest/utils';

import type RelativeNoteType from '../../../model/RelativeNoteType';
import ChordAppends from '../../../model/ChordAppends';

import applyChordAppend from './applyChordAppend';
import applyChordAppends from './applyChordAppends';

jest.mock('./applyChordAppend');

describe('applyChordAppends', () => {
	it("should return a concatenated tuple of applyChordAppend's return values", () => {
		const relNotes: readonly RelativeNoteType[] = [10, 9, 8, 7, 6];
		const remainingRelNotes: RelativeNoteType[] = [10, 9, 8, 6];
		const removedNotes: RelativeNoteType[] = [7];
		const input: ChordAppends[] = [
			ChordAppends.None,
			ChordAppends.Major7,
			ChordAppends.Sharp11,
		];

		let calls = 0;
		mocked(applyChordAppend).mockImplementation((_r, a) => {
			++calls;
			return [a, calls === 2 ? removedNotes : []];
		});

		expect(applyChordAppends(relNotes, input)).toEqual([
			input,
			removedNotes,
		]);
		expect(applyChordAppend).toBeCalledTimes(3);
		input.forEach((a, i) =>
			expect(applyChordAppend).toBeCalledWith(
				i < 2 ? relNotes : remainingRelNotes,
				a
			)
		);
	});
});
