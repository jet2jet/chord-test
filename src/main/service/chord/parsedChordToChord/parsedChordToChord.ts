import type Chord from '../../../model/Chord';
import ChordAppends from '../../../model/ChordAppends';
import ChordType from '../../../model/ChordType';
import type { ReadonlyRecursive } from '../../../utils/TypeUtils';
import type ParsedChord from '../ParsedChord';
import pickupChordByName from '../pickupChordByName';

import degreeToAppends from './degreeToAppends';

export default function parsedChordToChord(
	parsed: ReadonlyRecursive<ParsedChord>,
	autoAddSevenForNinth: boolean
): Chord {
	const retChord: Chord = {
		root: parsed.root,
		rootSharpFlat: parsed.rootSharpFlat,
		type: ChordType.Major,
		appends: [],
	};
	let ninthAdded: boolean = false;
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
				if (token.d === 9) {
					ninthAdded = true;
				}
			}
		}
	}
	if (ninthAdded && autoAddSevenForNinth) {
		if (
			retChord.appends.indexOf(ChordAppends.Seventh) < 0 &&
			retChord.appends.indexOf(ChordAppends.Major7) < 0
		) {
			retChord.appends.unshift(ChordAppends.Seventh);
		}
	}
	return retChord;
}
