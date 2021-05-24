import ChordAppends from '../../../model/ChordAppends';
import ChordMeta from '../../../model/ChordMeta';

import chordAppendsToMeta from './chordAppendsToMeta';

describe('chordAppendsToMeta', () => {
	it("should return 'Required' array for each appends", () => {
		expect(chordAppendsToMeta([ChordAppends.Add9])).toEqual([
			ChordMeta.Required,
		]);
		expect(
			chordAppendsToMeta([ChordAppends.Seventh, ChordAppends.Ninth])
		).toEqual([ChordMeta.Required, ChordMeta.Required]);
	});
	it('should return an empty array for appends = [None]', () => {
		expect(chordAppendsToMeta([ChordAppends.None])).toEqual([]);
	});
});
