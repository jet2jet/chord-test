import ALL_CHORDS from '../../data/ALL_CHORDS';
import type ChordListItem from '../../model/ChordListItem';

function isCaseSensitiveNecessary(name: string) {
	return name === 'm' || name === 'M' || name === 'm7' || name === 'M7';
}

export default function pickupChordByName(
	name: string
): [chordItem: Readonly<ChordListItem>, chordIndex: number] | null {
	// '9' は特別なコード名ではなく度数として扱う
	if (name === '9') {
		return null;
	}
	let result: [ChordListItem, number] | null = null;
	const lname = name.toLowerCase();
	ALL_CHORDS.forEach((d, i) => {
		if (result !== null) {
			return;
		}
		if (
			d[2].reduce(
				(r, n) =>
					r ||
					(isCaseSensitiveNecessary(n)
						? n === name
						: n.toLowerCase() === lname),
				false
			)
		) {
			result = [d, i];
		}
	});
	return result;
}
