import NoteType from '../../../model/NoteType';
import SharpFlatType from '../../../model/SharpFlatType';

import ErrorMessageIndex from '../ErrorMessageIndex';
import ParseError from '../ParseError';

import parseRootNote from './parseRootNote';

describe('parseRootNote', () => {
	const validCases: Array<
		[input: string, rootValue: NoteType, sharpFlat: SharpFlatType]
	> = [
		['C', NoteType.C, SharpFlatType.Natural],
		['C+', NoteType.C_Sharp, SharpFlatType.Sharp],
		['C♯', NoteType.C_Sharp, SharpFlatType.Sharp],
		['C＃', NoteType.C_Sharp, SharpFlatType.Sharp],
		['C#', NoteType.C_Sharp, SharpFlatType.Sharp],
		['D-', NoteType.D_Flat, SharpFlatType.Flat],
		['Db', NoteType.D_Flat, SharpFlatType.Flat],
		['D♭', NoteType.D_Flat, SharpFlatType.Flat],
		['D', NoteType.D, SharpFlatType.Natural],
		['D+', NoteType.D_Sharp, SharpFlatType.Sharp],
		['E-', NoteType.E_Flat, SharpFlatType.Flat],
		['E', NoteType.E, SharpFlatType.Natural],
		['F-', NoteType.E, SharpFlatType.Flat],
		['E+', NoteType.F, SharpFlatType.Sharp],
		['F', NoteType.F, SharpFlatType.Natural],
		['F+', NoteType.F_Sharp, SharpFlatType.Sharp],
		['G-', NoteType.G_Flat, SharpFlatType.Flat],
		['G', NoteType.G, SharpFlatType.Natural],
		['G+', NoteType.G_Sharp, SharpFlatType.Sharp],
		['A-', NoteType.A_Flat, SharpFlatType.Flat],
		['A', NoteType.A, SharpFlatType.Natural],
		['A+', NoteType.A_Sharp, SharpFlatType.Sharp],
		['B-', NoteType.B_Flat, SharpFlatType.Flat],
		['B', NoteType.B, SharpFlatType.Natural],
		['C-', NoteType.B, SharpFlatType.Flat],
		['B+', NoteType.C, SharpFlatType.Sharp],
	];
	it.each(validCases)(
		"should parse '%s' as value '%s (%s)'",
		(input, root, sharpFlat) => {
			expect(parseRootNote(input)).toEqual([root, sharpFlat, '']);
		}
	);
	it('should return unparsed string', () => {
		expect(parseRootNote('Cx')).toEqual([
			NoteType.C,
			SharpFlatType.Natural,
			'x',
		]);
		expect(parseRootNote('C+x')).toEqual([
			NoteType.C_Sharp,
			SharpFlatType.Sharp,
			'x',
		]);
		expect(parseRootNote('C-x')).toEqual([
			NoteType.B,
			SharpFlatType.Flat,
			'x',
		]);
		expect(parseRootNote('CC+')).toEqual([
			NoteType.C,
			SharpFlatType.Natural,
			'C+',
		]);
	});
	it('should throw InvalidRoot if unexpected root value', () => {
		expect(() => parseRootNote('H')).toThrowError(
			new ParseError(ErrorMessageIndex.InvalidRoot)
		);
		expect(() => parseRootNote('1')).toThrowError(
			new ParseError(ErrorMessageIndex.InvalidRoot)
		);
	});
	it('should throw NaturalNotAllowed if natural is used', () => {
		expect(() => parseRootNote('D=')).toThrowError(
			new ParseError(ErrorMessageIndex.NaturalNotAllowed)
		);
		expect(() => parseRootNote('D♮')).toThrowError(
			new ParseError(ErrorMessageIndex.NaturalNotAllowed)
		);
	});
	it('should throw SharpFlatOnlySingle if multiple sharp/flat is used', () => {
		expect(() => parseRootNote('D++')).toThrowError(
			new ParseError(ErrorMessageIndex.SharpFlatOnlySingle)
		);
		expect(() => parseRootNote('D--')).toThrowError(
			new ParseError(ErrorMessageIndex.SharpFlatOnlySingle)
		);
		expect(() => parseRootNote('D+-')).toThrowError(
			new ParseError(ErrorMessageIndex.SharpFlatOnlySingle)
		);
	});
});
