import type RelativeNoteType from '../../../model/RelativeNoteType';

import ChordAppends from '../../../model/ChordAppends';

export default function applyChordAppend(
	relNotes: readonly RelativeNoteType[],
	append: ChordAppends
): [addNote: RelativeNoteType, removeNotes: RelativeNoteType[]] {
	switch (append) {
		default:
		case ChordAppends.None:
			return [-1, []];
		case ChordAppends.Seventh:
			return [10, []];
		case ChordAppends.Major7:
			return [11, []];
		case ChordAppends.Sixth:
			return [9, []];
		case ChordAppends.Ninth:
			return [14, []];
		case ChordAppends.Flat9:
			return [13, []];
		case ChordAppends.Sharp9:
			return [15, []];
		case ChordAppends.Add9:
			return [2, []];
		case ChordAppends.Eleventh:
			return [17, []];
		case ChordAppends.Sharp11:
			return [18, []];
		case ChordAppends.Thirteenth:
			return [21, []];
		case ChordAppends.Flat13:
			return [20, []];
		case ChordAppends.Flat5:
			return [6, relNotes.filter((v) => v === 7)];
		case ChordAppends.Sharp5:
			return [8, relNotes.filter((v) => v === 7)];
	}
}
