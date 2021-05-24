import ChordAppends from '../../../model/ChordAppends';
import ChordType from '../../../model/ChordType';

import ValidateError, { ValidateErrorReason } from './ValidateError';

function throwIfAppendsIncluded(
	targetAppends: readonly ChordAppends[],
	prohibitedAppends: readonly ChordAppends[]
) {
	if (targetAppends.some((a) => prohibitedAppends.indexOf(a) >= 0)) {
		throw new ValidateError(ValidateErrorReason.InvalidAppendForChordType);
	}
}

function throwIfAnyAppendsIncluded(targetAppends: readonly ChordAppends[]) {
	if (targetAppends.some((a) => a !== ChordAppends.None)) {
		throw new ValidateError(ValidateErrorReason.InvalidAppendForChordType);
	}
}

export default function validateChordType(
	chordType: ChordType,
	appends: readonly ChordAppends[]
): void {
	switch (chordType) {
		case ChordType.Major:
			break;
		case ChordType.Minor:
			throwIfAppendsIncluded(appends, [
				ChordAppends.Sharp9,
				ChordAppends.Flat5,
				ChordAppends.Sharp5,
			]);
			break;
		case ChordType.Sus4:
			throwIfAppendsIncluded(appends, [
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
			]);
			break;
		case ChordType.Diminish:
		case ChordType.Diminish7:
		case ChordType.Augment:
		case ChordType.Power:
			throwIfAnyAppendsIncluded(appends);
			break;
	}
}
