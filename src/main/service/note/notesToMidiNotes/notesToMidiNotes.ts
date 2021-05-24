import type NoteType from '../../../model/NoteType';
import noteToMidiNote from './noteToMidiNote';

export default function notesToMidiNotes(
	notes: readonly NoteType[],
	lowest: number
): number[] {
	return notes.map((n) => noteToMidiNote(n, lowest));
}
