import type Chord from '../../model/Chord';
import type { ReadonlyRecursive } from '../../utils/TypeUtils';

export default function isChordSame(
	a: ReadonlyRecursive<Chord>,
	b: ReadonlyRecursive<Chord>
): boolean {
	if (a.root !== b.root) {
		return false;
	}
	if (a.type !== b.type) {
		return false;
	}
	if (a.appends.length !== b.appends.length) {
		return false;
	}
	for (const appendA of a.appends) {
		if (b.appends.some((appendB) => appendB === appendA)) {
			continue;
		}
		return false;
	}
	return true;
}
