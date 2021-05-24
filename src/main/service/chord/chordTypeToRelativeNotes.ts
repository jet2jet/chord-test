import type ChordType from '../../model/ChordType';
import type RelativeNoteType from '../../model/RelativeNoteType';
import chordTypeToDegreesAndRelativeNotes from './chordTypeToDegreesAndRelativeNotes';

export default function chordToRelativeNotes(
	type: ChordType
): RelativeNoteType[] {
	return chordTypeToDegreesAndRelativeNotes(type).map((a) => a[1]);
}
