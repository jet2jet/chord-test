import type DegreeAndRelativeNote from '../../../../model/DegreeAndRelativeNote';

import type TokenData from '../../TokenData';

import pickupChordByName from '../../pickupChordByName';
import chordTypeToDegreesAndRelativeNotesWithDegreeUsed from './chordTypeToDegreesAndRelativeNotesWithDegreeUsed';
import degreeTokenToDegreeAndRelativeNote from './degreeTokenToDegreeAndRelativeNote';

export default function convertTokenToDegreesAndRelativeNotes(
	token: TokenData,
	degreeUsed: Record<number, boolean>,
	autoAddSevenForNinth: boolean
): DegreeAndRelativeNote[] {
	const chordData = token.d === undefined ? pickupChordByName(token.t) : null;
	if (chordData !== null) {
		const chord = chordData[0][0];
		return chordTypeToDegreesAndRelativeNotesWithDegreeUsed(
			chord.type,
			degreeUsed
		);
	} else {
		const degRel = degreeTokenToDegreeAndRelativeNote(token.t);
		if (degRel === null) {
			return [];
		}
		if (token.d === 9 && autoAddSevenForNinth && !degreeUsed[11]) {
			const degRel7 = degreeTokenToDegreeAndRelativeNote('7');
			/* istanbul ignore if */
			if (degRel7 === null) {
				return [degRel];
			}
			return [degRel, degRel7];
		}
		return [degRel];
	}
}
