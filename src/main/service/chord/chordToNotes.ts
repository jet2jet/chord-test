import type NoteType from '../../model/NoteType';
import type Chord from '../../model/Chord';

import relativeNoteToAbsoluteNote from '../note/relativeNoteToAbsoluteNote';
import applyChordAppends from './applyChordAppends';
import chordTypeToRelativeNotes from './chordTypeToRelativeNotes';

export default function chordToNotes(chord: Chord): NoteType[] {
	const relNotes = chordTypeToRelativeNotes(chord.type);
	const [adds, removes] = applyChordAppends(relNotes, chord.appends);

	return [chord.root].concat(
		relNotes
			.filter((rel) => removes.indexOf(rel) < 0)
			.concat(adds)
			.map((rel) => relativeNoteToAbsoluteNote(rel, chord.root))
	);
}
