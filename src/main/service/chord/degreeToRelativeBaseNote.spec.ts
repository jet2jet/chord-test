import type RelativeNoteType from '../../model/RelativeNoteType';

import degreeToRelativeBaseNote from './degreeToRelativeBaseNote';

describe('degreeToRelativeBaseNote', () => {
	type Case = [degree: number, relativeNote: RelativeNoteType];
	const cases: Case[] = [
		[0, 0], // invalid
		[1, 0],
		[2, 2],
		[3, 4],
		[4, 5],
		[5, 7],
		[6, 9],
		[7, 11],
		[8, 12],
		[9, 14],
		[10, 16],
		[11, 17],
		[12, 19],
		[13, 21],
		[14, 23],
	];
	it.each(cases)(
		'should return: %s degree to %s relative value',
		(degree, expected) => {
			expect(degreeToRelativeBaseNote(degree)).toEqual(expected);
		}
	);
	it.each([-2, -1, 15, 16])(
		'should throw for invalid degree: %s',
		(degree) => {
			expect(() => degreeToRelativeBaseNote(degree)).toThrow();
		}
	);
});
