import { mocked } from 'ts-jest/utils';
import concatChordAppendName from './concatChordAppendName';
import getChordAppendName from './getChordAppendName';

import addChordAppendNames from './addChordAppendNames';

jest.mock('../messages', () => {
	return {
		__esModule: true,
		default: {},
	};
});
jest.mock('./concatChordAppendName');
jest.mock('./getChordAppendName');

describe('addChordAppendNames', () => {
	it('should call concatChordAppendName and getChordAppendName for all appends items', () => {
		const dummyBaseText: any = { __type: 'BaseText' };
		const dummyAppend1: any = { __type: 'Append1' };
		const dummyAppend2: any = { __type: 'Append2' };
		const dummyIsFirst: any = { __type: 'IsFirst' };
		const dummyFirstAppendName: any = { __type: 'FirstAppendName' };
		const dummySecondAppendName: any = { __type: 'SecondAppendName' };
		const dummyFirstConcatResult: any = { __type: 'FirstConcatResult' };
		const dummySecondConcatResult: any = { __type: 'SecondConcatResult' };
		mocked(getChordAppendName)
			.mockReturnValueOnce(dummyFirstAppendName)
			.mockReturnValueOnce(dummySecondAppendName);
		mocked(concatChordAppendName)
			.mockReturnValueOnce(dummyFirstConcatResult)
			.mockReturnValueOnce(dummySecondConcatResult);

		const r = addChordAppendNames(
			dummyBaseText,
			[dummyAppend1, dummyAppend2],
			dummyIsFirst
		);

		expect(r).toBe(dummySecondConcatResult);
		expect(getChordAppendName).toHaveBeenCalledWith(dummyAppend1);
		expect(getChordAppendName).toHaveBeenCalledWith(dummyAppend2);
		expect(concatChordAppendName).toHaveBeenCalledWith(
			dummyBaseText,
			dummyFirstAppendName,
			dummyIsFirst
		);
		expect(concatChordAppendName).toHaveBeenCalledWith(
			dummyFirstConcatResult,
			dummySecondAppendName,
			false
		);
	});
});
