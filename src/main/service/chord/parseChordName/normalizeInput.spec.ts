import normalizeInput from './normalizeInput';

describe('normalizeInput', () => {
	it('should remove leading/trailing spaces and replace multiple spaces to one space', () => {
		expect(normalizeInput(' ')).toEqual('');
		expect(normalizeInput('　')).toEqual('');
		expect(normalizeInput('\t')).toEqual('');
		expect(normalizeInput('\r')).toEqual('');
		expect(normalizeInput('\n')).toEqual('');
		expect(normalizeInput(' \t　\r\n ')).toEqual('');
		expect(normalizeInput('A \t　\r   \n  B')).toEqual('A B');
		expect(normalizeInput(' \tA　\r\nB\nC D')).toEqual('A B C D');
	});
	it('should replace wide characters', () => {
		expect(normalizeInput('Ａ')).toEqual('A');
		expect(normalizeInput('ａ')).toEqual('a');
		expect(normalizeInput('（X）')).toEqual('(X)');
		expect(normalizeInput('ａ')).toEqual('a');
		expect(normalizeInput('Aａ')).toEqual('Aa');
		expect(normalizeInput('A（ａＢ)b')).toEqual('A(aB)b');
	});
});
