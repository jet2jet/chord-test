import { mocked } from 'ts-jest/utils';
import type DegreeAndRelativeNote from '../../../../model/DegreeAndRelativeNote';
import chordTypeToDegreesAndRelativeNotes from '../../chordTypeToDegreesAndRelativeNotes';
import chordTypeToDegreesAndRelativeNotesWithDegreeUsed from './chordTypeToDegreesAndRelativeNotesWithDegreeUsed';

jest.mock('../../chordTypeToDegreesAndRelativeNotes');

describe('chordTypeToDegreesAndRelativeNotesWithDegreeUsed', () => {
	it('should use chordTypeToDegreesAndRelativeNotes and filter its result with degreeUsed', () => {
		const dummyChordType: any = { __type: 'ChordType' };
		const dummyDegreesAndRelatives: DegreeAndRelativeNote[] = [
			[4, 3],
			[7, 5],
			[10, 7],
		];
		const degreeUsed: Record<number, boolean> = { 5: true };
		const expectedDegreesAndRelatives: DegreeAndRelativeNote[] = [
			[4, 3],
			[10, 7],
		];

		mocked(chordTypeToDegreesAndRelativeNotes).mockReturnValueOnce(
			dummyDegreesAndRelatives
		);

		const r = chordTypeToDegreesAndRelativeNotesWithDegreeUsed(
			dummyChordType,
			degreeUsed
		);
		expect(r).toEqual(expectedDegreesAndRelatives);
		expect(chordTypeToDegreesAndRelativeNotes).toHaveBeenCalledWith(
			dummyChordType
		);
	});
});
