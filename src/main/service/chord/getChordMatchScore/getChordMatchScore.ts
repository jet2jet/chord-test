import type Chord from '../../../model/Chord';
import type { ReadonlyRecursive } from '../../../utils/TypeUtils';
import type InputChord from './InputChord';
import getExcessNoteCount from './getExcessNoteCount';
import getExcludedNoteCount from './getExcludedNoteCount';
import getExcludedRequiredNoteCount from './getExcludedRequiredNoteCount';

import isMatchRoot from './isMatchRoot';

/**
 * @return 100 for max score, 0 for min score
 */
export default function getChordMatchScore(
	targetChord: ReadonlyRecursive<Chord>,
	inputChord: ReadonlyRecursive<InputChord>
): number {
	let currentScore = 100;
	const excludedRequired = getExcludedRequiredNoteCount(
		targetChord,
		inputChord
	);
	currentScore -= excludedRequired * 20;
	const excluded = getExcludedNoteCount(targetChord, inputChord);
	currentScore -= excluded * 5;
	const excess = getExcessNoteCount(targetChord, inputChord);
	currentScore -= excess * 30;
	if (!isMatchRoot(targetChord, inputChord)) {
		currentScore -= 30;
	}
	if (currentScore < 0) {
		return 0;
	}
	return currentScore;
}
