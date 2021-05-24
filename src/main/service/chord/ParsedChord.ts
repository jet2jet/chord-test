import type NoteType from '../../model/NoteType';
import type SharpFlatType from '../../model/SharpFlatType';
import type TokenData from './TokenData';

export default interface ParsedChord {
	root: NoteType;
	rootSharpFlat: SharpFlatType;
	tokens: TokenData[];
}
