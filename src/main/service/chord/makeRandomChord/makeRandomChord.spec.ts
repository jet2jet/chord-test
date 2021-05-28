import { mocked } from 'ts-jest/utils';
import type Chord from '../../../model/Chord';
import ChordAppends from '../../../model/ChordAppends';
import getRandomAppend from './getRandomAppend';
import getRandomChordType from './getRandomChordType';
import getRandomRoot from './getRandomRoot';

import makeRandomChord from './makeRandomChord';

type ArrayWithoutIndex = Omit<any[], number>;

jest.mock('./getRandomAppend');
jest.mock('./getRandomChordType');
jest.mock('./getRandomRoot');

const dummyLevel: any = { __type: 'level' };
const dummyGetRandom: any = { __type: 'getRandom' };
const dummyRoot: any = { __type: 'root' };
const dummyRootSharpFlat: any = { __type: 'rootSharpFlat' };
const dummyChordType: any = { __type: 'chordType' };

describe('makeRandomChord', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		mocked(getRandomRoot).mockReturnValue([dummyRoot, dummyRootSharpFlat]);
		mocked(getRandomChordType).mockReturnValue(dummyChordType);
	});

	it.each([0, 1, 2, 3])(
		'should use appropriate return values (%s append(s))',
		(appendCount) => {
			let calls = 0;
			const mockedGetRandomAppend = mocked(getRandomAppend);
			mockedGetRandomAppend.mockImplementation(() => {
				// HACK: copy specified array to mock.calls
				// (cf. https://github.com/facebook/jest/issues/434)
				mockedGetRandomAppend.mock.calls[
					calls
				][2] = mockedGetRandomAppend.mock.calls[calls][2].slice();
				++calls;
				if (calls > appendCount) {
					return [ChordAppends.None];
				}
				return [calls as ChordAppends];
			});
			const expectedAppends = [...Array(appendCount)].map(
				(_, j) => (j + 1) as ChordAppends
			);
			jest.spyOn(
				Array.prototype as ArrayWithoutIndex,
				'sort'
			).mockImplementationOnce(function (this: any[]) {
				expect(this).toEqual(expectedAppends);
				return this;
			});

			const r = makeRandomChord(dummyLevel, dummyGetRandom);
			expect(r).toEqual<Chord>({
				root: dummyRoot,
				rootSharpFlat: dummyRootSharpFlat,
				type: dummyChordType,
				appends: expectedAppends,
			});
			expect(getRandomRoot).toHaveBeenCalledWith(
				dummyLevel,
				dummyGetRandom
			);
			expect(getRandomChordType).toHaveBeenCalledWith(
				dummyLevel,
				dummyGetRandom
			);
			expect(getRandomAppend).toHaveBeenCalledTimes(appendCount + 1);
			for (let i = 0; i <= appendCount; ++i) {
				expect(getRandomAppend).toHaveBeenCalledWith(
					dummyLevel,
					dummyChordType,
					[...Array(i)].map((_, j) => (j + 1) as ChordAppends),
					dummyGetRandom
				);
			}
			expect(Array.prototype.sort).toHaveBeenCalled();
		}
	);
});
