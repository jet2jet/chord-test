import compareDegreesAndRelativeNotes from './compareDegreesAndRelativeNotes';

describe('compareDegreesAndRelativeNotes', () => {
	describe('relative values are different', () => {
		type Case = [relativeA: number, relativeB: number];
		const cases: Case[] = [
			[4, 3],
			[3, 4],
		];
		it.each(cases)(
			'should return relative-value diffs (a = %s, b = %s)',
			(a, b) => {
				expect(compareDegreesAndRelativeNotes([3, a], [3, b])).toEqual(
					a - b
				);
			}
		);
	});
	describe('relative values are the same', () => {
		type Case = [degreeA: number, degreeB: number];
		const cases: Case[] = [
			[3, 4],
			[3, 3],
			[4, 3],
		];
		it.each(cases)(
			'should return degree-value diffs (a = %s, b = %s)',
			(a, b) => {
				expect(compareDegreesAndRelativeNotes([a, 4], [b, 4])).toEqual(
					a - b
				);
			}
		);
	});
});
