import ChordAppends from '../../../model/ChordAppends';
import adjustForNinthAppend from './adjustForNinthAppend';

describe('adjustForNinthAppend', () => {
	describe('for not ninth', () => {
		it('should return null if the added append is not Ninth, Flat9, or Sharp9', () => {
			const dummyArray = [ChordAppends.Eleventh];
			const dummyArray2 = dummyArray.slice();
			expect(
				adjustForNinthAppend(dummyArray2, ChordAppends.Eleventh)
			).toBeNull();
			expect(dummyArray2).toEqual(dummyArray);
		});
	});
	describe.each([
		ChordAppends.Ninth,
		ChordAppends.Flat9,
		ChordAppends.Sharp9,
	])('for chord %s', (ninth) => {
		it('should return null if the target appends already contains Seventh or Major7', () => {
			const dummyArray = [ChordAppends.Seventh, ninth];
			const dummyArray2 = dummyArray.slice();
			expect(adjustForNinthAppend(dummyArray2, ninth)).toBeNull();
			expect(dummyArray2).toEqual(dummyArray);

			const dummyArray3 = [ChordAppends.Major7, ninth];
			const dummyArray4 = dummyArray3.slice();
			expect(adjustForNinthAppend(dummyArray4, ninth)).toBeNull();
			expect(dummyArray4).toEqual(dummyArray3);
		});
		it('should return Seventh if the target appends does not contain both Seventh and Major7', () => {
			const dummyArray = [ChordAppends.Eleventh, ninth];
			const dummyArray2 = dummyArray.slice();
			expect(adjustForNinthAppend(dummyArray2, ninth)).toEqual(
				ChordAppends.Seventh
			);
			expect(dummyArray2).toEqual(
				dummyArray.concat(ChordAppends.Seventh)
			);
		});
	});
});
