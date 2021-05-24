import ChordAppends from '../../../model/ChordAppends';

import validateChordAppends from './validateChordAppends';
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

describe('validateChordAppends', () => {
	const validPatterns: Array<
		ChordAppends[] | [ChordAppends, ChordAppends[]]
	> = [
		[],
		[ChordAppends.None],
		[
			ChordAppends.None,
			[
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
			],
		],
		[ChordAppends.Seventh],
		[ChordAppends.Seventh, ChordAppends.Flat5],
		[ChordAppends.Seventh, ChordAppends.Sharp5],
		[ChordAppends.Major7],
		[ChordAppends.Major7, ChordAppends.Flat5],
		[ChordAppends.Major7, ChordAppends.Sharp5],
	];
	const invalidPatterns: Array<
		[ValidateErrorReason, ChordAppends[] | [ChordAppends, ChordAppends[]]]
	> = [
		[
			ValidateErrorReason.NoMajor7WithSeventh,
			[ChordAppends.Seventh, ChordAppends.Major7],
		],
		[
			ValidateErrorReason.NoMajor7WithSeventh,
			[ChordAppends.Major7, ChordAppends.Seventh],
		],
		[
			ValidateErrorReason.NoFlat5WithOtherNumbers,
			[
				ChordAppends.Flat5,
				[
					ChordAppends.Sixth,
					ChordAppends.Ninth,
					ChordAppends.Flat9,
					ChordAppends.Sharp9,
					ChordAppends.Add9,
					ChordAppends.Eleventh,
					ChordAppends.Sharp11,
					ChordAppends.Thirteenth,
					ChordAppends.Flat13,
					ChordAppends.Sharp5,
				],
			],
		],
		[
			ValidateErrorReason.NoSharp5WithOtherNumbers,
			[
				ChordAppends.Sharp5,
				[
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
				],
			],
		],
	];
	const invalidIfCombinedWithAnyOtherAppends: Array<
		[ChordAppends, ValidateErrorReason]
	> = [
		[ChordAppends.Sixth, ValidateErrorReason.NoSixthWithOtherNumbers],
		[ChordAppends.Add9, ValidateErrorReason.NoAdd9WithOtherNumbers],
	];

	const isAnyPattern = <T>(data: T[] | [T, T[]]): data is [T, T[]] =>
		Array.isArray(data[1]);

	describe.each(validPatterns)('check valid pattern', (...patternArray) => {
		if (isAnyPattern(patternArray)) {
			it(`should not throw if pattern array is valid (pattern: [${
				patternArray[0]
			}, <${patternArray[1].join(', ')}>])`, () => {
				patternArray[1].forEach((pattern) => {
					expect(() =>
						validateChordAppends([patternArray[0], pattern])
					).not.toThrow();
					expect(() =>
						validateChordAppends([pattern, patternArray[0]])
					).not.toThrow();
				});
			});
		} else {
			it(`should not throw if pattern array is valid (pattern: [${patternArray.join(
				', '
			)}])`, () => {
				expect(() => validateChordAppends(patternArray)).not.toThrow();
			});
		}
	});
	describe.each(invalidPatterns)(
		'check invalid pattern',
		(expectedError, patternArray) => {
			if (isAnyPattern(patternArray)) {
				it(`should throw if pattern array is invalid (pattern: [${
					patternArray[0]
				}, <${patternArray[1].join(', ')}>])`, () => {
					patternArray[1].forEach((pattern) => {
						expect(() =>
							validateChordAppends([patternArray[0], pattern])
						).toThrow(new ValidateError(expectedError));
					});
				});
			} else {
				it(`should not throw if pattern array is valid (pattern: [${patternArray.join(
					', '
				)}])`, () => {
					expect(() => validateChordAppends(patternArray)).toThrow(
						new ValidateError(expectedError)
					);
				});
			}
		}
	);
	describe('check invalid pattern (combination)', () => {
		it.each(invalidIfCombinedWithAnyOtherAppends)(
			'should throw if any other appends are combined with %s',
			(basePattern, expectedError) => {
				allAppends.forEach((otherPattern) => {
					if (basePattern === otherPattern) {
						return;
					}
					expect(() =>
						validateChordAppends([basePattern, otherPattern])
					).toThrow(new ValidateError(expectedError));
				});
			}
		);
	});
});
