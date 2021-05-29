import type Chord from '../../../model/Chord';
import type NoteType from '../../../model/NoteType';
import type { ReadonlyRecursive } from '../../../utils/TypeUtils';
import applyChordAppends from '../applyChordAppends';
import chordAppendsToMeta from '../chordToMeta/chordAppendsToMeta';
import chordTypeToMeta from '../chordToMeta/chordTypeToMeta';
import chordTypeToRelativeNotes from '../chordTypeToRelativeNotes';

import convertAddNotes from './convertAddNotes';
import convertTypeRelNotes from './convertTypeRelNotes';

export interface ChordWithCache extends ReadonlyRecursive<Chord> {
	_cachedNotes?: [NoteType[]?, NoteType[]?];
}

/**
 * @param getRandomBoolean return true if the note is to be included
 */
export default function generateNotes(
	chord: ChordWithCache,
	isAllOptionalIncluded: boolean,
	getRandomBoolean: () => boolean
): NoteType[] {
	const optionalAsIndex = isAllOptionalIncluded ? 1 : 0;
	if (chord._cachedNotes?.[optionalAsIndex] !== undefined) {
		return chord._cachedNotes[optionalAsIndex]!;
	}
	const root = chord.root;
	const typeMeta = chordTypeToMeta(chord.type);
	const appendsMeta = chordAppendsToMeta(typeMeta, chord.appends);
	const typeRelNotes = chordTypeToRelativeNotes(chord.type);
	const [addNotes, removeNotes] = applyChordAppends(
		typeRelNotes,
		chord.appends
	);

	const notes = [root]
		.concat(
			convertTypeRelNotes(
				root,
				typeRelNotes,
				typeMeta,
				removeNotes,
				isAllOptionalIncluded,
				getRandomBoolean
			)
		)
		.concat(
			convertAddNotes(root, appendsMeta, addNotes, isAllOptionalIncluded)
		);
	if (chord._cachedNotes === undefined) {
		chord._cachedNotes = [];
	}
	chord._cachedNotes[optionalAsIndex] = notes;
	return notes;
}
