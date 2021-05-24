export default function volumeToMidiVolume(vol: number): number {
	let midiVol = Math.floor(12800 * vol);
	if (midiVol < 0) {
		midiVol = 0;
	} else if (midiVol > 16383) {
		midiVol = 16383;
	}
	return midiVol;
}
