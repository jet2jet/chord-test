export default function concatSymbol(
	note: string,
	symbol: string,
	prepend?: boolean | 'de'
): string {
	if (prepend === 'de') {
		if (symbol === 'es') {
			switch (note) {
				case 'E':
					return 'Es';
				case 'A':
					return 'As';
				case 'H':
					return 'B';
			}
		}
		return `${note}${symbol}`;
	}
	return prepend === true ? `${symbol}${note}` : `${note}${symbol}`;
}
