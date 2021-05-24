import type Chord from '../../../model/Chord';
import ChordMeta from '../../../model/ChordMeta';
import type { ReadonlyRecursive } from '../../../utils/TypeUtils';

import chordAppendsToMeta from './chordAppendsToMeta';
import chordTypeToMeta from './chordTypeToMeta';

export default function chordToMeta(
	chord: ReadonlyRecursive<Chord>
): ChordMeta[] {
	return [ChordMeta.Root]
		.concat(chordTypeToMeta(chord.type))
		.concat(chordAppendsToMeta(chord.appends));
}
