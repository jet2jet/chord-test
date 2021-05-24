import type Chord from '../../../model/Chord';
import type { ReadonlyRecursive } from '../../../utils/TypeUtils';
import type InputChord from './InputChord';
import generateNotes from '../generateNotes';

export default function getExcludedNoteCount(
	targetChord: ReadonlyRecursive<Chord>,
	inputChord: ReadonlyRecursive<InputChord>
): number {
	const targetNotes = generateNotes(targetChord, true, () => true);
	const inputNotes = inputChord.notes;
	const excludedNotes = targetNotes.filter(
		(note) => inputNotes.indexOf(note) < 0
	);
	return excludedNotes.length;
}
