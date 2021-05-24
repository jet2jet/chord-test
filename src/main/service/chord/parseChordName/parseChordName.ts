import type NoteType from '../../../model/NoteType';
import type ParsedChord from '../ParsedChord';
import type TokenData from '../TokenData';

import normalizeInput from './normalizeInput';
import parseRootNote from './parseRootNote';
import sortTokens from './sortTokens';
import parseChordTokens from './parseChordTokens';
import type SharpFlatType from '../../../model/SharpFlatType';

export default function parseChordName(input: string): ParsedChord | null {
	input = normalizeInput(input);
	if (input.length === 0) {
		return null;
	}
	let root: NoteType;
	let rootSharpFlat: SharpFlatType;
	[root, rootSharpFlat, input] = parseRootNote(input);

	const tokens: TokenData[] = parseChordTokens(input);

	return {
		root,
		rootSharpFlat,
		tokens: sortTokens(tokens),
	};
}
