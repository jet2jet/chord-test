import isChordSame from './isChordSame';

describe('isChordSame', () => {
	const dummyRoot: any = { __type: 'Root' };
	const dummyRootAnother: any = { __type: 'RootAnother' };
	const dummyRootSharpFlat: any = { __type: 'RootSharpFlat' };
	const dummyRootSharpFlatAnother: any = { __type: 'RootSharpFlatAnother' };
	const dummyType: any = { __type: 'Type' };
	const dummyTypeAnother: any = { __type: 'TypeAnother' };
	const dummyAppend1: any = { __type: 'Append1' };
	const dummyAppend2: any = { __type: 'Append2' };
	const dummyAppend3: any = { __type: 'Append3' };
	const dummyAppends = [dummyAppend1, dummyAppend2, dummyAppend3];

	it('should return false if root is different', () => {
		expect(
			isChordSame(
				{
					root: dummyRoot,
					rootSharpFlat: dummyRootSharpFlat,
					type: dummyType,
					appends: dummyAppends,
				},
				{
					root: dummyRootAnother,
					rootSharpFlat: dummyRootSharpFlat,
					type: dummyType,
					appends: dummyAppends,
				}
			)
		).toBe(false);
	});
	it('should return false if type is different', () => {
		expect(
			isChordSame(
				{
					root: dummyRoot,
					rootSharpFlat: dummyRootSharpFlat,
					type: dummyType,
					appends: dummyAppends,
				},
				{
					root: dummyRoot,
					rootSharpFlat: dummyRootSharpFlat,
					type: dummyTypeAnother,
					appends: dummyAppends,
				}
			)
		).toBe(false);
	});
	it('should return false if append count is not match', () => {
		expect(
			isChordSame(
				{
					root: dummyRoot,
					rootSharpFlat: dummyRootSharpFlat,
					type: dummyType,
					appends: [dummyAppend1],
				},
				{
					root: dummyRoot,
					rootSharpFlat: dummyRootSharpFlat,
					type: dummyTypeAnother,
					appends: [dummyAppend1, dummyAppend1],
				}
			)
		).toBe(false);
	});
	it('should return false if append is not match', () => {
		expect(
			isChordSame(
				{
					root: dummyRoot,
					rootSharpFlat: dummyRootSharpFlat,
					type: dummyType,
					appends: [dummyAppend1, dummyAppend2],
				},
				{
					root: dummyRoot,
					rootSharpFlat: dummyRootSharpFlat,
					type: dummyTypeAnother,
					appends: [dummyAppend1, dummyAppend3],
				}
			)
		).toBe(false);
		expect(
			isChordSame(
				{
					root: dummyRoot,
					rootSharpFlat: dummyRootSharpFlat,
					type: dummyType,
					appends: [dummyAppend2, dummyAppend3],
				},
				{
					root: dummyRoot,
					rootSharpFlat: dummyRootSharpFlat,
					type: dummyTypeAnother,
					appends: [dummyAppend1, dummyAppend3],
				}
			)
		).toBe(false);
		expect(
			isChordSame(
				{
					root: dummyRoot,
					rootSharpFlat: dummyRootSharpFlat,
					type: dummyType,
					appends: [dummyAppend2, dummyAppend1],
				},
				{
					root: dummyRoot,
					rootSharpFlat: dummyRootSharpFlat,
					type: dummyTypeAnother,
					appends: [dummyAppend3, dummyAppend2],
				}
			)
		).toBe(false);
	});
	it('should return true if all is match', () => {
		expect(
			isChordSame(
				{
					root: dummyRoot,
					rootSharpFlat: dummyRootSharpFlat,
					type: dummyType,
					appends: [dummyAppend1, dummyAppend2],
				},
				{
					root: dummyRoot,
					rootSharpFlat: dummyRootSharpFlat,
					type: dummyType,
					appends: [dummyAppend1, dummyAppend2],
				}
			)
		).toBe(true);
		expect(
			isChordSame(
				{
					root: dummyRoot,
					rootSharpFlat: dummyRootSharpFlat,
					type: dummyType,
					appends: [dummyAppend2, dummyAppend3],
				},
				{
					root: dummyRoot,
					rootSharpFlat: dummyRootSharpFlat,
					type: dummyType,
					appends: [dummyAppend3, dummyAppend2],
				}
			)
		).toBe(true);
		expect(
			isChordSame(
				{
					root: dummyRoot,
					rootSharpFlat: dummyRootSharpFlat,
					type: dummyType,
					appends: [dummyAppend3, dummyAppend2],
				},
				{
					root: dummyRoot,
					rootSharpFlat: dummyRootSharpFlatAnother,
					type: dummyType,
					appends: [dummyAppend3, dummyAppend2],
				}
			)
		).toBe(true);
	});
});
