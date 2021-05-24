import isFlatSymbol from './isFlatSymbol';

describe('isFlatSymbol', () => {
	it.each(['-', 'b', '♭'])("should return true for character '%s'", (c) => {
		expect(isFlatSymbol(c)).toBe(true);
	});
	it.each(['+', '#', '♯', '＃', '=', '♮'])(
		"should return false for character '%s'",
		(c) => {
			expect(isFlatSymbol(c)).toBe(false);
		}
	);
});
