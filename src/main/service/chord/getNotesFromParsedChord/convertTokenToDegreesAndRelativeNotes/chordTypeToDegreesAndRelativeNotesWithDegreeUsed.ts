import type ChordType from '../../../../model/ChordType';
import type DegreeAndRelativeNote from '../../../../model/DegreeAndRelativeNote';

import chordTypeToDegreesAndRelativeNotes from '../../chordTypeToDegreesAndRelativeNotes';

export default function chordTypeToDegreesAndRelativeNotesWithDegreeUsed(
	chordType: ChordType,
	degreeUsed: Record<number, boolean>
): DegreeAndRelativeNote[] {
	return chordTypeToDegreesAndRelativeNotes(chordType).filter(
		(a) => !degreeUsed[a[1]]
	);
}
