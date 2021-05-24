import ChordAppends from '../../../model/ChordAppends';
import type ChordType from '../../../model/ChordType';
import getRandomAppendImpl from './getRandomAppendImpl';

export default function getRandomAppend(
	level: number,
	type: ChordType,
	prevAppends: readonly ChordAppends[],
	getRandom: () => number
): ChordAppends {
	if (level === 0) {
		return ChordAppends.None;
	}
	let tryCount = 1;
	while (tryCount <= 3) {
		try {
			return getRandomAppendImpl(level, type, prevAppends, getRandom);
		} catch (e: unknown) {
			// validation failed; try next append
		}
		++tryCount;
	}
	return ChordAppends.None;
}
