import type ChordType from '../../../model/ChordType';
import MESSAGES from '../messages';
import { getChordTypeNamePattern } from './ChordNamePattern';

export default function getAllChordTypeNames(): string[] {
	const typeNames = MESSAGES.chords.typeNames;
	return Object.keys(typeNames).map((type) => {
		const t = Number(type) as ChordType;
		return typeNames[t][getChordTypeNamePattern(t)];
	});
}
