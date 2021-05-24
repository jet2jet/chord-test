import type TokenData from '../TokenData';

import ErrorMessageIndex from '../ErrorMessageIndex';
import ParseError from '../ParseError';

const chordDegreePatterns = (() => {
	const simplePattern = '(?:(?:♯|＃|#|♭|b|\\+|-)?)(?:[1-9][0-9]*)';
	return new RegExp(`^(?:${simplePattern}|\\(${simplePattern}\\))`, '');
})();

export default function ensureTokensValid(tokens: readonly TokenData[]): void {
	tokens = tokens.slice(0);
	const tokenNames = tokens.map((t) => t.t);
	let x: string;
	if (
		tokenNames.indexOf((x = 'dim')) >= 0 ||
		tokenNames.indexOf((x = 'dim7')) >= 0 ||
		tokenNames.indexOf((x = 'aug')) >= 0
	) {
		const r = tokens.reduce<string | null>(
			(p, c) =>
				p !== null
					? p
					: c.t !== x &&
					  (c.t === '' ||
							c.t === 'm' ||
							c.t === 'm7' ||
							c.t === 'mM7' ||
							c.t === 'dim' ||
							c.t === 'dim7' ||
							c.t === 'aug' ||
							chordDegreePatterns.test(c.t))
					? c.t
					: null,
			null
		);
		if (r !== null) {
			throw new ParseError(ErrorMessageIndex.NoNamePair, [x, r]);
		}
	}
	if (tokenNames.indexOf('7') >= 0 && tokenNames.indexOf('M7') >= 0) {
		throw new ParseError(ErrorMessageIndex.NoNamePair, ['7', 'M7']);
	}
	if (tokenNames.indexOf('(power)') >= 0 && tokenNames.length !== 1) {
		throw new ParseError(ErrorMessageIndex.PowerOnlySingle);
	}
}
