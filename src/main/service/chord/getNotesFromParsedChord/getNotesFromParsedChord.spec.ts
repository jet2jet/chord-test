import { mocked } from 'ts-jest/utils';

import convertTokensToDegreesAndRelativeNotes from './convertTokensToDegreesAndRelativeNotes';
import reduceDegreesAndRelativeNotes from './reduceDegreesAndRelativeNotes';
import sortDegreesAndRelativeNotes from './sortDegreesAndRelativeNotes';

import getNotesFromParsedChord from './getNotesFromParsedChord';

jest.mock('./convertTokensToDegreesAndRelativeNotes');
jest.mock('./reduceDegreesAndRelativeNotes');
jest.mock('./sortDegreesAndRelativeNotes');

describe('getNotesFromParsedChord', () => {
	it("should return sortDegreesAndRelativeNotes's result with calling convertTokensToDegreesAndRelativeNotes and reduceDegreesAndRelativeNotes", () => {
		const dummyTokens: any = { __type: 'Tokens' };
		const dummyData: any = { tokens: dummyTokens };
		const dummyAutoAddSevenForNinth: any = {
			__type: 'AutoAddSevenForNinth',
		};
		const dummyConvertResult: any = { __type: 'ConvertResult' };
		const dummyReduceResult: any = { __type: 'ReduceResult' };
		const dummySortResult: any = { __type: 'SortResult' };
		mocked(convertTokensToDegreesAndRelativeNotes).mockReturnValueOnce(
			dummyConvertResult
		);
		mocked(reduceDegreesAndRelativeNotes).mockReturnValueOnce(
			dummyReduceResult
		);
		mocked(sortDegreesAndRelativeNotes).mockReturnValueOnce(
			dummySortResult
		);

		const r = getNotesFromParsedChord(dummyData, dummyAutoAddSevenForNinth);

		expect(r).toEqual(dummySortResult);
		expect(convertTokensToDegreesAndRelativeNotes).toHaveBeenCalledWith(
			dummyTokens,
			dummyAutoAddSevenForNinth
		);
		expect(reduceDegreesAndRelativeNotes).toHaveBeenCalledWith(
			dummyConvertResult
		);
		expect(sortDegreesAndRelativeNotes).toHaveBeenCalledWith(
			dummyReduceResult
		);
	});
});
