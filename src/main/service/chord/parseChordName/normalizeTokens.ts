import type TokenData from '../TokenData';

type CombineTokenPattern = [
	combinedToken: string,
	token1: string,
	...tokens: string[]
];
const combineTokensPattern: CombineTokenPattern[] = [
	['7', '', '7'],
	['6', '', '6'],
	['m7', 'm', '7'],
	['mM7', 'm', 'M7'],
	['m7', 'm', 'm7'],
	['mM7', 'm7', 'M7'],
	['m7', 'm7', '7'],
	['msus4', 'm', 'sus4'],
];
const combineTokensIfOnlyPattern: CombineTokenPattern[] = [
	['dim', 'm', '-5'],
	['dim7', 'dim', '6'],
	['dim7', 'm', '-5', '6'],
	['aug', '', '+5'],
];

export default function normalizeTokens(
	tokens: readonly TokenData[]
): TokenData[] {
	const newTokens = tokens.slice(0);
	const tokenNames = newTokens.map((t) => t.t);
	for (const pattern of combineTokensPattern) {
		const a = tokenNames.indexOf(pattern[1]);
		const nums: number[] = [];
		let allFound = a >= 0;
		for (let i = 2; i < pattern.length; ++i) {
			const n = tokenNames.indexOf(pattern[i]);
			nums.push(n);
			allFound = allFound && n >= 0;
		}
		if (allFound) {
			newTokens[a] = {
				t: pattern[0],
				o: pattern[0],
			};
			tokenNames[a] = pattern[0];
			for (const b of nums.sort(
				/* istanbul ignore next */ (x, y) => y - x
			)) {
				newTokens.splice(b, 1);
				tokenNames.splice(b, 1);
			}
		}
	}
	for (const pattern of combineTokensIfOnlyPattern) {
		if (tokenNames.length !== pattern.length - 1) {
			continue;
		}
		const a = tokenNames.indexOf(pattern[1]);
		const nums: number[] = [];
		let allFound = a >= 0;
		for (let i = 2; i < pattern.length; ++i) {
			const n = tokenNames.indexOf(pattern[i]);
			nums.push(n);
			allFound = allFound && n >= 0;
		}
		if (allFound) {
			newTokens[a] = {
				t: pattern[0],
				o: pattern[0],
			};
			tokenNames[a] = pattern[0];
			for (const b of nums.sort(
				/* istanbul ignore next */ (x, y) => y - x
			)) {
				newTokens.splice(b, 1);
				tokenNames.splice(b, 1);
			}
		}
	}
	return newTokens;
}
