import type RelativeNoteType from '../../model/RelativeNoteType';

const degreeToRelativeBaseNoteMap: readonly RelativeNoteType[] = [
	0,
	0,
	2,
	4,
	5,
	7,
	9,
	11,
	12,
	14,
	16,
	17,
	19,
	21,
	23,
];

export default function degreeToRelativeBaseNote(
	degree: number
): RelativeNoteType {
	if (degree < 0 || degree > 14) {
		throw new Error('Unexpected');
	}
	return degreeToRelativeBaseNoteMap[degree];
}
