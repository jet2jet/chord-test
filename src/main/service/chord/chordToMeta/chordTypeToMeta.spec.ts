import ChordMeta from '../../../model/ChordMeta';
import ChordType from '../../../model/ChordType';

import chordTypeToMeta from './chordTypeToMeta';

describe('chordTypeToMeta', () => {
	type Case = [ChordType, ChordMeta[]];
	const cases: Case[] = [
		[ChordType.Major, [ChordMeta.Required, ChordMeta.Omittable]],
		[ChordType.Minor, [ChordMeta.Required, ChordMeta.Omittable]],
		[ChordType.Sus4, [ChordMeta.Required, ChordMeta.Omittable]],
		[ChordType.Diminish, [ChordMeta.Required, ChordMeta.Required]],
		[
			ChordType.Diminish7,
			[ChordMeta.Required, ChordMeta.Required, ChordMeta.Required],
		],
		[ChordType.Augment, [ChordMeta.Required, ChordMeta.Required]],
		[ChordType.Power, [ChordMeta.Required]],
		[-1 as ChordType, []],
	];

	it.each(cases)(
		"returns appropriate values (type = '%s', output = '%s'",
		(type, expected) => {
			expect(chordTypeToMeta(type)).toEqual(expected);
		}
	);
});
