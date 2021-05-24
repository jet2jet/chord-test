import ChordType from '../../../model/ChordType';
import getRandomChordType from './getRandomChordType';

describe('getRandomChordType', () => {
	const dummyGetRandom = jest.fn(() => 0);
	beforeEach(() => {
		dummyGetRandom.mockClear();
	});

	it.each([0, 1, 2])(
		'should return only major, minor, or sus4 if level is %s',
		(level) => {
			dummyGetRandom.mockReturnValue(0);
			expect(getRandomChordType(level, dummyGetRandom)).toBe(
				ChordType.Major
			);
			expect(dummyGetRandom).toHaveBeenCalledWith();

			dummyGetRandom.mockClear().mockReturnValue(0.5); // 0.33 < 0.5 < 0.66
			expect(getRandomChordType(level, dummyGetRandom)).toBe(
				ChordType.Minor
			);
			expect(dummyGetRandom).toHaveBeenCalledWith();

			dummyGetRandom.mockClear().mockReturnValue(0.75);
			expect(getRandomChordType(level, dummyGetRandom)).toBe(
				ChordType.Sus4
			);
			expect(dummyGetRandom).toHaveBeenCalledWith();
		}
	);

	it('should return aall type if level is 3', () => {
		for (let i = 0; i < ChordType._Count; ++i) {
			dummyGetRandom
				.mockClear()
				.mockReturnValue((i + 1 / ChordType._Count) / ChordType._Count);
			expect(getRandomChordType(3, dummyGetRandom)).toBe(i as ChordType);
			expect(dummyGetRandom).toHaveBeenCalledWith();
		}
	});
});
