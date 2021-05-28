import ChordAppends from '../../../model/ChordAppends';
import ChordType from '../../../model/ChordType';
import validateChordAppends from '../validateChord/validateChordAppends';
import validateChordType from '../validateChord/validateChordType';
import adjustForNinthAppend from './adjustForNinthAppend';

export default function getRandomAppendImpl(
	level: number,
	type: ChordType,
	prevAppends: readonly ChordAppends[],
	getRandom: () => number
): ChordAppends[] {
	if (level === 0) {
		return [ChordAppends.None];
	}
	let appends: ChordAppends;
	if (type === ChordType.Sus4) {
		if (prevAppends.length === 1) {
			return [ChordAppends.None];
		}
		switch (Math.floor(getRandom() * (level === 3 ? 3 : 2))) {
			case 0:
				appends = ChordAppends.None;
				break;
			case 1:
				appends = ChordAppends.Seventh;
				break;
			case 2:
				appends = ChordAppends.Major7;
				break;
			/* istanbul ignore next */
			default:
				appends = ChordAppends.None;
				break;
		}
	} else if (
		type === ChordType.Diminish ||
		type === ChordType.Diminish7 ||
		type === ChordType.Augment ||
		type === ChordType.Power
	) {
		appends = ChordAppends.None;
	} else {
		switch (level) {
			case 1:
				appends = Math.floor(
					getRandom() * ChordAppends._Level1
				) as ChordAppends;
				break;
			case 2:
				appends = Math.floor(
					getRandom() * ChordAppends._Level2
				) as ChordAppends;
				break;
			case 3:
				appends = Math.floor(
					getRandom() * ChordAppends._Level3
				) as ChordAppends;
				break;
			case 4:
				appends = Math.floor(
					getRandom() * ChordAppends._Level4
				) as ChordAppends;
				break;
			/* istanbul ignore next */
			default:
				appends = ChordAppends.None;
				break;
		}
	}
	if (appends === ChordAppends.None) {
		return [ChordAppends.None];
	}

	const testAppends = prevAppends.concat(appends);
	const addedAppends = adjustForNinthAppend(testAppends, appends);
	// if validation is OK, no error is thrown
	validateChordType(type, testAppends);
	validateChordAppends(testAppends);
	return addedAppends !== null ? [appends, addedAppends] : [appends];
}
