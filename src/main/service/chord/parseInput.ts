import type DegreeAndRelativeNote from '../../model/DegreeAndRelativeNote';

import getNotesFromParsedChord from './getNotesFromParsedChord';
import parseChordName from './parseChordName';

export default function parseInput(
	input: string,
	autoAddSevenForNinth: boolean
): DegreeAndRelativeNote[] {
	const data = parseChordName(input);
	if (data === null) {
		return [];
	}
	return getNotesFromParsedChord(data, autoAddSevenForNinth);
}
