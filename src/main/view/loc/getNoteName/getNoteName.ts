import NoteType from '../../../model/NoteType';
import SharpFlatType from '../../../model/SharpFlatType';

import MESSAGES from '../messages';
import concatSymbol from './concatSymbol';

export default function getNoteName(
	note: NoteType,
	sharpFlat: SharpFlatType,
	noteLanguage: number
): string {
	let noteBaseValue: number;
	switch (note) {
		case NoteType.C:
			if (sharpFlat === SharpFlatType.Sharp) {
				noteBaseValue = 6;
			} else {
				sharpFlat = SharpFlatType.Natural;
				noteBaseValue = 0;
			}
			break;
		case NoteType.C_Sharp:
			if (sharpFlat === SharpFlatType.Flat) {
				noteBaseValue = 1;
			} else {
				sharpFlat = SharpFlatType.Sharp;
				noteBaseValue = 0;
			}
			break;
		case NoteType.D:
			sharpFlat = SharpFlatType.Natural;
			noteBaseValue = 1;
			break;
		case NoteType.D_Sharp:
			if (sharpFlat === SharpFlatType.Flat) {
				noteBaseValue = 2;
			} else {
				sharpFlat = SharpFlatType.Sharp;
				noteBaseValue = 1;
			}
			break;
		case NoteType.E:
			if (sharpFlat === SharpFlatType.Flat) {
				noteBaseValue = 3;
			} else {
				sharpFlat = SharpFlatType.Natural;
				noteBaseValue = 2;
			}
			break;
		case NoteType.F:
			if (sharpFlat === SharpFlatType.Sharp) {
				noteBaseValue = 2;
			} else {
				sharpFlat = SharpFlatType.Natural;
				noteBaseValue = 3;
			}
			break;
		case NoteType.F_Sharp:
			if (sharpFlat === SharpFlatType.Flat) {
				noteBaseValue = 4;
			} else {
				sharpFlat = SharpFlatType.Sharp;
				noteBaseValue = 3;
			}
			break;
		case NoteType.G:
			sharpFlat = SharpFlatType.Natural;
			noteBaseValue = 4;
			break;
		case NoteType.G_Sharp:
			if (sharpFlat === SharpFlatType.Flat) {
				noteBaseValue = 5;
			} else {
				sharpFlat = SharpFlatType.Sharp;
				noteBaseValue = 4;
			}
			break;
		case NoteType.A:
			sharpFlat = SharpFlatType.Natural;
			noteBaseValue = 5;
			break;
		case NoteType.A_Sharp:
			if (sharpFlat === SharpFlatType.Flat) {
				noteBaseValue = 6;
			} else {
				sharpFlat = SharpFlatType.Sharp;
				noteBaseValue = 5;
			}
			break;
		case NoteType.B:
			if (sharpFlat === SharpFlatType.Flat) {
				noteBaseValue = 0;
			} else {
				sharpFlat = SharpFlatType.Natural;
				noteBaseValue = 6;
			}
			break;
	}
	const notes = MESSAGES.notes[noteLanguage] ?? MESSAGES.notes[0];
	const noteName = notes[noteBaseValue];
	const symbols = MESSAGES.symbols[noteLanguage] ?? MESSAGES.symbols[0];
	if (sharpFlat === SharpFlatType.Natural) {
		return noteName;
	}
	const sharpFlatIndex = sharpFlat === SharpFlatType.Flat ? 1 : 0;
	return concatSymbol(noteName, symbols[sharpFlatIndex], symbols[2]);
}
