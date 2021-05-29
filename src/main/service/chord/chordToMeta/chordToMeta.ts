import type Chord from '../../../model/Chord';
import ChordMeta from '../../../model/ChordMeta';
import type { ReadonlyRecursive } from '../../../utils/TypeUtils';

import chordAppendsToMeta from './chordAppendsToMeta';
import chordTypeToMeta from './chordTypeToMeta';

export default function chordToMeta(
	chord: ReadonlyRecursive<Chord>
): ChordMeta[] {
	const typeMeta = chordTypeToMeta(chord.type);
	const appendMeta = chordAppendsToMeta(typeMeta, chord.appends);
	return [ChordMeta.Root].concat(typeMeta).concat(appendMeta);
}
