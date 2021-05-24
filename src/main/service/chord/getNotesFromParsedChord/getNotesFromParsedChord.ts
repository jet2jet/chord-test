import type DegreeAndRelativeNote from '../../../model/DegreeAndRelativeNote';
import type ParsedChord from '../ParsedChord';

import convertTokensToDegreesAndRelativeNotes from './convertTokensToDegreesAndRelativeNotes';
import reduceDegreesAndRelativeNotes from './reduceDegreesAndRelativeNotes';
import sortDegreesAndRelativeNotes from './sortDegreesAndRelativeNotes';

export default function getNotesFromParsedChord(
	data: ParsedChord
): DegreeAndRelativeNote[] {
	return sortDegreesAndRelativeNotes(
		reduceDegreesAndRelativeNotes(
			convertTokensToDegreesAndRelativeNotes(data.tokens)
		)
	);
}
