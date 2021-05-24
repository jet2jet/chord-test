import { mocked } from 'ts-jest/utils';

import ChordAppends from '../../../model/ChordAppends';
import ChordType from '../../../model/ChordType';
import validateChordAppends from '../validateChord/validateChordAppends';
import validateChordType from '../validateChord/validateChordType';

import getRandomAppendImpl from './getRandomAppendImpl';

jest.mock('../validateChord/validateChordAppends');
jest.mock('../validateChord/validateChordType');

/* eslint-disable jest/no-conditional-expect */

function testForThrowError(
	level: number,
	type: ChordType,
	randomValue: number,
	appendsFromRandom: ChordAppends
) {
	it('should throw if validateChordType throw', () => {
		const dummyError = new Error();
		const dummyGetRandom = jest.fn(() => randomValue);
		mocked(validateChordType).mockImplementation(() => {
			throw dummyError;
		});
		mocked(validateChordAppends).mockReturnValue(undefined);
		expect(() =>
			getRandomAppendImpl(level, type, [], dummyGetRandom)
		).toThrowError(dummyError);
		expect(dummyGetRandom).toHaveBeenCalled();
		expect(validateChordType).toHaveBeenCalledWith(type, [
			appendsFromRandom,
		]);
	});
	it('should throw if validateChordAppends throw', () => {
		const dummyError = new Error();
		const dummyGetRandom = jest.fn(() => randomValue);
		mocked(validateChordAppends).mockImplementation(() => {
			throw dummyError;
		});
		mocked(validateChordType).mockReturnValue(undefined);
		expect(() =>
			getRandomAppendImpl(level, type, [], dummyGetRandom)
		).toThrowError(dummyError);
		expect(dummyGetRandom).toHaveBeenCalled();
		expect(validateChordAppends).toHaveBeenCalledWith([appendsFromRandom]);
	});
}

function testForSus4Chord(level: number) {
	if (level === 0) {
		it('should return no append type for Sus4 chord type (level 0)', () => {
			const dummyGetRandom = jest.fn(() => 0);

			mocked(validateChordType).mockClear().mockReturnValue(undefined);
			mocked(validateChordAppends).mockClear().mockReturnValue(undefined);

			expect(
				getRandomAppendImpl(level, ChordType.Sus4, [], dummyGetRandom)
			).toBe(ChordAppends.None);
			expect(dummyGetRandom).not.toHaveBeenCalled();
			expect(validateChordAppends).not.toHaveBeenCalled();
			expect(validateChordType).not.toHaveBeenCalled();
		});
	} else if (level === 1 || level === 2) {
		it('should return two append type for Sus4 chord type (level 1-2)', () => {
			const dummyGetRandom = jest.fn(() => 0);

			([
				[ChordAppends.None, 0],
				[ChordAppends.Seventh, 0.625], // Math.floor(0.625 * 2) === 1
			] as const).forEach(([appends, randomValue]) => {
				dummyGetRandom.mockClear().mockReturnValue(randomValue);
				mocked(validateChordType)
					.mockClear()
					.mockReturnValue(undefined);
				mocked(validateChordAppends)
					.mockClear()
					.mockReturnValue(undefined);

				expect(
					getRandomAppendImpl(
						level,
						ChordType.Sus4,
						[],
						dummyGetRandom
					)
				).toBe(appends);
				expect(dummyGetRandom).toHaveBeenCalledWith();
				if (appends === ChordAppends.None) {
					expect(validateChordAppends).not.toHaveBeenCalled();
					expect(validateChordType).not.toHaveBeenCalled();
				} else {
					expect(
						validateChordType
					).toHaveBeenCalledWith(ChordType.Sus4, [appends]);
					expect(validateChordAppends).toHaveBeenCalledWith([
						appends,
					]);
				}
			});
		});
	} else if (level === 3) {
		it('should return three append type for Sus4 chord type (level 3)', () => {
			const dummyGetRandom = jest.fn(() => 0);

			([
				[ChordAppends.None, 0],
				[ChordAppends.Seventh, 0.375], // Math.floor(0.375 * 3) === 1
				[ChordAppends.Major7, 0.75], // Math.floor(0.75 * 3) === 2
			] as const).forEach(([appends, randomValue]) => {
				dummyGetRandom.mockClear().mockReturnValue(randomValue);
				mocked(validateChordType)
					.mockClear()
					.mockReturnValue(undefined);
				mocked(validateChordAppends)
					.mockClear()
					.mockReturnValue(undefined);

				expect(
					getRandomAppendImpl(
						level,
						ChordType.Sus4,
						[],
						dummyGetRandom
					)
				).toBe(appends);
				expect(dummyGetRandom).toHaveBeenCalledWith();
				if (appends === ChordAppends.None) {
					expect(validateChordAppends).not.toHaveBeenCalled();
					expect(validateChordType).not.toHaveBeenCalled();
				} else {
					expect(
						validateChordType
					).toHaveBeenCalledWith(ChordType.Sus4, [appends]);
					expect(validateChordAppends).toHaveBeenCalledWith([
						appends,
					]);
				}
			});
		});
	}
	it('should always return None if prevAppends has an item', () => {
		const dummyGetRandom = jest.fn(() => 0);
		expect(
			getRandomAppendImpl(
				level,
				ChordType.Sus4,
				[ChordAppends.Seventh],
				dummyGetRandom
			)
		).toBe(ChordAppends.None);
		expect(dummyGetRandom).not.toHaveBeenCalled();
		expect(validateChordAppends).not.toHaveBeenCalled();
		expect(validateChordType).not.toHaveBeenCalled();
	});
	testForThrowError(
		level,
		ChordType.Sus4,
		level === 3 ? 0.375 : 0.625, // Math.floor(0.625 * 2) === 1, Math.floor(0.375 * 3) === 1
		ChordAppends.Seventh
	);
}

