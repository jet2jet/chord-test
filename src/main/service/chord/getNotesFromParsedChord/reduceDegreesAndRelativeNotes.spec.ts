import reduceDegreesAndRelativeNotes from './reduceDegreesAndRelativeNotes';

describe('reduceDegreesAndRelativeNotes', () => {
	it('should concatenate arrays and remove duplicate items', () => {
		const r = reduceDegreesAndRelativeNotes([
			[
				[1, 0],
				[5, 7],
			],
			[
				[3, 4],
				[5, 7],
			],
			[[7, 10]],
		]);
		expect(r).toEqual(
			expect.arrayContaining([
				[1, 0],
				[3, 4],
				[5, 7],
				[7, 10],
			])
		);
		expect(r.length).toEqual(4);
	});
});
