import ChordAppends from '../../../model/ChordAppends';

export default function adjustForNinthAppend(
	targetAppends: ChordAppends[],
	addedAppend: ChordAppends
): ChordAppends | null {
	if (
		addedAppend !== ChordAppends.Ninth &&
		addedAppend !== ChordAppends.Sharp9 &&
		addedAppend !== ChordAppends.Flat9
	) {
		return null;
	}
	if (
		targetAppends.indexOf(ChordAppends.Seventh) >= 0 ||
		targetAppends.indexOf(ChordAppends.Major7) >= 0
	) {
		return null;
	}
	targetAppends.push(ChordAppends.Seventh);
	return ChordAppends.Seventh;
}
