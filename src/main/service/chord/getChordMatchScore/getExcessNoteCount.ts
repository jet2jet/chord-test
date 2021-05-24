import type Chord from '../../../model/Chord';
import type { ReadonlyRecursive } from '../../../utils/TypeUtils';
import type InputChord from './InputChord';
import generateNotes from '../generateNotes';

export default function getExcessNoteCount(
	targetChord: ReadonlyRecursive<Chord>,
	inputChord: ReadonlyRecursive<InputChord>
): number {
	const targetNotes = generateNotes(targetChord, true, () => true);
	const inputNotes = inputChord.notes;
	const excessNotes = inputNotes.filter(
		(note) => targetNotes.indexOf(note) < 0
	);
	return excessNotes.length;
}
