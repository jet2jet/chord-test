import type Chord from '../../../model/Chord';
import type { ReadonlyRecursive } from '../../../utils/TypeUtils';

export default function isMatchRoot(
	chord1: ReadonlyRecursive<Pick<Chord, 'root'>>,
	chord2: ReadonlyRecursive<Pick<Chord, 'root'>>
): boolean {
	return chord1.root === chord2.root;
}
