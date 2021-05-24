import { mocked } from 'ts-jest/utils';

import type Chord from '../../model/Chord';
import type NoteType from '../../model/NoteType';
import type RelativeNoteType from '../../model/RelativeNoteType';

import relativeNoteToAbsoluteNote from '../note/relativeNoteToAbsoluteNote';
import applyChordAppends from './applyChordAppends';
import chordTypeToRelativeNotes from './chordTypeToRelativeNotes';

import chordToNotes from './chordToNotes';

jest.mock('../note/relativeNoteToAbsoluteNote');
jest.mock('./applyChordAppends');
jest.mock('./chordTypeToRelativeNotes');

describe('chordToNotes', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});
	it('should return appropriate note list with root note, notes from chordTypeToRelativeNotes, and notes from applyChordAppends', () => {
		const dummyRootSharpFlat: any = { __type: 'RootSharpFlat' };
		const dummyType: any = { __type: 'Type' };
		const dummyAppends: any = { __type: 'Appends' };
		const dummyChord: Chord = {
			root: 0 as NoteType,
			rootSharpFlat: dummyRootSharpFlat,
			type: dummyType,
			appends: dummyAppends,
		};
		const dummyRelNotes: RelativeNoteType[] = [2, 3, 4];
		const dummyRemovedRelNotes: RelativeNoteType[] = [2, 4];
		const dummyAppendNotes: [
			adds: RelativeNoteType[],
			removes: RelativeNoteType[]
		] = [[11, 12, 13], [3]];
		const expectedReturnValue = [
			// root
			0,
			// chord-type notes
			1,
			3,
			// append notes
			10,
			11,
			12,
		];

		mocked(relativeNoteToAbsoluteNote).mockImplementation(
			(rel) => (rel - 1) as NoteType
		);
		mocked(chordTypeToRelativeNotes).mockReturnValue(dummyRelNotes);
		mocked(applyChordAppends).mockReturnValue(dummyAppendNotes);

		expect(chordToNotes(dummyChord)).toEqual(expectedReturnValue);

		expect(chordTypeToRelativeNotes).toBeCalledWith(dummyType);
		expect(applyChordAppends).toBeCalledWith(dummyRelNotes, dummyAppends);

		expect(relativeNoteToAbsoluteNote).toBeCalledTimes(
			dummyRemovedRelNotes.length + dummyAppendNotes[0].length
		);
		[...dummyRemovedRelNotes, ...dummyAppendNotes[0]].forEach((note) =>
			expect(relativeNoteToAbsoluteNote).toBeCalledWith(
				note,
				dummyChord.root
			)
		);
	});
});
