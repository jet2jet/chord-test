import type TokenData from '../TokenData';

import pickupChordByName from '../pickupChordByName';
import compareToken from './compareToken';

interface SortData {
	readonly t: TokenData;
	readonly i: number | undefined;
}

export default function sortTokens(tokens: readonly TokenData[]): TokenData[] {
	return (
		tokens
			// sort用の情報を持つデータに変換
			.map((t): SortData => ({ t: t, i: pickupChordByName(t.t)?.[1] }))
			// 並び替え
			.sort((a, b) => compareToken(a.t, a.i, b.t, b.i))
			// tokens に対応するデータに変換
			.map((x) => x.t)
	);
}
