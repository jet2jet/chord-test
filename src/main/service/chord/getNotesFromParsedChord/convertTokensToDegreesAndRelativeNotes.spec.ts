import { mocked } from 'ts-jest/utils';

import convertTokenToDegreesAndRelativeNotes from './convertTokenToDegreesAndRelativeNotes';
import makeDegreeUsedMap from './makeDegreeUsedMap';

import convertTokensToDegreesAndRelativeNotes from './convertTokensToDegreesAndRelativeNotes';

jest.mock('./convertTokenToDegreesAndRelativeNotes');
jest.mock('./makeDegreeUsedMap');

describe('convertTokensToDegreesAndRelativeNotes', () => {
	it("should return map of convertTokenToDegreesAndRelativeNotes's result", () => {
		const dummyTokenData1: any = { __type: 'TokenData1' };
		const dummyTokenData2: any = { __type: 'TokenData2' };
		const dummyTokenData3: any = { __type: 'TokenData3' };
		const dummyDegreeUsed: any = { __type: 'DegreeUsed' };

		function makeDummyDegreeAndRelativeNote(token: any): any {
			return { __type: 'DegreeAndRelativeNote', __token: token };
		}

		mocked(makeDegreeUsedMap).mockReturnValueOnce(dummyDegreeUsed);
		mocked(convertTokenToDegreesAndRelativeNotes).mockImplementation(
			makeDummyDegreeAndRelativeNote
		);

		const input = [dummyTokenData1, dummyTokenData2, dummyTokenData3];
		const r = convertTokensToDegreesAndRelativeNotes(input);

		expect(r).toEqual([
			makeDummyDegreeAndRelativeNote(dummyTokenData1),
			makeDummyDegreeAndRelativeNote(dummyTokenData2),
			makeDummyDegreeAndRelativeNote(dummyTokenData3),
		]);
		expect(makeDegreeUsedMap).toHaveBeenCalledWith(input);
		expect(convertTokenToDegreesAndRelativeNotes).toHaveBeenCalledTimes(
			input.length
		);
		expect(convertTokenToDegreesAndRelativeNotes).toHaveBeenCalledWith(
			dummyTokenData1,
			dummyDegreeUsed
		);
		expect(convertTokenToDegreesAndRelativeNotes).toHaveBeenCalledWith(
			dummyTokenData2,
			dummyDegreeUsed
		);
		expect(convertTokenToDegreesAndRelativeNotes).toHaveBeenCalledWith(
			dummyTokenData3,
			dummyDegreeUsed
		);
	});
});
