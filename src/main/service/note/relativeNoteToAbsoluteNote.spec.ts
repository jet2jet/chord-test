import NoteType from '../../model/NoteType';

import relativeNoteToAbsoluteNote from './relativeNoteToAbsoluteNote';

describe('relativeNoteToAbsoluteNote', () => {
	it('should convert from relative to absolute', () => {
		expect(relativeNoteToAbsoluteNote(0, NoteType.C)).toEqual(NoteType.C);
		expect(relativeNoteToAbsoluteNote(1, NoteType.C)).toEqual(
			NoteType.C_Sharp
		);
		expect(relativeNoteToAbsoluteNote(2, NoteType.C)).toEqual(NoteType.D);
		expect(relativeNoteToAbsoluteNote(-1, NoteType.C)).toEqual(NoteType.B);
		expect(relativeNoteToAbsoluteNote(12, NoteType.C)).toEqual(NoteType.C);

		expect(relativeNoteToAbsoluteNote(2, NoteType.D)).toEqual(NoteType.E);
		expect(relativeNoteToAbsoluteNote(14, NoteType.D)).toEqual(NoteType.E);
		expect(relativeNoteToAbsoluteNote(-10, NoteType.D)).toEqual(NoteType.E);
	});
});
