import { mocked } from 'ts-jest/utils';
import NoteType from '../../../model/NoteType';
import SharpFlatType from '../../../model/SharpFlatType';
import concatSymbol from './concatSymbol';
import getNoteName from './getNoteName';

function getDummyNoteName0() {
	return ['0', '1', '2', '3', '4', '5', '6'] as const;
}
function getDummyNoteName1() {
	return ['P', 'Q', 'R', 'S', 'T', 'U', 'V'] as const;
}
function getDummySymbols0() {
	return ['$', '%', { __type: 'PrependValue1' }] as const;
}
function getDummySymbols1() {
	return ['X', 'Y', { __type: 'PrependValue2' }] as const;
}

const NOTE_C = 0;
const NOTE_D = 1;
const NOTE_E = 2;
const NOTE_F = 3;
const NOTE_G = 4;
const NOTE_A = 5;
const NOTE_B = 6;

const SYMBOL_SHARP = 0;
const SYMBOL_FLAT = 1;

jest.mock('../messages', () => {
	return {
		__esModule: true,
		default: {
			notes: [getDummyNoteName0(), getDummyNoteName1()],
			symbols: [getDummySymbols0(), getDummySymbols1()],
		},
	};
});
jest.mock('./concatSymbol');

const dummyConcatSymbolResult: any = { __type: 'ConcatSymbolResult' };

type ExpectedNoteNameNoConcat = [NoteType, SharpFlatType, number, null, null];
type ExpectedNoteNameWithConcat = [
	NoteType,
	SharpFlatType,
	null,
	number,
	number
];
type ExpectedNoteName = ExpectedNoteNameNoConcat | ExpectedNoteNameWithConcat;

const noteNameCases: ExpectedNoteName[] = [
	[NoteType.C, SharpFlatType.Flat, NOTE_C, null, null],
	[NoteType.C, SharpFlatType.Natural, NOTE_C, null, null],
	[NoteType.C, SharpFlatType.Sharp, null, NOTE_B, SYMBOL_SHARP],
	[NoteType.C_Sharp, SharpFlatType.Flat, null, NOTE_D, SYMBOL_FLAT],
	[NoteType.C_Sharp, SharpFlatType.Natural, null, NOTE_C, SYMBOL_SHARP],
	[NoteType.C_Sharp, SharpFlatType.Sharp, null, NOTE_C, SYMBOL_SHARP],
	[NoteType.D, SharpFlatType.Flat, NOTE_D, null, null],
	[NoteType.D, SharpFlatType.Natural, NOTE_D, null, null],
	[NoteType.D, SharpFlatType.Sharp, NOTE_D, null, null],
	[NoteType.D_Sharp, SharpFlatType.Flat, null, NOTE_E, SYMBOL_FLAT],
	[NoteType.D_Sharp, SharpFlatType.Natural, null, NOTE_D, SYMBOL_SHARP],
	[NoteType.D_Sharp, SharpFlatType.Sharp, null, NOTE_D, SYMBOL_SHARP],
	[NoteType.E, SharpFlatType.Flat, null, NOTE_F, SYMBOL_FLAT],
	[NoteType.E, SharpFlatType.Natural, NOTE_E, null, null],
	[NoteType.E, SharpFlatType.Sharp, NOTE_E, null, null],
	[NoteType.F, SharpFlatType.Flat, NOTE_F, null, null],
	[NoteType.F, SharpFlatType.Natural, NOTE_F, null, null],
	[NoteType.F, SharpFlatType.Sharp, null, NOTE_E, SYMBOL_SHARP],
	[NoteType.F_Sharp, SharpFlatType.Flat, null, NOTE_G, SYMBOL_FLAT],
	[NoteType.F_Sharp, SharpFlatType.Natural, null, NOTE_F, SYMBOL_SHARP],
	[NoteType.F_Sharp, SharpFlatType.Sharp, null, NOTE_F, SYMBOL_SHARP],
	[NoteType.G, SharpFlatType.Flat, NOTE_G, null, null],
	[NoteType.G, SharpFlatType.Natural, NOTE_G, null, null],
	[NoteType.G, SharpFlatType.Sharp, NOTE_G, null, null],
	[NoteType.G_Sharp, SharpFlatType.Flat, null, NOTE_A, SYMBOL_FLAT],
	[NoteType.G_Sharp, SharpFlatType.Natural, null, NOTE_G, SYMBOL_SHARP],
	[NoteType.G_Sharp, SharpFlatType.Sharp, null, NOTE_G, SYMBOL_SHARP],
	[NoteType.A, SharpFlatType.Flat, NOTE_A, null, null],
	[NoteType.A, SharpFlatType.Natural, NOTE_A, null, null],
	[NoteType.A, SharpFlatType.Sharp, NOTE_A, null, null],
	[NoteType.A_Sharp, SharpFlatType.Flat, null, NOTE_B, SYMBOL_FLAT],
	[NoteType.A_Sharp, SharpFlatType.Natural, null, NOTE_A, SYMBOL_SHARP],
	[NoteType.A_Sharp, SharpFlatType.Sharp, null, NOTE_A, SYMBOL_SHARP],
	[NoteType.B, SharpFlatType.Flat, null, NOTE_C, SYMBOL_FLAT],
	[NoteType.B, SharpFlatType.Natural, NOTE_B, null, null],
	[NoteType.B, SharpFlatType.Sharp, NOTE_B, null, null],
];

describe('getNoteName', () => {
	describe.each([0, 1, undefined])('with language %s', (lang) => {
		const noteNames =
			lang === 1 ? getDummyNoteName1() : getDummyNoteName0();
		const symbols = lang === 1 ? getDummySymbols1() : getDummySymbols0();
		for (const noteNameCase of noteNameCases) {
			describe(`for case ${noteNameCase[0]}:${noteNameCase[1]}`, () => {
				if (noteNameCase[2] !== null) {
					const theCase = noteNameCase;
					it('should return direct note name (without using concatSymbol)', () => {
						expect(
							getNoteName(theCase[0], theCase[1], lang ?? 2)
						).toEqual(noteNames[theCase[2]]);
						expect(concatSymbol).not.toHaveBeenCalled();
					});
				} else {
					const theCase = noteNameCase;
					it('should return concatenated note name (with using concatSymbol)', () => {
						mocked(concatSymbol).mockReturnValueOnce(
							dummyConcatSymbolResult
						);

						expect(
							getNoteName(theCase[0], theCase[1], lang ?? 2)
						).toEqual(dummyConcatSymbolResult);
						expect(concatSymbol).toHaveBeenCalledWith(
							noteNames[theCase[3]],
							symbols[theCase[4]],
							symbols[2]
						);
					});
				}
			});
		}
	});
});
