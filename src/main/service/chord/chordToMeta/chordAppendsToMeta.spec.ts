import ChordAppends from '../../../model/ChordAppends';
import ChordMeta from '../../../model/ChordMeta';

import chordAppendsToMeta from './chordAppendsToMeta';

describe('chordAppendsToMeta', () => {
	const dummyTypeMeta: ChordMeta[] = [
		ChordMeta.Required,
		ChordMeta.Omittable,
	];
	let dummyTypeMetaTarget: ChordMeta[];
	beforeEach(() => {
		dummyTypeMetaTarget = dummyTypeMeta.slice();
	});
	it("should return 'Required' array for each appends (one item)", () => {
		expect(
			chordAppendsToMeta(dummyTypeMetaTarget, [ChordAppends.Add9])
		).toEqual([ChordMeta.Required]);
		// not changed
		expect(dummyTypeMetaTarget).toEqual(dummyTypeMeta);
	});
	it("should return 'Required' array for each appends (two items)", () => {
		expect(
			chordAppendsToMeta(dummyTypeMetaTarget, [
				ChordAppends.Seventh,
				ChordAppends.Ninth,
			])
		).toEqual([ChordMeta.Required, ChordMeta.Required]);
		// not changed
		expect(dummyTypeMetaTarget).toEqual(dummyTypeMeta);
	});
	it("should return 'Required' array for Sharp11 append, and rewrite base meta", () => {
		expect(
			chordAppendsToMeta(dummyTypeMetaTarget, [
				ChordAppends.Ninth,
				ChordAppends.Sharp11,
			])
		).toEqual([ChordMeta.Required, ChordMeta.Required]);
		// changed
		expect(dummyTypeMetaTarget).toEqual([
			...dummyTypeMeta.slice(0, 1),
			ChordMeta.Required,
		]);
	});
	it('should return an empty array for appends = [None]', () => {
		expect(
			chordAppendsToMeta(dummyTypeMetaTarget, [ChordAppends.None])
		).toEqual([]);
		// not changed
		expect(dummyTypeMetaTarget).toEqual(dummyTypeMeta);
	});
});
