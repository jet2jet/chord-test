import ChordAppends from '../../../model/ChordAppends';

import ValidateError, { ValidateErrorReason } from './ValidateError';

function throwErrorIfMatch(
	predicate: (value: ChordAppends) => boolean,
	target: readonly ChordAppends[],
	ignoreIndex: number,
	reason: ValidateErrorReason
): void {
	if (target.some((a, i) => i !== ignoreIndex && predicate(a))) {
		throw new ValidateError(reason);
	}
}

export default function validateChordAppends(
	appends: readonly ChordAppends[]
): void {
	appends.forEach((append, i) => {
		throwErrorIfMatch(
			(a) => a === append,
			appends,
			i,
			ValidateErrorReason.Duplicated
		);
		switch (append) {
			case ChordAppends.Major7:
				throwErrorIfMatch(
					(a) => a === ChordAppends.Seventh,
					appends,
					i,
					ValidateErrorReason.NoMajor7WithSeventh
				);
				break;
			case ChordAppends.Sixth:
				throwErrorIfMatch(
					(a) => a !== ChordAppends.Sixth && a !== ChordAppends.None,
					appends,
					i,
					ValidateErrorReason.NoSixthWithOtherNumbers
				);
				break;
			case ChordAppends.Add9:
				throwErrorIfMatch(
					(a) => a !== ChordAppends.Add9 && a !== ChordAppends.None,
					appends,
					i,
					ValidateErrorReason.NoAdd9WithOtherNumbers
				);
				break;
			case ChordAppends.Flat5:
				throwErrorIfMatch(
					(a) =>
						a !== ChordAppends.Flat5 &&
						a !== ChordAppends.None &&
						a !== ChordAppends.Seventh &&
						a !== ChordAppends.Major7,
					appends,
					i,
					ValidateErrorReason.NoFlat5WithOtherNumbers
				);
				break;
			case ChordAppends.Sharp5:
				throwErrorIfMatch(
					(a) =>
						a !== ChordAppends.Sharp5 &&
						a !== ChordAppends.None &&
						a !== ChordAppends.Seventh &&
						a !== ChordAppends.Major7,
					appends,
					i,
					ValidateErrorReason.NoSharp5WithOtherNumbers
				);
				break;
			case ChordAppends.Ninth:
			case ChordAppends.Flat9:
			case ChordAppends.Sharp9:
				throwErrorIfMatch(
					(a) =>
						a === ChordAppends.Ninth ||
						a === ChordAppends.Flat9 ||
						a === ChordAppends.Sharp9,
					appends,
					i,
					ValidateErrorReason.NoSameDegrees
				);
				break;
			case ChordAppends.Eleventh:
			case ChordAppends.Sharp11:
				throwErrorIfMatch(
					(a) =>
						a === ChordAppends.Eleventh ||
						a === ChordAppends.Sharp11,
					appends,
					i,
					ValidateErrorReason.NoSameDegrees
				);
				break;
			case ChordAppends.Thirteenth:
			case ChordAppends.Flat13:
				throwErrorIfMatch(
					(a) =>
						a === ChordAppends.Thirteenth ||
						a === ChordAppends.Flat13,
					appends,
					i,
					ValidateErrorReason.NoSameDegrees
				);
				break;
		}
	});
}