function testForDimAugPowerChords(level: number) {
	it('should always return None for Diminish(7), Augment, and Power chords', () => {
		const dummyGetRandom = jest.fn(() => 0);

		for (const type of [
			ChordType.Diminish,
			ChordType.Diminish7,
			ChordType.Augment,
			ChordType.Power,
		]) {
			expect(getRandomAppendImpl(level, type, [], dummyGetRandom)).toBe(
				ChordAppends.None
			);
		}
		expect(dummyGetRandom).not.toHaveBeenCalled();
		expect(validateChordAppends).not.toHaveBeenCalled();
		expect(validateChordType).not.toHaveBeenCalled();
	});
}

const LEVEL_TO_APPENDS_LEVEL = [
	0,
	ChordAppends._Level1,
	ChordAppends._Level2,
	ChordAppends._Level3,
	ChordAppends._Level4,
] as const;

function testForNormalChords(level: number, type: ChordType) {
	const max = LEVEL_TO_APPENDS_LEVEL[level];
	const testAppends = [...Array(max)].map((_, i) => i as ChordAppends);
	it.each(testAppends)(
		'should use append by calculating the value from getRandom (append = %s)',
		(append) => {
			const dummyGetRandom = jest.fn(() => 0);
			dummyGetRandom
				.mockClear()
				.mockReturnValue((append + 1 / (max * 2)) / max);
			mocked(validateChordType).mockClear().mockReturnValue(undefined);
			mocked(validateChordAppends).mockClear().mockReturnValue(undefined);

			expect(getRandomAppendImpl(level, type, [], dummyGetRandom)).toBe(
				append
			);

			if (append === ChordAppends.None) {
				expect(validateChordAppends).not.toHaveBeenCalled();
				expect(validateChordType).not.toHaveBeenCalled();
			} else {
				expect(validateChordType).toHaveBeenCalledWith(type, [append]);
				expect(validateChordAppends).toHaveBeenCalledWith([append]);
			}
		}
	);
	testForThrowError(
		level,
		type,
		(ChordAppends.Seventh + 1 / (max * 2)) / max,
		ChordAppends.Seventh
	);
}

const normalChords = [ChordType.Major, ChordType.Minor] as const;

describe('getRandomAppendImpl', () => {
	beforeEach(() => {
		jest.resetAllMocks();
	});
	describe('level 0', () => {
		it('should always return None', () => {
			const dummyGetRandom = jest.fn(() => 0);

			expect(
				getRandomAppendImpl(0, ChordType.Major, [], dummyGetRandom)
			).toBe(ChordAppends.None);
			expect(dummyGetRandom).not.toHaveBeenCalled();
			expect(validateChordAppends).not.toHaveBeenCalled();
			expect(validateChordType).not.toHaveBeenCalled();
		});
	});
	describe.each([1, 2, 3, 4] as const)('level %s', (level) => {
		describe('for chord Sus4', () => {
			testForSus4Chord(level);
		});
		describe('for chord Dim(7)/Aug/Power', () => {
			testForDimAugPowerChords(level);
		});
		describe.each(normalChords)('for chord %s', (type) => {
			testForNormalChords(level, type);
		});
	});
});
