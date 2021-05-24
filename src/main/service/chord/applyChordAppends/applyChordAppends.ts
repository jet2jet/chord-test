import type ChordAppends from '../../../model/ChordAppends';
import type RelativeNoteType from '../../../model/RelativeNoteType';

import applyChordAppend from './applyChordAppend';

export default function applyChordAppends(
	relNotes: readonly RelativeNoteType[],
	appends: readonly ChordAppends[]
): [addNotes: RelativeNoteType[], removeNotes: RelativeNoteType[]] {
	const tuple = appends.reduce<
		[
			addNotes: RelativeNoteType[],
			removeNotes: RelativeNoteType[],
			relNotes: readonly RelativeNoteType[]
		]
	>(
		([pa, pr, rn], append) => {
			const [a, r] = applyChordAppend(rn, append);
			return [
				pa.concat(a),
				pr.concat(r),
				r.length > 0 ? rn.filter((v) => r.indexOf(v) < 0) : rn,
			];
		},
		[[], [], relNotes]
	);
	return [tuple[0], tuple[1]];
}
