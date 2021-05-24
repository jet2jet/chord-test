export default interface PlayerBase {
	volume: number;
	rootVolume: number;
	play: (
		midiNote: number,
		durationSeconds: number,
		isRootNote: boolean,
		onStop?: () => void
	) => void;
	stopAll: () => void;
}
