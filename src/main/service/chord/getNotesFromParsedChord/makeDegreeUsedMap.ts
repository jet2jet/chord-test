import type TokenData from '../TokenData';
import degreeToRelativeBaseNote from '../degreeToRelativeBaseNote';

export default function makeDegreeUsedMap(
	tokens: readonly TokenData[]
): Record<number, boolean> {
	return tokens.reduce((p: Record<number, boolean>, c) => {
		if (c.d !== undefined) {
			p[degreeToRelativeBaseNote(c.d)] = true;
		}
		return p;
	}, {});
}
