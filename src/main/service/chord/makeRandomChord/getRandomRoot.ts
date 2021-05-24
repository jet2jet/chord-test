import NoteType from '../../../model/NoteType';
import SharpFlatType from '../../../model/SharpFlatType';

export default function getRandomRoot(
	level: number,
	getRandom: () => number
): [note: NoteType, sharpFlat: SharpFlatType] {
	const noteBaseVal = Math.floor(getRandom() * 7);
	let sharpFlat = (Math.floor(getRandom() * 3) - 1) as SharpFlatType;
	const sharpFlat2 = Math.floor(getRandom() * 2);
	if (level === 0) {
		sharpFlat = SharpFlatType.Natural;
	}
	switch (noteBaseVal) {
		/* istanbul ignore next */
		default:
			throw new Error('Unexpected');
		case 0:
			if (level >= 3 && sharpFlat === SharpFlatType.Flat) {
				return [NoteType.B, SharpFlatType.Flat];
			} else if (sharpFlat2 !== 0) {
				return [NoteType.C_Sharp, SharpFlatType.Sharp];
			} else {
				return [NoteType.C, SharpFlatType.Natural];
			}
		case 1:
			if (sharpFlat === SharpFlatType.Flat) {
				return [NoteType.D_Flat, SharpFlatType.Flat];
			} else if (sharpFlat === SharpFlatType.Sharp) {
				return [NoteType.D_Sharp, SharpFlatType.Sharp];
			} else {
				return [NoteType.D, SharpFlatType.Natural];
			}
		case 2:
			if (level >= 3 && sharpFlat === SharpFlatType.Sharp) {
				return [NoteType.F, SharpFlatType.Sharp];
			} else if (sharpFlat2 !== 0) {
				return [NoteType.E_Flat, SharpFlatType.Flat];
			} else {
				return [NoteType.E, SharpFlatType.Natural];
			}
		case 3:
			if (level >= 3 && sharpFlat === SharpFlatType.Flat) {
				return [NoteType.E, SharpFlatType.Flat];
			} else if (sharpFlat2 !== 0) {
				return [NoteType.F_Sharp, SharpFlatType.Sharp];
			} else {
				return [NoteType.F, SharpFlatType.Natural];
			}
		case 4:
			if (sharpFlat === SharpFlatType.Flat) {
				return [NoteType.G_Flat, SharpFlatType.Flat];
			} else if (sharpFlat === SharpFlatType.Sharp) {
				return [NoteType.G_Sharp, SharpFlatType.Sharp];
			} else {
				return [NoteType.G, SharpFlatType.Natural];
			}
		case 5:
			if (sharpFlat === SharpFlatType.Flat) {
				return [NoteType.A_Flat, SharpFlatType.Flat];
			} else if (sharpFlat === SharpFlatType.Sharp) {
				return [NoteType.A_Sharp, SharpFlatType.Sharp];
			} else {
				return [NoteType.A, SharpFlatType.Natural];
			}
		case 6:
			if (level >= 3 && sharpFlat === SharpFlatType.Sharp) {
				return [NoteType.C, SharpFlatType.Sharp];
			} else if (sharpFlat2 !== 0) {
				return [NoteType.B_Flat, SharpFlatType.Flat];
			} else {
				return [NoteType.B, SharpFlatType.Natural];
			}
	}
}
