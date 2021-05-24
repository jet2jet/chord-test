import type DegreeAndRelativeNote from '../../../../model/DegreeAndRelativeNote';

import degreeToRelativeBaseNote from '../../degreeToRelativeBaseNote';

export default function degreeTokenToDegreeAndRelativeNote(
	token: string
): DegreeAndRelativeNote | null {
	let sharpFlat = 0;
	let x = token;
	if (x[0] === '+') {
		sharpFlat = 1;
		x = x.substring(1);
	} else if (x[0] === '-') {
		sharpFlat = -1;
		x = x.substring(1);
	}
	// 0 is not allowed
	if (!/^[1-9][0-9]*$/.test(x)) {
		return null;
	}
	const deg = parseInt(x, 10);
	if (deg > 14) {
		return null;
	}
	const relBase = degreeToRelativeBaseNote(deg);
	if (deg === 7) {
		--sharpFlat;
	}
	return [deg, (relBase as number) + sharpFlat];
}
