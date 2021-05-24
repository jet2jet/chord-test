import compareDegreesAndRelativeNotes from './compareDegreesAndRelativeNotes';
import sortDegreesAndRelativeNotes from './sortDegreesAndRelativeNotes';

type ArrayWithoutIndex = Omit<any[], number>;

describe('sortDegreesAndRelativeNotes', () => {
	it('should call Array.prototype.sort with compareDegreesAndRelativeNotes', () => {
		const dummyValues: any[] = [{ __type: 'Values' }];
		const dummySortResult: any = { __type: 'SortResult' };
		jest.spyOn(
			Array.prototype as ArrayWithoutIndex,
			'sort'
		).mockImplementation(function (this: any[]) {
			expect(this).toBe(dummyValues);
			return dummySortResult;
		});
		expect(sortDegreesAndRelativeNotes(dummyValues)).toBe(dummySortResult);
		expect(Array.prototype.sort).toHaveBeenCalledWith(
			compareDegreesAndRelativeNotes
		);
	});
});
