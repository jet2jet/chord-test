import ChordType from '../../../model/ChordType';

export default function getRandomChordType(
	level: number,
	getRandom: () => number
): ChordType {
	let typeCount: number;
	switch (level) {
		case 0:
		case 1:
		case 2:
			typeCount = 3; // major/minor/sus4
			break;
		default:
			typeCount = ChordType._Count;
			break;
	}
	return Math.floor(getRandom() * typeCount) as ChordType;
}
