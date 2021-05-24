import ChordMeta from '../../../../model/ChordMeta';
import type RelativeNoteType from '../../../../model/RelativeNoteType';

export default function isRelNoteToBeIncluded(
	rel: RelativeNoteType,
	i: number,
	typeMeta: readonly ChordMeta[],
	removeNotes: readonly RelativeNoteType[],
	isAllOptionalIncluded: boolean,
	getRandomBoolean: () => boolean
): boolean {
	if (removeNotes.indexOf(rel) >= 0) {
		return false;
	}
	if (!isAllOptionalIncluded) {
		if (typeMeta[i] !== ChordMeta.Omittable) {
			return true;
		}
		return getRandomBoolean();
	}
	return true;
}
