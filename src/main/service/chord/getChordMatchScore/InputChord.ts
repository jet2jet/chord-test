import type NoteType from '../../../model/NoteType';

export default interface InputChord {
	root: NoteType;
	/** root note must be included in notes */
	notes: NoteType[];
}
