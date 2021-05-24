export default function midiNoteToHertz(midiNote: number): number {
	return 220 * Math.pow(2, (midiNote - 57) / 12);
}
