import NoteType from '../../../model/NoteType';
import noteToMidiNote from './noteToMidiNote';

describe('noteToMidiNote', () => {
	it('should return the value with the lowest value', () => {
		expect(noteToMidiNote(NoteType.C, 60)).toEqual(60);
		expect(noteToMidiNote(NoteType.C, 61)).toEqual(72);
		expect(noteToMidiNote(NoteType.B, 59)).toEqual(59);
		expect(noteToMidiNote(NoteType.B, 60)).toEqual(71);
	});
});
