import type NoteType from '../../../model/NoteType';

export default function noteToMidiNote(note: NoteType, lowest: number): number {
	let noteVal: number = note;
	while (noteVal < lowest) {
		noteVal += 12;
	}
	return noteVal;
}
