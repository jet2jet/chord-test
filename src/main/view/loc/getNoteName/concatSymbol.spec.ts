import concatSymbol from './concatSymbol';

describe('concatSymbol', () => {
	it.each([undefined, false])(
		'should append symbol if prepend value is %s',
		(prepend) => {
			expect(concatSymbol('X', 'Y', prepend)).toEqual('XY');
		}
	);
	it.each([true])(
		'should prepend symbol if prepend value is %s',
		(prepend) => {
			expect(concatSymbol('X', 'Y', prepend)).toEqual('YX');
		}
	);
	it("should append 'is' if prepend value is 'de' and symbol is 'is'", () => {
		expect(concatSymbol('X', 'is', 'de')).toEqual('Xis');
	});
	it.each(['C', 'D', 'F', 'G'])(
		"should append 'es'' if prepend value is 'de', symbol is 'es', and note is '%s'",
		(note) => {
			expect(concatSymbol(note, 'es', 'de')).toEqual(`${note}es`);
		}
	);
	it.each(['E', 'A'])(
		"should append 's'' if prepend value is 'de', symbol is 'es', and note is '%s'",
		(note) => {
			expect(concatSymbol(note, 'es', 'de')).toEqual(`${note}s`);
		}
	);
	it("should return 'B' if prepend value is 'de', symbol is 'es', and note is 'H'", () => {
		expect(concatSymbol('H', 'es', 'de')).toEqual('B');
	});
});
