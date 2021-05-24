import ErrorMessageIndex from '../ErrorMessageIndex';
import ParseError from '../ParseError';
import type TokenData from '../TokenData';

import ensureTokensValid from './ensureTokensValid';

declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace jest {
		interface Matchers<R> {
			toThrowNoNamePairError: (a: string, b: string) => R;
		}
	}
}

expect.extend({
	toThrowNoNamePairError: function (predicate, argA: string, argB: string) {
		const expectedMessage = this.utils.printExpected(
			`(throw ParseError with NoNamePair and args: ${argA}, ${argB})`
		);
		if (typeof predicate !== 'function') {
			return {
				pass: false,
				message: () =>
					`Expected: ${expectedMessage}\nReceived: (is not a predicate)`,
			};
		}
		try {
			predicate();
			return {
				pass: false,
				message: () =>
					`Expected: ${expectedMessage}\nReceived: (did not throw)`,
			};
		} catch (e: unknown) {
			if (
				typeof e !== 'object' ||
				e === null ||
				!(e instanceof ParseError)
			) {
				return {
					pass: false,
					message: () =>
						`Expected: ${expectedMessage}\nReceived: ${this.utils.printReceived(
							e
						)}`,
				};
			}
			const err = e;
			this.suppressedErrors.splice(0, 1);
			if (err.messageIndex !== ErrorMessageIndex.NoNamePair) {
				return {
					pass: false,
					message: () =>
						`Expected: ${expectedMessage}\nReceived: (throw ParseError with ${
							err.messageIndex
						} and args: ${err.args.join(', ')})`,
				};
			}
			const pass =
				err.args.length === 2 &&
				((err.args[0] === argA && err.args[1] === argB) ||
					(err.args[0] === argB && err.args[1] === argA));
			return {
				pass,
				message: () =>
					`Expected: ${expectedMessage}\nReceived: (throw ParseError with NoNamePair and args: ${err.args.join(
						', '
					)})`,
			};
		}
	},
});

function testForThrowNoNamePair(
	chordA: string,
	chordB: string,
	chordOther?: string
) {
	it(`should throw if both ${chordA} and ${chordB} are included`, () => {
		expect(() =>
			ensureTokensValid([
				{ t: chordA, o: chordA },
				{ t: chordB, o: chordB },
				...(chordOther !== undefined
					? [{ t: chordOther, o: chordOther }]
					: []),
			])
		).toThrowNoNamePairError(chordA, chordB);
	});
}

describe('ensureTokensValid', () => {
	const namedChords = ['dim', 'dim7', 'aug'];
	for (const chordA of namedChords) {
		for (const chordB of namedChords
			.filter((x) => x !== chordA)
			.concat('m', 'm7', 'mM7', '9')) {
			testForThrowNoNamePair(chordA, chordB);
			testForThrowNoNamePair(chordA, chordB, '11');
		}
	}
	testForThrowNoNamePair('7', 'M7');
	testForThrowNoNamePair('M7', '7');

	it('should throw if (power) and any other chord are included', () => {
		expect(() =>
			ensureTokensValid([
				{ t: '(power)', o: '(power)' },
				{ t: 'unknown', o: 'unknown' },
			])
		).toThrow(new ParseError(ErrorMessageIndex.PowerOnlySingle));
		expect(() =>
			ensureTokensValid([
				{ t: 'unknown', o: 'unknown' },
				{ t: '(power)', o: '(power)' },
			])
		).toThrow(new ParseError(ErrorMessageIndex.PowerOnlySingle));
	});

	it('should not throw if tokens are valid', () => {
		const tokensPatterns: TokenData[][] = [
			[{ t: '', o: '' }],
			[
				{ t: 'm', o: 'm' },
				{ t: '9', o: '9', d: 9 },
			],
			[{ t: 'dim', o: 'dim' }],
			[
				{ t: 'sus4', o: 'sus4' },
				{ t: '7', o: '7', d: 7 },
			],
			[{ t: '(power)', o: '(power)' }],
		];
		for (const tokens of tokensPatterns) {
			expect(() => ensureTokensValid(tokens)).not.toThrow();
		}
	});
});
