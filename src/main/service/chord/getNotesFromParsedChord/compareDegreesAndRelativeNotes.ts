import type DegreeAndRelativeNote from '../../../model/DegreeAndRelativeNote';

export default function compareDegreesAndRelativeNotes(
	a: DegreeAndRelativeNote,
	b: DegreeAndRelativeNote
): number {
	const c = a[1] - b[1];
	if (c !== 0) {
		return c;
	}
	return a[0] - b[0];
}
