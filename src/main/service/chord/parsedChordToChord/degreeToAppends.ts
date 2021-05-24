import ChordAppends from '../../../model/ChordAppends';
import isFlatSymbol from '../parseChordName/isFlatSymbol';
import isSharpSymbol from '../parseChordName/isSharpSymbol';

export default function degreeToAppends(
	degreeString: string
): ChordAppends | null {
	const firstChar = degreeString[0];
	let sharpFlatFlag: -1 | 0 | 1 = 0;
	if (isSharpSymbol(firstChar)) {
		sharpFlatFlag = 1;
		degreeString = degreeString.substring(1);
	} else if (isFlatSymbol(firstChar)) {
		sharpFlatFlag = -1;
		degreeString = degreeString.substring(1);
	}

	switch (degreeString) {
		case '5':
			return sharpFlatFlag === -1
				? ChordAppends.Flat5
				: sharpFlatFlag === 1
				? ChordAppends.Sharp5
				: null;
		case '6':
			return sharpFlatFlag === 0 ? ChordAppends.Sixth : null;
		case '7':
			return sharpFlatFlag === 0 ? ChordAppends.Seventh : null;
		case '9':
			return sharpFlatFlag === -1
				? ChordAppends.Flat9
				: sharpFlatFlag === 1
				? ChordAppends.Sharp9
				: ChordAppends.Ninth;
		case '11':
			return sharpFlatFlag === -1
				? null
				: sharpFlatFlag === 1
				? ChordAppends.Sharp11
				: ChordAppends.Eleventh;
		case '13':
			return sharpFlatFlag === -1
				? ChordAppends.Flat13
				: sharpFlatFlag === 1
				? null
				: ChordAppends.Thirteenth;
		default:
			return null;
	}
}
