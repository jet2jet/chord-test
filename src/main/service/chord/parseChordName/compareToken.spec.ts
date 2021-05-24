import compareToken from './compareToken';

describe('compareToken', () => {
	it("should return chord-index diff if A's and B's chord index is not undefined", () => {
		for (const [chordIndexA, chordIndexB] of [
			[3, 5],
			[3, 3],
			[3, 2],
		] as const) {
			expect(
				compareToken(
					{ o: '', t: '', d: chordIndexA },
					chordIndexA,
					{ o: '', t: '', d: chordIndexB },
					chordIndexB
				)
			).toEqual(chordIndexA - chordIndexB);
		}
	});
	it("should return negative value if A's chord index is not undefined and B's chord index is undefined", () => {
		expect(
			compareToken({ o: '', t: '' }, 3, { o: '', t: '' }, undefined)
		).toBeLessThan(0);
	});
	it("should return positive value if A's chord index is undefined and B's chord index is not undefined", () => {
		expect(
			compareToken({ o: '', t: '' }, undefined, { o: '', t: '' }, 3)
		).toBeGreaterThan(0);
	});
	describe('when both chord indexes are undefined', () => {
		it('should return diff value if both tokens have degree number and are difference', () => {
			for (const [degreeA, degreeB] of [
				[3, 5],
				[3, 2],
			] as const) {
				expect(
					compareToken(
						{ o: '', t: `${degreeA}`, d: degreeA },
						undefined,
						{ o: '', t: `${degreeB}`, d: degreeB },
						undefined
					)
				).toEqual(degreeA - degreeB);
			}
		});
		it("should return negative value if A's token has no degree and B's token has a degree", () => {
			expect(
				compareToken(
					{ o: '', t: '' },
					undefined,
					{ o: '', t: '-9', d: 9 },
					undefined
				)
			).toBeLessThan(0);
		});
		it("should return positive value if A's token has a degree and B's token has no degree", () => {
			expect(
				compareToken(
					{ o: '', t: '-9', d: 9 },
					undefined,
					{ o: '', t: '' },
					undefined
				)
			).toBeGreaterThan(0);
		});
		describe('when both tokens have same degree', () => {
			it("should return zero if A's token has a flat and B's token has a flat", () => {
				expect(
					compareToken(
						{ o: '', t: '-9', d: 9 },
						undefined,
						{ o: '', t: '-9', d: 9 },
						undefined
					)
				).toBe(0);
			});
			it("should return negative value if A's token has a flat and B's token has no flat and sharp", () => {
				expect(
					compareToken(
						{ o: '', t: '-9', d: 9 },
						undefined,
						{ o: '', t: '9', d: 9 },
						undefined
					)
				).toBeLessThan(0);
			});
			it("should return negative value if A's token has a flat and B's token has a sharp", () => {
				expect(
					compareToken(
						{ o: '', t: '-9', d: 9 },
						undefined,
						{ o: '', t: '+9', d: 9 },
						undefined
					)
				).toBeLessThan(0);
			});
			it("should return positive value if A's token has no flat and sharp and B's token has a flat", () => {
				expect(
					compareToken(
						{ o: '', t: '9', d: 9 },
						undefined,
						{ o: '', t: '-9', d: 9 },
						undefined
					)
				).toBeGreaterThan(0);
			});
			it("should return zero if A's token has no flat and sharp and B's token has no flat and sharp", () => {
				expect(
					compareToken(
						{ o: '', t: '9', d: 9 },
						undefined,
						{ o: '', t: '9', d: 9 },
						undefined
					)
				).toBe(0);
			});
			it("should return negative value if A's token has no flat and sharp and B's token has a sharp", () => {
				expect(
					compareToken(
						{ o: '', t: '9', d: 9 },
						undefined,
						{ o: '', t: '+9', d: 9 },
						undefined
					)
				).toBeLessThan(0);
			});
			it("should return positive value if A's token has a sharp and B's token has a flat", () => {
				expect(
					compareToken(
						{ o: '', t: '+9', d: 9 },
						undefined,
						{ o: '', t: '-9', d: 9 },
						undefined
					)
				).toBeGreaterThan(0);
			});
			it("should return positive value if A's token has a sharp and B's token has no flat and sharp", () => {
				expect(
					compareToken(
						{ o: '', t: '+9', d: 9 },
						undefined,
						{ o: '', t: '9', d: 9 },
						undefined
					)
				).toBeGreaterThan(0);
			});
			it("should return zero if A's token has a sharp and B's token has a sharp", () => {
				expect(
					compareToken(
						{ o: '', t: '+9', d: 9 },
						undefined,
						{ o: '', t: '+9', d: 9 },
						undefined
					)
				).toBe(0);
			});
		});
	});
});
