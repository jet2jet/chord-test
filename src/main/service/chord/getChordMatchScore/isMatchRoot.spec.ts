import isMatchRoot from './isMatchRoot';

describe('isMatchRoot', () => {
	const dummyRoot1: any = { __type: 'Root1' };
	const dummyRoot2: any = { __type: 'Root2' };
	it('should return true if roots are the same', () => {
		expect(isMatchRoot({ root: dummyRoot1 }, { root: dummyRoot1 })).toEqual(
			true
		);
	});
	it('should return true if roots are different', () => {
		expect(isMatchRoot({ root: dummyRoot1 }, { root: dummyRoot2 })).toEqual(
			false
		);
	});
});
