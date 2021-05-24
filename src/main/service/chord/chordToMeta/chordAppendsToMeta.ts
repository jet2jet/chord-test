import ChordAppends from '../../../model/ChordAppends';
import ChordMeta from '../../../model/ChordMeta';

export default function chordAppendsToMeta(
	appends: readonly ChordAppends[]
): ChordMeta[] {
	if (appends.length === 1 && appends[0] === ChordAppends.None) {
		return [];
	}
	// all appends are required
	return appends.map(() => ChordMeta.Required);
}
