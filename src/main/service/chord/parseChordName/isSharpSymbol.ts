export default function isSharpSymbol(s: string): boolean {
	return s === '＃' || s === '♯' || s === '#' || s === '+';
}
