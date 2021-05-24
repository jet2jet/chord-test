import type ChordMeta from '../../../../model/ChordMeta';
import type NoteType from '../../../../model/NoteType';
import type RelativeNoteType from '../../../../model/RelativeNoteType';

import relativeNoteToAbsoluteNote from '../../../note/relativeNoteToAbsoluteNote';
import isAddNoteToBeIncluded from './isAddNoteToBeIncluded';

export default function convertAddNotes(
	root: NoteType,
	appendsMeta: readonly ChordMeta[],
	addNotes: readonly RelativeNoteType[],
	isAllOptionalIncluded: boolean
): NoteType[] {
	return addNotes
		.filter((_, i) =>
			isAddNoteToBeIncluded(i, appendsMeta, isAllOptionalIncluded)
		)
		.map((rel) => relativeNoteToAbsoluteNote(rel, root));
}
