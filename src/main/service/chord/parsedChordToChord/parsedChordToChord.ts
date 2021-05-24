import type Chord from '../../../model/Chord';
import ChordType from '../../../model/ChordType';
import type { ReadonlyRecursive } from '../../../utils/TypeUtils';
import type ParsedChord from '../ParsedChord';
import pickupChordByName from '../pickupChordByName';

import degreeToAppends from './degreeToAppends';

export default function parsedChordToChord(
	parsed: ReadonlyRecursive<ParsedChord>
): Chord {
	const retChord: Chord = {
		root: parsed.root,
		rootSharpFlat: parsed.rootSharpFlat,
		type: ChordType.Major,
		appends: [],
	};
	for (const token of parsed.tokens) {
		const picked =
			token.d !== undefined ? null : pickupChordByName(token.t);
		if (picked !== null) {
			retChord.type = picked[0][0].type;
			retChord.appends.push(...picked[0][0].appends);
		} else {
			// parse degree
			const append = degreeToAppends(token.t);
			if (append !== null) {
				retChord.appends.push(append);
			}
		}
	}
	return retChord;
}
