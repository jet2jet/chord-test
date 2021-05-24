import type Chord from '../../model/Chord';
import getRandomBoolean from '../../utils/getRandomBoolean';
import { generateNotes } from '../chord';
import { notesToMidiNotes } from '../note';
import type PlayerBase from './PlayerBase';

// eslint-disable-next-line @typescript-eslint/promise-function-async
export default function playChord(
	player: PlayerBase,
	chord: Chord,
	isAllOptionalIncluded: boolean,
	lowestRootValue: number,
	lowestChordValue: number,
	durationSeconds: number
): Promise<void> {
	const notes = generateNotes(chord, isAllOptionalIncluded, getRandomBoolean);
	const allPromises: Array<Promise<void>> = [];
	for (const midiNote of notesToMidiNotes([notes[0]], lowestRootValue)) {
		allPromises.push(
			new Promise((resolve) => {
				player.play(midiNote, durationSeconds, true, resolve);
			})
		);
	}
	for (const midiNote of notesToMidiNotes(notes, lowestChordValue)) {
		allPromises.push(
			new Promise((resolve) => {
				player.play(midiNote, durationSeconds, false, resolve);
			})
		);
	}
	// eslint-disable-next-line @typescript-eslint/no-floating-promises
	return Promise.all(allPromises).then(() => {
		// do nothing
	});
}
