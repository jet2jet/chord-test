import ChordType from '../../model/ChordType';
import type RelativeNoteType from '../../model/RelativeNoteType';

import chordTypeToRelativeNotes from './chordTypeToRelativeNotes';

describe('chordTypeToRelativeNotes', () => {
	type Case = [ChordType, RelativeNoteType[]];
	const cases: Case[] = [
		[ChordType.Major, [4, 7]],
		[ChordType.Minor, [3, 7]],
		[ChordType.Sus4, [5, 7]],
		[ChordType.Diminish, [3, 6]],
		[ChordType.Diminish7, [3, 6, 9]],
		[ChordType.Augment, [4, 8]],
		[ChordType.Power, [7]],
		[-1 as ChordType, []],
	];

	it.each(cases)(
		"returns appropriate values (type = '%s', output = '%s'",
		(type, expected) => {
			expect(chordTypeToRelativeNotes(type)).toEqual(expected);
		}
	);
});
