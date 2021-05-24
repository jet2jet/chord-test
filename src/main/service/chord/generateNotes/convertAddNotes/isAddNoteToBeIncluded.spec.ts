import ChordMeta from '../../../../model/ChordMeta';
import isAddNoteToBeIncluded from './isAddNoteToBeIncluded';

describe('isAddNoteToBeIncluded', () => {
	it('should return true if isAllOptionalIncluded is true', () => {
		const isAllOptionalIncluded = true;
		expect(
			isAddNoteToBeIncluded(
				0,
				[ChordMeta.Root, ChordMeta.Omittable],
				isAllOptionalIncluded
			)
		).toEqual(true);
		expect(
			isAddNoteToBeIncluded(
				1,
				[ChordMeta.Root, ChordMeta.Omittable],
				isAllOptionalIncluded
			)
		).toEqual(true);
	});
	describe('with isAllOptionalIncluded = false', () => {
		const isAllOptionalIncluded = false;
		it('should return true if the note is not omittable', () => {
			expect(
				isAddNoteToBeIncluded(
					0,
					[ChordMeta.Root, ChordMeta.Omittable],
					isAllOptionalIncluded
				)
			).toEqual(true);
			expect(
				isAddNoteToBeIncluded(
					1,
					[ChordMeta.Root, ChordMeta.Required],
					isAllOptionalIncluded
				)
			).toEqual(true);
		});
		it('should return false if the note is omittable', () => {
			expect(
				isAddNoteToBeIncluded(
					1,
					[ChordMeta.Root, ChordMeta.Omittable],
					isAllOptionalIncluded
				)
			).toEqual(false);
		});
	});
});
