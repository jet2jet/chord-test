import { mocked } from 'ts-jest/utils';

import type DegreeNumber from '../DegreeNumber';
import type TokenData from '../TokenData';

import ErrorMessageIndex from '../ErrorMessageIndex';
import ParseError from '../ParseError';

import parseChordTokens from './parseChordTokens';
import ensureTokensValid from './ensureTokensValid';
import normalizeTokens from './normalizeTokens';

jest.mock('./ensureTokensValid');
jest.mock('./normalizeTokens');

const FLAT_TOKENS = ['-', 'b', '♭'] as const;
const SHARP_TOKENS = ['+', '#', '＃', '♯'] as const;

describe('parseChordTokens', () => {
	type Case = readonly [input: string, tokens: readonly TokenData[]];
	const normalCases: Case[] = [
		['', [{ t: '', o: '' }]],
		['m', [{ t: 'm', o: 'm' }]],
		[
			'7',
			[
				{ t: '', o: '' },
				{ t: '7', o: '7' },
			],
		],
		...['M7', '△7', 'maj7', 'j7'].map(
			(x) => [x, [{ t: 'M7', o: x }]] as const
		),
		['m7', [{ t: 'm7', o: 'm7' }]],
		...['mM7', 'm△7', 'mmaj7'].map(
			(x) => [x, [{ t: 'mM7', o: x }]] as const
		),
		[
			'6',
			[
				{ t: '', o: '' },
				{ t: '6', o: '6' },
			],
		],
		[
			'9',
			[
				{ t: '', o: '' },
				{ t: '9', o: '9', d: 9 },
			],
		],
		['dim', [{ t: 'dim', o: 'dim' }]],
		...['dim7', '°7'].map((x) => [x, [{ t: 'dim7', o: x }]] as const),
		['aug', [{ t: 'aug', o: 'aug' }]],
		['sus4', [{ t: 'sus4', o: 'sus4' }]],
		['msus4', [{ t: 'msus4', o: 'msus4' }]],
		[
			'7sus4',
			[
				{ t: '7', o: '7' },
				{ t: 'sus4', o: 'sus4' },
			],
		],
		[
			'Ø',
			[
				{ t: 'm7', o: 'm7' },
				{ t: '-5', o: '-5', d: 5 },
			],
		],
		...['add9', 'add2'].map((x) => [x, [{ t: 'add9', o: x }]] as const),
		...['(power)', '5'].map((x) => [x, [{ t: '(power)', o: x }]] as const),
	];
	const degreeCases: Case[] = ([5, 9, 11, 13] as DegreeNumber[])
		.map(
			(deg) =>
				[
					...(deg === 5
						? []
						: [
								[
									`${deg}`,
									[
										{ t: '', o: '' },
										{ t: `${deg}`, o: `${deg}`, d: deg },
									],
								] as const,
						  ]),
					...(deg === 11
						? []
						: FLAT_TOKENS.map(
								(t) =>
									[
										`${t}${deg}`,
										[
											{ t: '', o: '' },
											{
												t: `-${deg}`,
												o: `${t}${deg}`,
												d: deg,
											},
										],
									] as const
						  )),
					...(deg === 13
						? []
						: SHARP_TOKENS.map(
								(t) =>
									[
										`${t}${deg}`,
										[
											{ t: '', o: '' },
											{
												t: `+${deg}`,
												o: `${t}${deg}`,
												d: deg,
											},
										],
									] as const
						  )),
				] as const
		)
		.reduce((prev: Case[], a) => prev.concat(a), []);
	const mixedCases: Case[] = [
		[
			'm6',
			[
				{ t: 'm', o: 'm' },
				{ t: '6', o: '6', d: 6 },
			],
		],
		[
			'7・9',
			[
				{ t: '', o: '' },
				{ t: '7', o: '7' },
				{ t: '9', o: '9', d: 9 },
			],
		],
		[
			'7m-5',
			[
				{ t: 'm', o: 'm' },
				{ t: '-5', o: '-5', d: 5 },
				{ t: '7', o: '7' },
			],
		],
		[
			'7/13',
			[
				{ t: '', o: '' },
				{ t: '7', o: '7' },
				{ t: '13', o: '13', d: 13 },
			],
		],
		[
			'm7(9)(+11)(-13)',
			[
				{ t: 'm7', o: 'm7' },
				{ t: '9', o: '9', d: 9 },
				{ t: '+11', o: '+11', d: 11 },
				{ t: '-13', o: '-13', d: 13 },
			],
		],
		[
			'madd9',
			[
				{ t: 'm', o: 'm' },
				{ t: 'add9', o: 'add9' },
			],
		],
	];
	type InvalidCase = [input: string, error: ParseError];
	const invalidCases: InvalidCase[] = [
		['dim7aug', new ParseError(ErrorMessageIndex.NoMoreNames, ['aug'])],
		['7・7', new ParseError(ErrorMessageIndex.NoMoreDegrees, ['7'])],
		['M7/7', new ParseError(ErrorMessageIndex.NoMoreDegrees, ['7'])],
		['m7(7)', new ParseError(ErrorMessageIndex.NoMoreDegrees, ['7'])],
		['dim7 7', new ParseError(ErrorMessageIndex.NoMoreDegrees, ['7'])],
		['m8', new ParseError(ErrorMessageIndex.InvalidDegree, ['8'])],
		['+7', new ParseError(ErrorMessageIndex.InvalidDegree, ['+7'])],
		['♭7', new ParseError(ErrorMessageIndex.InvalidDegree, ['♭7'])],
		[
			'7・-11・13',
			new ParseError(ErrorMessageIndex.InvalidDegree, ['-11']),
		],
		['m♯6', new ParseError(ErrorMessageIndex.InvalidDegree, ['♯6'])],
		['11・b6', new ParseError(ErrorMessageIndex.InvalidDegree, ['b6'])],
		['m＃9', new ParseError(ErrorMessageIndex.InvalidDegree, ['＃9'])],
		['9+13', new ParseError(ErrorMessageIndex.InvalidDegree, ['+13'])],
		['m6・13', new ParseError(ErrorMessageIndex.InvalidDegree, ['13'])],
		['-13(6)', new ParseError(ErrorMessageIndex.InvalidDegree, ['6'])],
		['mu', new ParseError(ErrorMessageIndex.InvalidName, ['u'])],
	];

	beforeAll(() => {
		mocked(ensureTokensValid).mockImplementation(() => {
			// do nothing
		});
		mocked(normalizeTokens).mockImplementation((tokens) => tokens.slice(0));
	});

	describe.each([
		['normal token', normalCases],
		['degree token', degreeCases],
		['mixed token', mixedCases],
	] as const)('for %s', (_, cases) => {
		it.each(cases)("should parse '%s' correctly", (input, tokens) => {
			const t = tokens.slice(0);
			expect(parseChordTokens(input)).toEqual(expect.arrayContaining(t));
			expect(ensureTokensValid).toHaveBeenCalledWith(
				expect.arrayContaining(t)
			);
			expect(mocked(ensureTokensValid).mock.calls[0][0].length).toEqual(
				t.length
			);
			expect(normalizeTokens).toHaveBeenCalledWith(
				expect.arrayContaining(t)
			);
			expect(mocked(normalizeTokens).mock.calls[0][0].length).toEqual(
				t.length
			);
		});
	});
	describe('for invalid token', () => {
		it.each(invalidCases)("should throw error for '%s'", (input, err) => {
			expect(() => parseChordTokens(input)).toThrow(err);
		});
	});
});
