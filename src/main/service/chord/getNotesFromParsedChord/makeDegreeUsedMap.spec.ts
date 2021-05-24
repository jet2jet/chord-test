import { mocked } from 'ts-jest/utils';

import type TokenData from '../TokenData';
import degreeToRelativeBaseNote from '../degreeToRelativeBaseNote';
import makeDegreeUsedMap from './makeDegreeUsedMap';

jest.mock('../degreeToRelativeBaseNote');

describe('makeDegreeUsedMap', () => {
	it('should pick tokens with degree and make map for degree', () => {
		mocked(degreeToRelativeBaseNote).mockImplementation((val) => val);

		const input: TokenData[] = [
			{ o: '', t: '' },
			{ o: '-5', t: '-5', d: 5 },
			{ o: '+9', t: '+9', d: 9 },
		];
		expect(makeDegreeUsedMap(input)).toEqual({
			5: true,
			9: true,
		});
		expect(degreeToRelativeBaseNote).toHaveBeenCalledWith(5);
		expect(degreeToRelativeBaseNote).toHaveBeenCalledWith(9);
	});
});
