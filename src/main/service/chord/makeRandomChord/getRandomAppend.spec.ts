import { mocked } from 'ts-jest/utils';
import ChordAppends from '../../../model/ChordAppends';
import getRandomAppend from './getRandomAppend';
import getRandomAppendImpl from './getRandomAppendImpl';

jest.mock('./getRandomAppendImpl');

const dummyChordType: any = { __type: 'chordType' };
const dummyPrevAppends: any = { __type: 'prevAppends' };
const dummyGetRandom: any = { __type: 'getRandom' };
const dummyChordAppends: any = { __type: 'chordAppends' };

describe('getRandomAppend', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});
	it('should return None if level is zero', () => {
		expect(
			getRandomAppend(0, dummyChordType, dummyPrevAppends, dummyGetRandom)
		).toEqual([ChordAppends.None]);
		expect(getRandomAppendImpl).not.toHaveBeenCalled();
	});
	it("should return getRandomAppendImpl's result", () => {
		mocked(getRandomAppendImpl).mockReturnValue([dummyChordAppends]);
		expect(
			getRandomAppend(1, dummyChordType, dummyPrevAppends, dummyGetRandom)
		).toEqual([dummyChordAppends]);
		expect(getRandomAppendImpl).toHaveBeenCalledWith(
			1,
			dummyChordType,
			dummyPrevAppends,
			dummyGetRandom
		);
	});
	it.each([2, 3])(
		'should retry max three times if getRandomAppendImpl throws (count = %s)',
		(countOfSuccess) => {
			const dummyError = new Error('dummy');
			let calls = 0;
			mocked(getRandomAppendImpl)
				.mockClear()
				.mockImplementation(() => {
					++calls;
					if (calls < countOfSuccess) {
						throw dummyError;
					}
					return [dummyChordAppends];
				});
			expect(
				getRandomAppend(
					1,
					dummyChordType,
					dummyPrevAppends,
					dummyGetRandom
				)
			).toEqual([dummyChordAppends]);
			expect(getRandomAppendImpl).toHaveBeenCalledTimes(countOfSuccess);
			expect(getRandomAppendImpl).toHaveBeenCalledWith(
				1,
				dummyChordType,
				dummyPrevAppends,
				dummyGetRandom
			);
		}
	);
	it('should return None if getRandomAppendImpl throws three times', () => {
		const dummyError = new Error('dummy');
		mocked(getRandomAppendImpl).mockImplementation(() => {
			throw dummyError;
		});
		expect(
			getRandomAppend(1, dummyChordType, dummyPrevAppends, dummyGetRandom)
		).toEqual([ChordAppends.None]);
		expect(getRandomAppendImpl).toHaveBeenCalledTimes(3);
		expect(getRandomAppendImpl).toHaveBeenCalledWith(
			1,
			dummyChordType,
			dummyPrevAppends,
			dummyGetRandom
		);
	});
});
