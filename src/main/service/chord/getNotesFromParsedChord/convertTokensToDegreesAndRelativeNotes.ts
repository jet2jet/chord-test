import type DegreeAndRelativeNote from '../../../model/DegreeAndRelativeNote';
import type TokenData from '../TokenData';

import convertTokenToDegreesAndRelativeNotes from './convertTokenToDegreesAndRelativeNotes';
import makeDegreeUsedMap from './makeDegreeUsedMap';

export default function convertTokensToDegreesAndRelativeNotes(
	tokens: readonly TokenData[]
): DegreeAndRelativeNote[][] {
	const degreeUsed = makeDegreeUsedMap(tokens);
	return tokens.map((token) =>
		convertTokenToDegreesAndRelativeNotes(token, degreeUsed)
	);
}
