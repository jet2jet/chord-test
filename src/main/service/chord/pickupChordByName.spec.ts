import ALL_CHORDS from '../../data/ALL_CHORDS';
import type ChordListItem from '../../model/ChordListItem';
import pickupChordByName from './pickupChordByName';

describe('pickupChordByName', () => {
	it("should return null if name is '9'", () => {
		expect(pickupChordByName('9')).toBeNull();
	});
	it.each(
		ALL_CHORDS.map(
			(item, chordIndex) => [item[2], chordIndex, item] as const
		).reduce<
			Array<[name: string, chordIndex: number, chordItem: ChordListItem]>
		>((prev, [names, chordIndex, item]) => {
			return prev.concat(
				names
					// exclude '9'
					.filter((name) => name !== '9')
					.map((name) => [name, chordIndex, item])
			);
		}, [])
	)(
		"should return appropriate chord data for name '%s', index = %s",
		(name, chordIndex, chordItem) => {
			const actual = pickupChordByName(name);
			expect(actual).not.toBeNull();
			if (actual === null) {
				throw new Error('Fail');
			}
			// use 'toBe' instead of 'toEqual'
			expect(actual[0]).toBe(chordItem);
			expect(actual[1]).toEqual(chordIndex);
		}
	);
	it('should return null if name is not found', () => {
		for (const unknownName of ['hoge', '4', 'alt']) {
			expect(pickupChordByName(unknownName)).toBeNull();
		}
	});
});
