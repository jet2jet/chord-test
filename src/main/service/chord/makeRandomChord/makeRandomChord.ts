import type Chord from '../../../model/Chord';
import ChordAppends from '../../../model/ChordAppends';
import getRandomAppend from './getRandomAppend';
import getRandomChordType from './getRandomChordType';
import getRandomRoot from './getRandomRoot';

export default function makeRandomChord(
	level: number,
	getRandom: () => number
): Chord {
	const [root, rootSharpFlat] = getRandomRoot(level, getRandom);
	const type = getRandomChordType(level, getRandom);
	const appends: ChordAppends[] = [];
	while (true) {
		const append = getRandomAppend(level, type, appends, getRandom);
		if (append === ChordAppends.None) {
			break;
		}
		appends.push(append);
	}
	appends.sort((a, b) => a - b);
	return { root, rootSharpFlat, type, appends };
}
