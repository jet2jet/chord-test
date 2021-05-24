import ChordMeta from '../../../../model/ChordMeta';
import isRelNoteToBeIncluded from './isRelNoteToBeIncluded';

describe('isRelNoteToBeIncluded', () => {
	it('should return false if the note is to be removed', () => {
		expect(
			isRelNoteToBeIncluded(
				4,
				0,
				[ChordMeta.Omittable],
				[4],
				false,
				() => false
			)
		).toEqual(false);
		expect(
			isRelNoteToBeIncluded(
				5,
				0,
				[ChordMeta.Omittable],
				[1, 3, 5],
				false,
				() => false
			)
		).toEqual(false);
	});
	describe('for the note not to be removed', () => {
		it('should return true if isAllOptionalIncluded is true', () => {
			const isAllOptionalIncluded = true;
			expect(
				isRelNoteToBeIncluded(
					1,
					0,
					[ChordMeta.Required],
					[4],
					isAllOptionalIncluded,
					() => false
				)
			).toEqual(true);
			expect(
				isRelNoteToBeIncluded(
					2,
					1,
					[ChordMeta.Required, ChordMeta.Omittable],
					[],
					isAllOptionalIncluded,
					() => false
				)
			).toEqual(true);
		});
		describe('with isAllOptionalIncluded = false', () => {
			const isAllOptionalIncluded = false;
			it('should return true if the note is not omittable', () => {
				expect(
					isRelNoteToBeIncluded(
						1,
						0,
						[ChordMeta.Root],
						[4],
						isAllOptionalIncluded,
						() => false
					)
				).toEqual(true);
				expect(
					isRelNoteToBeIncluded(
						2,
						0,
						[ChordMeta.Required, ChordMeta.Omittable],
						[],
						isAllOptionalIncluded,
						() => false
					)
				).toEqual(true);
			});
			it.each([false, true])(
				'should return the result of getRandomBoolean [%s] for the omittable note',
				(result) => {
					const dummyGetRandomBoolean = () => result;
					expect(
						isRelNoteToBeIncluded(
							1,
							0,
							[ChordMeta.Omittable],
							[4],
							isAllOptionalIncluded,
							dummyGetRandomBoolean
						)
					).toEqual(result);
					expect(
						isRelNoteToBeIncluded(
							2,
							1,
							[ChordMeta.Required, ChordMeta.Omittable],
							[],
							isAllOptionalIncluded,
							dummyGetRandomBoolean
						)
					).toEqual(result);
				}
			);
		});
	});
});
