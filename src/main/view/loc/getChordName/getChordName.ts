import type Chord from '../../../model/Chord';
import ChordAppends from '../../../model/ChordAppends';
import ChordType from '../../../model/ChordType';
import type { ReadonlyRecursive } from '../../../utils/TypeUtils';
import getNoteName from '../getNoteName';
import addChordAppendNames from './addChordAppendNames';
import getChordTypeName from './getChordTypeName';

export default function getChordName(chord: ReadonlyRecursive<Chord>): string {
	let ret = getNoteName(chord.root, chord.rootSharpFlat, 0);
	let appends = chord.appends;
	let isFirstAppends = true;
	if (chord.type === ChordType.Sus4) {
		const i = appends.indexOf(ChordAppends.Seventh);
		if (i >= 0) {
			ret = addChordAppendNames(ret, [ChordAppends.Seventh], true);
			const newAppends = appends.slice();
			newAppends.splice(i, 1);
			appends = newAppends;
			isFirstAppends = false;
		}
	}
	const type = getChordTypeName(chord.type);
	ret += type;
	return addChordAppendNames(ret, appends, isFirstAppends);
}
