import type DegreeAndRelativeNote from '../../../model/DegreeAndRelativeNote';

import compareDegreesAndRelativeNotes from './compareDegreesAndRelativeNotes';

export default function sortDegreesAndRelativeNotes(
	base: DegreeAndRelativeNote[]
): DegreeAndRelativeNote[] {
	return base.sort(compareDegreesAndRelativeNotes);
}
