import ChordType from '../../model/ChordType';
import type DegreeAndRelativeNote from '../../model/DegreeAndRelativeNote';

import chordTypeToDegreesAndRelativeNotes from './chordTypeToDegreesAndRelativeNotes';

describe('chordTypeToDegreesAndRelativeNotes', () => {
	type Case = [ChordType, DegreeAndRelativeNote[]];
	const cases: Case[] = [
		[
			ChordType.Major,
			[
				[3, 4],
				[5, 7],
			],
		],
		[
			ChordType.Minor,
			[
				[3, 3],
				[5, 7],
			],
		],
		[
			ChordType.Sus4,
			[
				[4, 5],
				[5, 7],
			],
		],
		[
			ChordType.Diminish,
			[
				[3, 3],
				[5, 6],
			],
		],
		[
			ChordType.Diminish7,
			[
				[3, 3],
				[5, 6],
				[7, 9],
			],
		],
		[
			ChordType.Augment,
			[
				[3, 4],
				[5, 8],
			],
		],
		[ChordType.Power, [[5, 7]]],
		[-1 as ChordType, []],
	];

	it.each(cases)(
		"returns appropriate values (type = '%s', output = '%s'",
		(type, expected) => {
			expect(chordTypeToDegreesAndRelativeNotes(type)).toEqual(expected);
		}
	);
});
