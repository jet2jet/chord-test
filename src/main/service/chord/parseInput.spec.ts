import { mocked } from 'ts-jest/utils';

import getNotesFromParsedChord from './getNotesFromParsedChord';
import parseChordName from './parseChordName';

import parseInput from './parseInput';

jest.mock('./getNotesFromParsedChord');
jest.mock('./parseChordName');

describe('parseInput', () => {
	const dummyInput: any = { __type: 'Input' };

	it('should return an empty array if parseChordName returns null (meaning no input)', () => {
		mocked(parseChordName).mockReturnValueOnce(null);

		const r = parseInput(dummyInput);

		expect(r).toEqual([]);
		expect(parseChordName).toHaveBeenCalledWith(dummyInput);
		expect(getNotesFromParsedChord).not.toHaveBeenCalled();
	});
	it("should return getNotesFromParsedChord's result if parseChordName returns non-null", () => {
		const dummyParseResult: any = { __type: 'ParseResult' };
		const dummyGetNotesResult: any = { __type: 'GetNotesResult' };

		mocked(parseChordName).mockReturnValueOnce(dummyParseResult);
		mocked(getNotesFromParsedChord).mockReturnValueOnce(
			dummyGetNotesResult
		);

		const r = parseInput(dummyInput);

		expect(r).toEqual(dummyGetNotesResult);
		expect(parseChordName).toHaveBeenCalledWith(dummyInput);
		expect(getNotesFromParsedChord).toHaveBeenCalledWith(dummyParseResult);
	});
});
