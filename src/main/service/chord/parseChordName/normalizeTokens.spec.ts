import type TokenData from '../TokenData';

import normalizeTokens from './normalizeTokens';

describe('normalizeTokens', () => {
	type CombineTokenPattern = [
		tokens: TokenData[],
		expectedTokens: TokenData[]
	];
	type CombineCase = [caseName: string, tokenPatterns: CombineTokenPattern[]];
	type NonCombineCase = [caseName: string, tokens: TokenData[]];
	const combineCases: CombineCase[] = [
		// normal combine case
		[
			'7 + major -> 7',
			[
				[
					[
						{ o: '', t: '' },
						{ o: '7', t: '7', d: 7 },
					],
					[{ o: '7', t: '7' }],
				],
				[
					[
						{ o: '7', t: '7', d: 7 },
						{ o: '', t: '' },
					],
					[{ o: '7', t: '7' }],
				],
				[
					[
						{ o: '', t: '' },
						{ o: '9', t: '9', d: 9 },
						{ o: '7', t: '7', d: 7 },
					],
					[
						{ o: '7', t: '7' },
						{ o: '9', t: '9', d: 9 },
					],
				],
				[
					[
						{ o: '9', t: '9', d: 9 },
						{ o: '', t: '' },
						{ o: '7', t: '7', d: 7 },
					],
					[
						{ o: '9', t: '9', d: 9 },
						{ o: '7', t: '7' },
					],
				],
			],
		],
		[
			'6 + major -> 6',
			[
				[
					[
						{ o: '', t: '' },
						{ o: '6', t: '6', d: 6 },
					],
					[{ o: '6', t: '6' }],
				],
			],
		],
		[
			'7 + minor -> m7',
			[
				[
					[
						{ o: 'm', t: 'm' },
						{ o: '7', t: '7', d: 7 },
					],
					[{ o: 'm7', t: 'm7' }],
				],
			],
		],
		[
			'M7 + minor -> mM7',
			[
				[
					[
						{ o: 'm', t: 'm' },
						{ o: 'M7', t: 'M7' },
					],
					[{ o: 'mM7', t: 'mM7' }],
				],
			],
		],
		[
			'm7 + minor -> m7',
			[
				[
					[
						{ o: 'm', t: 'm' },
						{ o: 'm7', t: 'm7' },
					],
					[{ o: 'm7', t: 'm7' }],
				],
			],
		],
		[
			'm7 + 7 -> m7',
			[
				[
					[
						{ o: 'm7', t: 'm7' },
						{ o: '7', t: '7' },
					],
					[{ o: 'm7', t: 'm7' }],
				],
			],
		],
		[
			'm7 + M7 -> mM7',
			[
				[
					[
						{ o: 'M7', t: 'M7' },
						{ o: 'm7', t: 'm7' },
					],
					[{ o: 'mM7', t: 'mM7' }],
				],
			],
		],
		[
			'm + sus4 -> msus4',
			[
				[
					[
						{ o: 'm', t: 'm' },
						{ o: 'sus4', t: 'sus4' },
					],
					[{ o: 'msus4', t: 'msus4' }],
				],
			],
		],

		// only-if case
		[
			'm + -5 -> dim',
			[
				[
					[
						{ o: 'm', t: 'm' },
						{ o: '-5', t: '-5', d: 5 },
					],
					[{ o: 'dim', t: 'dim' }],
				],
			],
		],
		[
			'm + -5 + 6 -> dim7',
			[
				[
					[
						{ o: '-5', t: '-5', d: 5 },
						{ o: '6', t: '6', d: 6 },
						{ o: 'm', t: 'm' },
					],
					[{ o: 'dim7', t: 'dim7' }],
				],
			],
		],
		[
			'dim + 6 -> dim7',
			[
				[
					[
						{ o: '6', t: '6', d: 6 },
						{ o: 'dim', t: 'dim' },
					],
					[{ o: 'dim7', t: 'dim7' }],
				],
			],
		],
		[
			'major + +5 -> aug',
			[
				[
					[
						{ o: '', t: '' },
						{ o: '+5', t: '+5', d: 5 },
					],
					[{ o: 'aug', t: 'aug' }],
				],
			],
		],
	];
	const nonCombineCases: NonCombineCase[] = [
		['too few tokens 1', [{ o: 'm', t: 'm' }]],
		['too few tokens 2', [{ o: '(power)', t: '(power)' }]],
		[
			'degree tokens',
			[
				{ o: '', t: '' },
				{ o: '9', t: '9', d: 9 },
			],
		],
		[
			'not combined to diminish 1',
			[
				{ o: 'm', t: 'm' },
				{ o: '-5', t: '-5', d: 5 },
				{ o: '9', t: '9', d: 9 },
			],
		],
		[
			'not combined to diminish 2',
			[
				{ o: 'm', t: 'm' },
				{ o: '-5', t: '-5', d: 5 },
				{ o: '6', t: '6', d: 6 },
				{ o: '9', t: '9', d: 9 },
			],
		],
		[
			'not combined to diminish 3',
			[
				{ o: 'dim', t: 'dim' },
				{ o: '6', t: '6', d: 6 },
				{ o: '9', t: '9', d: 9 },
			],
		],
		[
			'not combined to augment',
			[
				{ o: '', t: '' },
				{ o: '+5', t: '+5', d: 5 },
				{ o: '9', t: '9', d: 9 },
			],
		],
	];

	it.each(combineCases)('should combine tokens: %s', (_, tokenPatterns) => {
		for (const [tokens, expectedTokens] of tokenPatterns) {
			expect(normalizeTokens(tokens)).toEqual(expectedTokens);
		}
	});
	it.each(nonCombineCases)('should not combine tokens: %s', (_, tokens) => {
		expect(normalizeTokens(tokens)).toEqual(tokens);
	});
});
