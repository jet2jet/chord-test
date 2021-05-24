import isSharpSymbol from './isSharpSymbol';

describe('isSharpSymbol', () => {
	it.each(['+', '#', '♯', '＃'])(
		"should return true for character '%s'",
		(c) => {
			expect(isSharpSymbol(c)).toBe(true);
		}
	);
	it.each(['-', 'b', '♭', '=', '♮'])(
		"should return false for character '%s'",
		(c) => {
			expect(isSharpSymbol(c)).toBe(false);
		}
	);
});
