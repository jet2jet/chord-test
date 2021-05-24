import ChordType from '../../model/ChordType';
import type DegreeAndRelativeNote from '../../model/DegreeAndRelativeNote';

export default function chordTypeToDegreesAndRelativeNotes(
	type: ChordType
): DegreeAndRelativeNote[] {
	switch (type) {
		default:
			return [];
		case ChordType.Major:
			return [
				[3, 4],
				[5, 7],
			];
		case ChordType.Minor:
			return [
				[3, 3],
				[5, 7],
			];
		case ChordType.Sus4:
			return [
				[4, 5],
				[5, 7],
			];
		case ChordType.Diminish:
			return [
				[3, 3],
				[5, 6],
			];
		case ChordType.Diminish7:
			return [
				[3, 3],
				[5, 6],
				[7, 9],
			];
		case ChordType.Augment:
			return [
				[3, 4],
				[5, 8],
			];
		case ChordType.Power:
			return [[5, 7]];
	}
}
