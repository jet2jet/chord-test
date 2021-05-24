import ChordAppends from '../../../model/ChordAppends';
import type RelativeNoteType from '../../../model/RelativeNoteType';

import applyChordAppend from './applyChordAppend';

describe('applyChordAppend', () => {
	type Case = [
		append: ChordAppends,
		input: RelativeNoteType[],
		expect: [addNote: RelativeNoteType, removeNotes: RelativeNoteType[]]
	];
	const cases: Case[] = [
		[ChordAppends.None, [], [-1, []]],
		[ChordAppends.None, [4, 7], [-1, []]],
		[-1 as ChordAppends, [], [-1, []]],

		[ChordAppends.Seventh, [4, 7], [10, []]],
		[ChordAppends.Major7, [4, 7], [11, []]],
		[ChordAppends.Sixth, [4, 7], [9, []]],
		[ChordAppends.Ninth, [4, 7], [14, []]],
		[ChordAppends.Flat9, [4, 7], [13, []]],
		[ChordAppends.Sharp9, [4, 7], [15, []]],
		[ChordAppends.Add9, [4, 7], [2, []]],
		[ChordAppends.Eleventh, [4, 7], [17, []]],
		[ChordAppends.Sharp11, [4, 7], [18, []]],
		[ChordAppends.Thirteenth, [4, 7], [21, []]],
		[ChordAppends.Flat13, [4, 7], [20, []]],
		[ChordAppends.Flat5, [4, 7], [6, [7]]],
		[ChordAppends.Flat5, [4], [6, []]],
		[ChordAppends.Sharp5, [4, 7], [8, [7]]],
		[ChordAppends.Sharp5, [4], [8, []]],
	];

	it.each(cases)(
		"returns appropriate values (append = '%s', input = '%s', output = '%s'",
		(append, input, expected) => {
			expect(applyChordAppend(input, append)).toEqual(expected);
		}
	);
});
