import type ChordAppends from '../../../model/ChordAppends';

import concatChordAppendName from './concatChordAppendName';
import getChordAppendName from './getChordAppendName';

export default function addChordAppendNames(
	baseText: string,
	appends: readonly ChordAppends[],
	isFirst: boolean
): string {
	for (const append of appends) {
		baseText = concatChordAppendName(
			baseText,
			getChordAppendName(append),
			isFirst
		);
		isFirst = false;
	}
	return baseText;
}
