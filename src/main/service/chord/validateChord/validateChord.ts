import type Chord from '../../../model/Chord';
import validateChordAppends from './validateChordAppends';
import validateChordType from './validateChordType';

export default function validateChord(chord: Chord): void {
	validateChordType(chord.type, chord.appends);
	validateChordAppends(chord.appends);
}
