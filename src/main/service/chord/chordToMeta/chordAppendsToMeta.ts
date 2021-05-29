import ChordAppends from '../../../model/ChordAppends';
import ChordMeta from '../../../model/ChordMeta';

export default function chordAppendsToMeta(
	typeMeta: ChordMeta[],
	appends: readonly ChordAppends[]
): ChordMeta[] {
	if (appends.length === 1 && appends[0] === ChordAppends.None) {
		return [];
	}
	// for Sharp11
	if (appends.indexOf(ChordAppends.Sharp11) >= 0 && typeMeta.length >= 2) {
		// turn Required for fifth note
		typeMeta[1] = ChordMeta.Required;
	}
	// all appends are required
	return appends.map(() => ChordMeta.Required);
}
