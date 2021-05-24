import MESSAGES from '../messages';

import { getChordAppendFormatPattern } from './ChordNamePattern';

export default function concatChordAppendName(
	baseText: string,
	appendName: string,
	isFirst: boolean
): string {
	const formats = MESSAGES.chords.appendFormats;
	const formatPattern = formats[getChordAppendFormatPattern()] ?? formats[0];
	return baseText + formatPattern[isFirst ? 0 : 1].replace(/c/g, appendName);
}
