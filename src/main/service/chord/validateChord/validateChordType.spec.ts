import ChordAppends from '../../../model/ChordAppends';
import ChordType from '../../../model/ChordType';

import validateChordType from './validateChordType';
import ValidateError, { ValidateErrorReason } from './ValidateError';

const allAppends: readonly ChordAppends[] = [
	ChordAppends.Seventh,
	ChordAppends.Major7,
	ChordAppends.Sixth,
	ChordAppends.Ninth,
	ChordAppends.Flat9,
	ChordAppends.Sharp9,
	ChordAppends.Add9,
	ChordAppends.Eleventh,
	ChordAppends.Sharp11,
	ChordAppends.Thirteenth,
	ChordAppends.Flat13,
	ChordAppends.Flat5,
	ChordAppends.Sharp5,
];

describe('validateChordType', () => {
	const validPatterns: Array<
		[type: ChordType, appends: readonly ChordAppends[]]
	> = [
		[ChordType.Major, allAppends],
		[
			ChordType.Minor,
			[
				ChordAppends.Seventh,
				ChordAppends.Major7,
				ChordAppends.Sixth,
				ChordAppends.Ninth,
				ChordAppends.Flat9,
				ChordAppends.Add9,
				ChordAppends.Eleventh,
				ChordAppends.Sharp11,
				ChordAppends.Thirteenth,
				ChordAppends.Flat13,
			],
		],
		[ChordType.Sus4, [ChordAppends.Seventh]],
		[ChordType.Diminish, []],
		[ChordType.Diminish7, []],
		[ChordType.Augment, []],
		[ChordType.Power, []],
	];

	describe.each(validPatterns)(
		'check patterns for type %d',
		(type, appends) => {
			it('should not throw if no appends are specified', () => {
				expect(() => validateChordType(type, [])).not.toThrow();
			});
			if (appends.length > 0) {
				it.each(appends)(
					"should not throw if append '%d' is included",
					(append) => {
						expect(() =>
							validateChordType(type, [append])
						).not.toThrow();
					}
				);
			}
			const invalidAppends = allAppends.filter(
				(a) => appends.indexOf(a) < 0
			);
			if (invalidAppends.length > 0) {
				it.each(invalidAppends)(
					"should throw if append '%d' is included",
					(append) => {
						expect(() => validateChordType(type, [append])).toThrow(
							new ValidateError(
								ValidateErrorReason.InvalidAppendForChordType
							)
						);
					}
				);
			}
		}
	);
});
