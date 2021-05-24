import type DegreeAndRelativeNote from '../../../../model/DegreeAndRelativeNote';

import type TokenData from '../../TokenData';

import pickupChordByName from '../../pickupChordByName';
import chordTypeToDegreesAndRelativeNotesWithDegreeUsed from './chordTypeToDegreesAndRelativeNotesWithDegreeUsed';
import degreeTokenToDegreeAndRelativeNote from './degreeTokenToDegreeAndRelativeNote';

export default function convertTokenToDegreesAndRelativeNotes(
	token: TokenData,
	degreeUsed: Record<number, boolean>
): DegreeAndRelativeNote[] {
	const chordData = token.d === undefined ? pickupChordByName(token.t) : null;
	if (chordData !== null) {
		const chord = chordData[0][0];
		return chordTypeToDegreesAndRelativeNotesWithDegreeUsed(
			chord.type,
			degreeUsed
		);
	} else {
		const r = degreeTokenToDegreeAndRelativeNote(token.t);
		if (r === null) {
			return [];
		}
		return [r];
	}
}
