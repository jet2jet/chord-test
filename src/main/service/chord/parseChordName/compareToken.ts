import type TokenData from '../TokenData';

import isFlatSymbol from './isFlatSymbol';
import isSharpSymbol from './isSharpSymbol';

export default function compareToken(
	tokenA: Readonly<TokenData>,
	chordIndexA: number | undefined,
	tokenB: Readonly<TokenData>,
	chordIndexB: number | undefined
): number {
	if (chordIndexA !== undefined && chordIndexB !== undefined) {
		return chordIndexA - chordIndexB;
	} else if (chordIndexA !== undefined) {
		return -1;
	} else if (chordIndexB !== undefined) {
		return 1;
	}
	const aToken = tokenA.t;
	const bToken = tokenB.t;
	// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
	const aNum = parseInt(aToken.replace(/[^0-9]/g, '') || '0', 10);
	// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
	const bNum = parseInt(bToken.replace(/[^0-9]/g, '') || '0', 10);
	if (aNum !== bNum) {
		return aNum - bNum;
	}
	const aIsFlat = isFlatSymbol(aToken[0]);
	const bIsFlat = isFlatSymbol(bToken[0]);
	const aIsSharp = isSharpSymbol(aToken[0]);
	const bIsSharp = isSharpSymbol(bToken[0]);
	if (aIsFlat) {
		return bIsFlat ? 0 : -1;
	} else if (bIsFlat) {
		return 1;
	} else if (aIsSharp) {
		return bIsSharp ? 0 : 1;
	} else if (bIsSharp) {
		return -1;
	} else {
		return 0;
	}
}
