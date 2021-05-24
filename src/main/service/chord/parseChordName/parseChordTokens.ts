import ALL_CHORDS from '../../../data/ALL_CHORDS';

import type DegreeNumber from '../DegreeNumber';
import type TokenData from '../TokenData';

import ErrorMessageIndex from '../ErrorMessageIndex';
import ParseError from '../ParseError';

import pickupChordByName from '../pickupChordByName';
import ensureTokensValid from './ensureTokensValid';
import isFlatSymbol from './isFlatSymbol';
import isSharpSymbol from './isSharpSymbol';
import normalizeTokens from './normalizeTokens';

const allChordPatterns = (() => {
	const names = ALL_CHORDS.map((item) =>
		item[1] !== '' ? [item[1]].concat(item[2]) : []
	)
		.reduce((prev, a) => prev.concat(a), [])
		.map((s) => {
			s = s.replace(/[^A-Za-z0-9]/g, (s) => `\\${s}`);
			if (/[0-9]$/.test(s)) {
				s = `${s}(?![0-9])`;
			}
			return s;
		})
		.sort((a, b) => b.length - a.length);
	return new RegExp(`^((?:${names.join('|')}))`, 'i');
})();

const chordDegreePatterns = (() => {
	const simplePattern = '((?:♯|＃|#|♭|b|\\+|-)?)([1-9][0-9]*)';
	return new RegExp(`^(?:(${simplePattern})|\\((${simplePattern})\\))`, '');
})();

const delimiterPattern = /^(?:・|･|／|\/)/;

export default function parseChordTokens(input: string): TokenData[] {
	const tokens: TokenData[] = [];
	let hasNamedToken = false;
	const degreeTokenUsed: {
		[token: string]: boolean;
	} = {};
	let isMinor = false;

	while (input.length > 0) {
		// '7sus4' のみ最初にチェックする
		if (input.substring(0, 5).toLowerCase() === '7sus4') {
			tokens.push({ t: '7', o: '7' });
			tokens.push({ t: 'sus4', o: 'sus4' });
			hasNamedToken = true;
			degreeTokenUsed['7'] = true;
			input = input.substring(5);
			// 'Ø' は 'm7-5' 扱いとする
		} else if (input.substring(0, 1) === 'Ø') {
			tokens.push({ t: 'm7', o: 'm7' });
			tokens.push({ t: '-5', o: '-5', d: 5 });
			hasNamedToken = true;
			isMinor = true;
			degreeTokenUsed['7'] = true;
			degreeTokenUsed['-5'] = true;
			input = input.substring(1);
		} else {
			let isDegree: boolean;
			const prevHasNamedToken = hasNamedToken;
			let normalizedToken;
			let originalToken;
			let degreeToken = '';
			let ra = allChordPatterns.exec(input);
			if (ra !== null) {
				originalToken = ra[1];
				normalizedToken = originalToken;
				isDegree =
					normalizedToken !== '5' &&
					/^[1-9][0-9]*$/.test(normalizedToken);
				if (!isDegree) {
					if (
						tokens.length === 1 &&
						tokens[0].t === 'm' &&
						normalizedToken === 'add9'
					) {
						// special case -- it's ok
					} else {
						if (hasNamedToken) {
							throw new ParseError(
								ErrorMessageIndex.NoMoreNames,
								[normalizedToken]
							);
						}
					}
					hasNamedToken = true;
					if (normalizedToken.indexOf('7') >= 0) {
						degreeTokenUsed['7'] = true;
					}
					if (normalizedToken.indexOf('9') >= 0) {
						degreeTokenUsed['9'] = true;
					}
				} else {
					degreeToken = normalizedToken;
					if (degreeTokenUsed[normalizedToken]) {
						throw new ParseError(ErrorMessageIndex.NoMoreDegrees, [
							normalizedToken,
						]);
					}
					degreeTokenUsed[normalizedToken] = true;
				}
			} else {
				ra = chordDegreePatterns.exec(input);
				if (ra !== null) {
					originalToken = ra[4] !== undefined ? ra[4] : ra[1];
					const sharpFlat = ra[4] !== undefined ? ra[5] : ra[2];
					const pickedToken = ra[4] !== undefined ? ra[6] : ra[3];
					const sym = isSharpSymbol(sharpFlat)
						? '+'
						: isFlatSymbol(sharpFlat)
						? '-'
						: '';
					normalizedToken = `${sym}${pickedToken}` as const;
					if (degreeTokenUsed[normalizedToken]) {
						throw new ParseError(ErrorMessageIndex.NoMoreDegrees, [
							originalToken,
						]);
					}
					if (
						pickedToken !== '5' &&
						pickedToken !== '6' &&
						pickedToken !== '7' &&
						pickedToken !== '9' &&
						pickedToken !== '11' &&
						pickedToken !== '13'
					) {
						throw new ParseError(ErrorMessageIndex.InvalidDegree, [
							originalToken,
						]);
					}
					if (pickedToken === '6' && sym !== '') {
						throw new ParseError(ErrorMessageIndex.InvalidDegree, [
							originalToken,
						]);
					}
					if (pickedToken === '7' && sym !== '') {
						throw new ParseError(ErrorMessageIndex.InvalidDegree, [
							originalToken,
						]);
					}
					if (pickedToken === '9' && sym === '+' && isMinor) {
						throw new ParseError(ErrorMessageIndex.InvalidDegree, [
							originalToken,
						]);
					}
					if (pickedToken === '11' && sym === '-') {
						throw new ParseError(ErrorMessageIndex.InvalidDegree, [
							originalToken,
						]);
					}
					if (pickedToken === '13' && sym === '+') {
						throw new ParseError(ErrorMessageIndex.InvalidDegree, [
							originalToken,
						]);
					}
					if (pickedToken === '13' && degreeTokenUsed['6']) {
						throw new ParseError(ErrorMessageIndex.InvalidDegree, [
							pickedToken,
						]);
					}
					degreeTokenUsed[normalizedToken] = true;
					degreeToken = pickedToken;
					isDegree = true;
				} else {
					throw new ParseError(ErrorMessageIndex.InvalidName, [
						input,
					]);
				}
			}
			if (
				normalizedToken === '6' &&
				(degreeTokenUsed['13'] || degreeTokenUsed['-13'])
			) {
				throw new ParseError(ErrorMessageIndex.InvalidDegree, [
					normalizedToken,
				]);
			}
			const pick = prevHasNamedToken
				? null
				: pickupChordByName(normalizedToken);
			if (pick !== null) {
				const defName = pick[0][2][0];
				tokens.push({ t: defName, o: normalizedToken });
				if (
					defName[0] === 'm' ||
					defName === 'dim' ||
					defName === 'dim7'
				) {
					isMinor = true;
				}
			} /* istanbul ignore else */ else if (isDegree) {
				tokens.push({
					t: normalizedToken,
					o: originalToken,
					d: parseInt(degreeToken, 10) as DegreeNumber,
				});
			} else {
				// (Unexpected case)
				tokens.push({ t: normalizedToken, o: normalizedToken });
			}
			input = input.substring(ra[0].length);
		}
		input = input.trim();
		if (delimiterPattern.test(input)) {
			input = input.substring(1).trim();
		}
	}
	if (!hasNamedToken) {
		tokens.unshift({ t: '', o: '' });
	}
	ensureTokensValid(tokens);
	return normalizeTokens(tokens);
}
