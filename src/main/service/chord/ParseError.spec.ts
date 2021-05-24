import ParseError from './ParseError';

describe('ParseError', () => {
	const dummyMessageIndex: any = {
		__type: 'MessageIndex',
		toString: () => 'DummyMessageIndex',
	};
	describe('construct', () => {
		it('should construct with messageIndex only (no args)', () => {
			const e = new ParseError(dummyMessageIndex);
			expect(e.name).toEqual('ParseError');
			expect(e.message).toEqual('DummyMessageIndex');
			expect(e.messageIndex).toEqual(dummyMessageIndex);
			expect(e.args).toEqual([]);
		});
		it('should construct with messageIndex and args (length = 0)', () => {
			const dummyArgs: any[] = [];
			const e = new ParseError(dummyMessageIndex, dummyArgs);
			expect(e.name).toEqual('ParseError');
			expect(e.message).toEqual('DummyMessageIndex');
			expect(e.messageIndex).toEqual(dummyMessageIndex);
			expect(e.args).toEqual(dummyArgs);
		});
		it('should construct with messageIndex and args (length > 0)', () => {
			const dummyArgs: any[] = [
				{
					__type: 'Arg1',
					toString: () => 'DummyArg1',
				},
				{
					__type: 'Arg2',
					toString: () => 'DummyArg2',
				},
			];
			const e = new ParseError(dummyMessageIndex, dummyArgs);
			expect(e.name).toEqual('ParseError');
			expect(e.message).toEqual(
				'DummyMessageIndex (DummyArg1, DummyArg2)'
			);
			expect(e.messageIndex).toEqual(dummyMessageIndex);
			expect(e.args).toEqual(dummyArgs);
		});
	});
	describe('toString', () => {
		it('should use instance message value', () => {
			const e = new ParseError(dummyMessageIndex);
			e.message = 'DummyMessage';
			expect(e.toString()).toEqual('Parse error: DummyMessage');
		});
	});
});
