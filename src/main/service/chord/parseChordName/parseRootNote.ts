import type NoteType from '../../../model/NoteType';
import SharpFlatType from '../../../model/SharpFlatType';

import ErrorMessageIndex from '../ErrorMessageIndex';
import ParseError from '../ParseError';

import degreeToRelativeBaseNote from '../degreeToRelativeBaseNote';
import isSharpSymbol from './isSharpSymbol';

export default function parseRootNote(
	normalizedInput: string
): [root: NoteType, sharpFlat: -1 | 0 | 1, remain: string] {
	let ra = /^([A-G])/i.exec(normalizedInput);
	if (ra === null) {
		throw new ParseError(ErrorMessageIndex.InvalidRoot);
	}
	let rootValue = ra[1].toUpperCase().charCodeAt(0);
	if (rootValue < 67) {
		// ch - 'A'.charCodeAt(0) + 5
		rootValue -= 60;
	} else {
		// ch - 'C'.charCodeAt(0) + 0
		rootValue -= 67;
	}
	normalizedInput = normalizedInput.substring(1);
	if (normalizedInput[0] === '♮' || normalizedInput[0] === '=') {
		throw new ParseError(ErrorMessageIndex.NaturalNotAllowed);
	}
	ra = /^((?:♯|＃|#|\+|♭|b|-)+)/.exec(normalizedInput);
	let sharpFlatCount: SharpFlatType = SharpFlatType.Natural;
	if (ra !== null) {
		if (ra[1].length !== 1) {
			throw new ParseError(ErrorMessageIndex.SharpFlatOnlySingle);
		}
		if (isSharpSymbol(ra[1])) {
			sharpFlatCount = 1;
		} else {
			sharpFlatCount = -1;
		}
		normalizedInput = normalizedInput.substring(1).trim();
	}
	let r =
		(degreeToRelativeBaseNote(rootValue + 1) as number) + sharpFlatCount;
	if (r < 0) {
		r += 12;
	} else if (r >= 12) {
		r -= 12;
	}
	return [r as NoteType, sharpFlatCount, normalizedInput];
}
