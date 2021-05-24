import { mocked } from 'ts-jest/utils';
import pickupChordByName from '../pickupChordByName';
import compareToken from './compareToken';
import sortTokens from './sortTokens';

type ArrayWithoutIndex = Omit<any[], number>;

jest.mock('../pickupChordByName');
jest.mock('./compareToken');

describe('sortTokens', () => {
	it('should use pickupChordByName for building data and compareToken for sorting', () => {
		const dummyToken1: any = { __type: 'Token1', t: 'token1' };
		const dummyToken2: any = { __type: 'Token2', t: 'token2' };
		const dummyPickupResult1: any = [
			undefined,
			{ __type: 'PickupResult1' },
		];
		const dummyCompareResult: any = { __type: 'CompareResult' };

		mocked(pickupChordByName).mockImplementation((t) => {
			switch (t) {
				case 'token1':
					return dummyPickupResult1;
				case 'token2':
					return null;
				default:
					throw new Error(`Unexpected call: ${t}`);
			}
		});
		mocked(compareToken).mockReturnValue(dummyCompareResult);

		const dummyTokens = [dummyToken1, dummyToken2];
		jest.spyOn(
			Array.prototype as ArrayWithoutIndex,
			'sort'
		).mockImplementationOnce(function (this: any[], sortCallback) {
			expect(typeof sortCallback).toEqual('function');
			if (sortCallback === undefined) {
				throw new Error('Fail');
			}
			expect(
				sortCallback(
					{ t: dummyToken1, i: dummyPickupResult1[1] },
					{ t: dummyToken2, i: undefined }
				)
			).toBe(dummyCompareResult);
			expect(compareToken).toHaveBeenCalledWith(
				dummyToken1,
				dummyPickupResult1[1],
				dummyToken2,
				undefined
			);
			return this;
		});
		const sortResult = sortTokens(dummyTokens);
		expect(pickupChordByName).toHaveBeenCalledWith(dummyToken1.t);
		expect(pickupChordByName).toHaveBeenCalledWith(dummyToken2.t);
		expect(sortResult).toEqual(dummyTokens);
	});
});
