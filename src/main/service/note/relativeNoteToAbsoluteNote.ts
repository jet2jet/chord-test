import type NoteType from '../../model/NoteType';
import type RelativeNoteType from '../../model/RelativeNoteType';

export default function relativeNoteToAbsoluteNote(
	rel: RelativeNoteType,
	root: NoteType
): NoteType {
	let value = (root as number) + (rel as number);
	while (value < 0) {
		value += 12;
	}
	while (value >= 12) {
		value -= 12;
	}
	return value as NoteType;
}
