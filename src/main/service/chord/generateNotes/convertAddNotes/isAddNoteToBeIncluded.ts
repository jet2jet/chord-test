import ChordMeta from '../../../../model/ChordMeta';

export default function isAddNoteToBeIncluded(
	i: number,
	appendsMeta: readonly ChordMeta[],
	isAllOptionalIncluded: boolean
): boolean {
	return isAllOptionalIncluded
		? true
		: appendsMeta[i] !== ChordMeta.Omittable;
}
