import ChordType from '../../../model/ChordType';
import { getChordTypeNamePattern } from './/ChordNamePattern';
import getAllChordTypeNames from './getAllChordTypeNames';

function getDummyTypeNames() {
	return ['0', '1', '2', '3', '4', '5', '6'] as const;
}

jest.mock('../messages', () => ({
	__esModule: true,
	default: {
		chords: { typeNames: getDummyTypeNames().map((name) => ['', name]) },
	},
}));
jest.mock('./ChordNamePattern', () => ({
	__esModule: true,
	getChordTypeNamePattern: jest.fn(() => 1),
}));

describe('getAllChordTypeNames', () => {
	it('should return type name from MESSAGES.chords.typeNames', () => {
		const dummyTypeNames = getDummyTypeNames();
		expect(getAllChordTypeNames()).toEqual(dummyTypeNames);
		expect(getChordTypeNamePattern).toHaveBeenCalledTimes(
			dummyTypeNames.length
		);
		[
			ChordType.Major,
			ChordType.Minor,
			ChordType.Sus4,
			ChordType.Diminish,
			ChordType.Diminish7,
			ChordType.Augment,
			ChordType.Power,
		].forEach((type) => {
			expect(getChordTypeNamePattern).toHaveBeenCalledWith(type);
		});
	});
});
