import type ChordAppends from '../../../model/ChordAppends';

import MESSAGES from '../messages';
import { getChordAppendNamePattern } from './ChordNamePattern';

export default function getChordAppendName(append: ChordAppends): string {
	const appendNames = MESSAGES.chords.appendNames[append];
	return appendNames[getChordAppendNamePattern(append)] ?? appendNames[0];
}
