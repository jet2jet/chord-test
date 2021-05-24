import { mocked } from 'ts-jest/utils';
import ChordAppends from '../../../model/ChordAppends';
import { getChordAppendNamePattern } from './ChordNamePattern';
import getChordAppendName from './getChordAppendName';

function getDummyAppendNames0() {
	return [
		'M',
		'N',
		'O',
		'P',
		'Q',
		'R',
		'S',
		'T',
		'U',
		'V',
		'W',
		'X',
		'Y',
		'Z',
	];
}

function getDummyAppendNames1() {
	return [
		'0',
		'1',
		'2',
		'3',
		'4',
		'5',
		'6',
		'7',
		'8',
		'9',
		'10',
		'11',
		'12',
		'13',
	];
}

jest.mock('../messages', () => ({
	__esModule: true,
	default: {
		chords: {
			appendNames: (() => {
				const names1 = getDummyAppendNames1();
				return getDummyAppendNames0().map((name, i) => [
					name,
					names1[i],
				]);
			})(),
		},
	},
}));
jest.mock('./ChordNamePattern', () => ({
	__esModule: true,
	getChordAppendNamePattern: jest.fn(() => 1),
}));

describe('getChordAppendName', () => {
	if (getDummyAppendNames0().length !== ChordAppends._Level4) {
		throw new Error('Invalid pattern: getDummyAppendNames0');
	}
	if (getDummyAppendNames1().length !== ChordAppends._Level4) {
		throw new Error('Invalid pattern: getDummyAppendNames1');
	}
	it('should return append name from MESSAGES.chords.appendNames[x] if pattern is valid', () => {
		mocked(getChordAppendNamePattern).mockReturnValue(1);
		const dummyAppendNames = getDummyAppendNames1();
		[
			ChordAppends.None,
			ChordAppends.Seventh,
			ChordAppends.Major7,
			ChordAppends.Sixth,
			ChordAppends.Ninth,
			ChordAppends.Add9,
			ChordAppends.Flat5,
			ChordAppends.Sharp5,
			ChordAppends.Flat9,
			ChordAppends.Sharp9,
			ChordAppends.Eleventh,
			ChordAppends.Sharp11,
			ChordAppends.Thirteenth,
			ChordAppends.Flat13,
		].forEach((append) => {
			expect(getChordAppendName(append)).toEqual(
				dummyAppendNames[append]
			);
			expect(getChordAppendNamePattern).toHaveBeenCalledWith(append);
		});
	});
	it('should return append name from MESSAGES.chords.appendNames[0] if pattern is invalid', () => {
		mocked(getChordAppendNamePattern).mockReturnValue(2);
		const dummyAppendNames = getDummyAppendNames0();
		[
			ChordAppends.Seventh,
			ChordAppends.Major7,
			ChordAppends.Sixth,
			ChordAppends.Ninth,
			ChordAppends.Add9,
			ChordAppends.Flat5,
			ChordAppends.Sharp5,
			ChordAppends.Flat9,
			ChordAppends.Sharp9,
			ChordAppends.Eleventh,
			ChordAppends.Sharp11,
			ChordAppends.Thirteenth,
			ChordAppends.Flat13,
		].forEach((append) => {
			expect(getChordAppendName(append)).toEqual(
				dummyAppendNames[append]
			);
			expect(getChordAppendNamePattern).toHaveBeenCalledWith(append);
		});
	});
});
