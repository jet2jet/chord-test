import { mocked } from 'ts-jest/utils';
import NoteType from '../../../model/NoteType';
import notesToMidiNotes from './notesToMidiNotes';
import noteToMidiNote from './noteToMidiNote';

jest.mock('./noteToMidiNote');

describe('notesToMidiNotes', () => {
	it('should use noteToMidiNote', () => {
		mocked(noteToMidiNote).mockImplementation((v) => v + 1000);

		const input = [NoteType.E, NoteType.G_Sharp, NoteType.D];
		expect(notesToMidiNotes(input, 48)).toEqual([
			NoteType.E + 1000,
			NoteType.G_Sharp + 1000,
			NoteType.D + 1000,
		]);
		expect(noteToMidiNote).toHaveBeenCalledTimes(3);
		expect(noteToMidiNote).toHaveBeenCalledWith(NoteType.E, 48);
		expect(noteToMidiNote).toHaveBeenCalledWith(NoteType.G_Sharp, 48);
		expect(noteToMidiNote).toHaveBeenCalledWith(NoteType.D, 48);
	});
});
