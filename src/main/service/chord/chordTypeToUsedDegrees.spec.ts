import ChordType from '../../model/ChordType';

import chordTypeToUsedDegrees from './chordTypeToUsedDegrees';

describe('chordTypeToUsedDegrees', () => {
	type Case = [ChordType, number[]];
	const cases: Case[] = [
		[ChordType.Major, [3, 5]],
		[ChordType.Minor, [3, 5]],
		[ChordType.Sus4, [4, 5]],
		[ChordType.Diminish, [3, 5]],
		[ChordType.Diminish7, [3, 5, 7]],
		[ChordType.Augment, [3, 5]],
		[ChordType.Power, [5]],
		[-1 as ChordType, []],
	];

	it.each(cases)(
		"returns appropriate values (type = '%s', output = '%s'",
		(type, expected) => {
			expect(chordTypeToUsedDegrees(type)).toEqual(expected);
		}
	);
});
