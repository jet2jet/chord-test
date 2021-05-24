import type ChordType from '../../../model/ChordType';

import MESSAGES from '../messages';
import { getChordTypeNamePattern } from './ChordNamePattern';

export default function getChordTypeName(chordType: ChordType): string {
	const typeNames = MESSAGES.chords.typeNames[chordType];
	return typeNames[getChordTypeNamePattern(chordType)] ?? typeNames[0];
}
