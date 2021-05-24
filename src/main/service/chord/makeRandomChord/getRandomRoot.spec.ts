import NoteType from '../../../model/NoteType';
import SharpFlatType from '../../../model/SharpFlatType';
import getRandomRoot from './getRandomRoot';

function normalizeNote(noteValue: number): NoteType {
	if (noteValue >= 12) {
		noteValue -= 12;
	} else if (noteValue < 0) {
		noteValue += 12;
	}
	return noteValue as NoteType;
}

describe('getRandomRoot', () => {
	describe('for level 0', () => {
		it('should use integer value of 7 times of getRandom()', () => {
			const dummyGetRandom = jest.fn(() => 0);

			dummyGetRandom.mockReturnValue(3 / 7);
			expect(getRandomRoot(0, dummyGetRandom)).toEqual([
				NoteType.F,
				SharpFlatType.Natural,
			]);
			expect(dummyGetRandom).toHaveBeenCalledWith();
			expect(dummyGetRandom).toHaveBeenCalledTimes(3);

			dummyGetRandom.mockClear().mockReturnValue(4.0625 / 7);
			expect(getRandomRoot(0, dummyGetRandom)).toEqual([
				NoteType.G,
				SharpFlatType.Natural,
			]);
			expect(dummyGetRandom).toHaveBeenCalledWith();
			expect(dummyGetRandom).toHaveBeenCalledTimes(3);

			dummyGetRandom.mockClear().mockReturnValue(1.0625 / 7);
			expect(getRandomRoot(0, dummyGetRandom)).toEqual([
				NoteType.D,
				SharpFlatType.Natural,
			]);
			expect(dummyGetRandom).toHaveBeenCalledWith();
			expect(dummyGetRandom).toHaveBeenCalledTimes(3);
		});
	});
	describe.each([1, 2, 3])('for level %s', (level) => {
		const normalSharpFlatCase: ReadonlyArray<
			readonly [
				text: string,
				randomValueThree: number,
				sharpFlatValue: SharpFlatType
			]
		> = [
			['natural', 1.25 / 3, SharpFlatType.Natural],
			['flat', 0.75 / 3, SharpFlatType.Flat],
			['sharp', 2.375 / 3, SharpFlatType.Sharp],
		];
		// eslint-disable-next-line @typescript-eslint/naming-convention
		const noteCOrFCase: ReadonlyArray<
			readonly [
				text: string,
				randomValueTwo: number,
				sharpFlatValue: SharpFlatType
			]
		> = [
			['natural', 0.5 / 2, SharpFlatType.Natural],
			['sharp', 1 / 2, SharpFlatType.Sharp],
		];
		// eslint-disable-next-line @typescript-eslint/naming-convention
		const noteEOrBCase: ReadonlyArray<
			readonly [
				text: string,
				randomValueTwo: number,
				sharpFlatValue: SharpFlatType
			]
		> = [
			['natural', 0.5 / 2, SharpFlatType.Natural],
			['flat', 1 / 2, SharpFlatType.Flat],
		];
		// eslint-disable-next-line @typescript-eslint/naming-convention
		const level3OnlyNoteCOrFCase: ReadonlyArray<
			readonly [
				text: string,
				randomValueThree: number,
				sharpFlatValue: SharpFlatType
			]
		> = [
			['flat instead of ', 0.75 / 3, SharpFlatType.Flat],
			['', 1 / 3, SharpFlatType.Natural],
			['', 2 / 3, SharpFlatType.Natural],
		];
		// eslint-disable-next-line @typescript-eslint/naming-convention
		const level3OnlyNoteEOrBCase: ReadonlyArray<
			readonly [
				text: string,
				randomValueThree: number,
				sharpFlatValue: SharpFlatType
			]
		> = [
			['', 0.75 / 3, SharpFlatType.Natural],
			['', 1 / 3, SharpFlatType.Natural],
			['sharp instead of ', 2 / 3, SharpFlatType.Sharp],
		];
		it.each(normalSharpFlatCase)(
			'should use integer value of 7 times of getRandom() with sharp-flat random values: %s (D, G, A)',
			(_, randomValue, sharpFlatValue) => {
				const dummyGetRandom = jest.fn(() => 0);

				dummyGetRandom.mockReturnValueOnce(1 / 7);
				dummyGetRandom.mockReturnValueOnce(randomValue);
				dummyGetRandom.mockReturnValueOnce(1.25 / 2);
				expect(getRandomRoot(level, dummyGetRandom)).toEqual([
					NoteType.D + sharpFlatValue,
					sharpFlatValue,
				]);
				expect(dummyGetRandom).toHaveBeenCalledWith();

				dummyGetRandom.mockClear().mockReturnValueOnce(4 / 7);
				dummyGetRandom.mockReturnValueOnce(randomValue);
				dummyGetRandom.mockReturnValueOnce(0.75 / 2);
				expect(getRandomRoot(level, dummyGetRandom)).toEqual([
					NoteType.G + sharpFlatValue,
					sharpFlatValue,
				]);
				expect(dummyGetRandom).toHaveBeenCalledWith();

				dummyGetRandom.mockClear().mockReturnValueOnce(5 / 7);
				dummyGetRandom.mockReturnValueOnce(randomValue);
				dummyGetRandom.mockReturnValueOnce(1.75 / 2);
				expect(getRandomRoot(level, dummyGetRandom)).toEqual([
					NoteType.A + sharpFlatValue,
					sharpFlatValue,
				]);
				expect(dummyGetRandom).toHaveBeenCalledWith();
			}
		);
		for (const [
			textForLevel3,
			randomValueThree,
			sharpFlatValueForLevel3,
		] of level3OnlyNoteCOrFCase) {
			it.each(noteCOrFCase)(
				`should use integer value of 7 times of getRandom() with sharp-flat: ${textForLevel3}%s (random values: ${randomValueThree}, %s) (C, F)`,
				(_, randomValueTwo, sharpFlatValue) => {
					const dummyGetRandom = jest.fn(() => 0);
					const expectSharpFlatValue =
						level === 3 &&
						sharpFlatValueForLevel3 !== SharpFlatType.Natural
							? sharpFlatValueForLevel3
							: sharpFlatValue;

					dummyGetRandom.mockReturnValueOnce(0 / 7);
					dummyGetRandom.mockReturnValueOnce(randomValueThree);
					dummyGetRandom.mockReturnValueOnce(randomValueTwo);
					expect(getRandomRoot(level, dummyGetRandom)).toEqual([
						normalizeNote(NoteType.C + expectSharpFlatValue),
						expectSharpFlatValue,
					]);
					expect(dummyGetRandom).toHaveBeenCalledWith();

					dummyGetRandom.mockClear().mockReturnValueOnce(3 / 7);
					dummyGetRandom.mockReturnValueOnce(randomValueThree);
					dummyGetRandom.mockReturnValueOnce(randomValueTwo);
					expect(getRandomRoot(level, dummyGetRandom)).toEqual([
						normalizeNote(NoteType.F + expectSharpFlatValue),
						expectSharpFlatValue,
					]);
					expect(dummyGetRandom).toHaveBeenCalledWith();
				}
			);
		}
		for (const [
			textForLevel3,
			randomValueThree,
			sharpFlatValueForLevel3,
		] of level3OnlyNoteEOrBCase) {
			it.each(noteEOrBCase)(
				`should use integer value of 7 times of getRandom() with sharp-flat: ${textForLevel3}%s (random values: ${randomValueThree}, %s) (E, B)`,
				(_, randomValueTwo, sharpFlatValue) => {
					const dummyGetRandom = jest.fn(() => 0);
					const expectSharpFlatValue =
						level === 3 &&
						sharpFlatValueForLevel3 !== SharpFlatType.Natural
							? sharpFlatValueForLevel3
							: sharpFlatValue;

					dummyGetRandom.mockReturnValueOnce(2 / 7);
					dummyGetRandom.mockReturnValueOnce(randomValueThree);
					dummyGetRandom.mockReturnValueOnce(randomValueTwo);
					expect(getRandomRoot(level, dummyGetRandom)).toEqual([
						normalizeNote(NoteType.E + expectSharpFlatValue),
						expectSharpFlatValue,
					]);
					expect(dummyGetRandom).toHaveBeenCalledWith();

					dummyGetRandom.mockClear().mockReturnValueOnce(6 / 7);
					dummyGetRandom.mockReturnValueOnce(randomValueThree);
					dummyGetRandom.mockReturnValueOnce(randomValueTwo);
					expect(getRandomRoot(level, dummyGetRandom)).toEqual([
						normalizeNote(NoteType.B + expectSharpFlatValue),
						expectSharpFlatValue,
					]);
					expect(dummyGetRandom).toHaveBeenCalledWith();
				}
			);
		}
	});
});
