const wideAlphabetsUpper =
	'ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ';
const wideAlphabetsLower =
	'ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ';
const wideAlphabetsUpperRegExp = new RegExp(
	`(?:${wideAlphabetsUpper.split('').join('|')})`,
	'g'
);
const wideAlphabetsLowerRegExp = new RegExp(
	`(?:${wideAlphabetsLower.split('').join('|')})`,
	'g'
);

export default function normalizeInput(input: string): string {
	return (
		input
			// eslint-disable-next-line no-irregular-whitespace
			.replace(/　/gm, ' ')
			.replace(/[\r\n\t ]+/gm, ' ')
			.trim()
			.replace(/（/g, '(')
			.replace(/）/g, ')')
			.replace(wideAlphabetsUpperRegExp, (s) =>
				String.fromCharCode(65 + wideAlphabetsUpper.indexOf(s))
			)
			.replace(wideAlphabetsLowerRegExp, (s) =>
				String.fromCharCode(97 + wideAlphabetsLower.indexOf(s))
			)
	);
}
