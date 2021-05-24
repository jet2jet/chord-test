// eslint-disable-next-line @typescript-eslint/naming-convention
const NoteType = {
	C: 0,
	C_Sharp: 1,
	D: 2,
	D_Sharp: 3,
	E: 4,
	F: 5,
	F_Sharp: 6,
	G: 7,
	G_Sharp: 8,
	A: 9,
	A_Sharp: 10,
	B: 11,

	D_Flat: 1,
	E_Flat: 3,
	G_Flat: 6,
	A_Flat: 8,
	B_Flat: 10,
} as const;
// eslint-disable-next-line @typescript-eslint/no-redeclare
type NoteType = typeof NoteType[keyof typeof NoteType];
export default NoteType;
