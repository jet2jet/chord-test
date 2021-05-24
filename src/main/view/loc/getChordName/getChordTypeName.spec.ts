import { mocked } from 'ts-jest/utils';
import ChordType from '../../../model/ChordType';
import { getChordTypeNamePattern } from './ChordNamePattern';
import getChordTypeName from './getChordTypeName';

function getDummyTypeNames0() {
	return ['P', 'Q', 'R', 'S', 'T', 'U', 'V'];
}

function getDummyTypeNames1() {
	return ['0', '1', '2', '3', '4', '5', '6'];
}

jest.mock('../messages', () => ({
	__esModule: true,
	default: {
		chords: {
			typeNames: (() => {
				const names1 = getDummyTypeNames1();
				return getDummyTypeNames0().map((name, i) => [name, names1[i]]);
			})(),
		},
	},
}));
jest.mock('./ChordNamePattern', () => ({
	__esModule: true,
	getChordTypeNamePattern: jest.fn(() => 1),
}));

describe('getChordTypeName', () => {
	it('should return type name from MESSAGES.chords.typeNames[x] if pattern is valid', () => {
		mocked(getChordTypeNamePattern).mockReturnValue(1);
		const dummyTypeNames = getDummyTypeNames1();
		[
			ChordType.Major,
			ChordType.Minor,
			ChordType.Sus4,
			ChordType.Diminish,
			ChordType.Diminish7,
			ChordType.Augment,
			ChordType.Power,
		].forEach((type) => {
			expect(getChordTypeName(type)).toEqual(dummyTypeNames[type]);
			expect(getChordTypeNamePattern).toHaveBeenCalledWith(type);
		});
	});
	it('should return type name from MESSAGES.chords.typeNames[0] if pattern is invalid', () => {
		mocked(getChordTypeNamePattern).mockReturnValue(2);
		const dummyTypeNames = getDummyTypeNames0();
		[
			ChordType.Major,
			ChordType.Minor,
			ChordType.Sus4,
			ChordType.Diminish,
			ChordType.Diminish7,
			ChordType.Augment,
			ChordType.Power,
		].forEach((type) => {
			expect(getChordTypeName(type)).toEqual(dummyTypeNames[type]);
			expect(getChordTypeNamePattern).toHaveBeenCalledWith(type);
		});
	});
});
