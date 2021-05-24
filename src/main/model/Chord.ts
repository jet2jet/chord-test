import type ChordType from './ChordType';
import type ChordAppends from './ChordAppends';
import type NoteType from './NoteType';
import type SharpFlatType from './SharpFlatType';

export default interface Chord {
	root: NoteType;
	rootSharpFlat: SharpFlatType;
	type: ChordType;
	appends: ChordAppends[];
}
