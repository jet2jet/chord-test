import type ChordMeta from '../../../../model/ChordMeta';
import type NoteType from '../../../../model/NoteType';
import type RelativeNoteType from '../../../../model/RelativeNoteType';
import relativeNoteToAbsoluteNote from '../../../note/relativeNoteToAbsoluteNote';

import isRelNoteToBeIncluded from './isRelNoteToBeIncluded';

export default function convertTypeRelNotes(
	root: NoteType,
	typeRelNotes: readonly RelativeNoteType[],
	typeMeta: readonly ChordMeta[],
	removeNotes: readonly RelativeNoteType[],
	isAllOptionalIncluded: boolean,
	getRandomBoolean: () => boolean
): NoteType[] {
	return typeRelNotes
		.filter((rel, i) =>
			isRelNoteToBeIncluded(
				rel,
				i,
				typeMeta,
				removeNotes,
				isAllOptionalIncluded,
				getRandomBoolean
			)
		)
		.map((rel) => relativeNoteToAbsoluteNote(rel, root));
}
