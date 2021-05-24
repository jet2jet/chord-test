import ChordAppends from '../../../model/ChordAppends';
import ChordType from '../../../model/ChordType';
import NoteType from '../../../model/NoteType';

import generateNotes, { ChordWithCache } from './generateNotes';

describe('generateNotes', () => {
	const patterns: Array<
		[
			chord: ChordWithCache,
			isAllOptionalIncluded: boolean,
			randomBoolean: boolean,
			expectNotes: NoteType[]
		]
	> = [
		[
			{
				root: NoteType.D,
				rootSharpFlat: 0,
				type: ChordType.Minor,
				appends: [],
			},
			true,
			false,
			[NoteType.D, NoteType.F, NoteType.A],
		],
		[
			{
				root: NoteType.D,
				rootSharpFlat: 0,
				type: ChordType.Minor,
				appends: [ChordAppends.Seventh],
			},
			true,
			false,
			[NoteType.D, NoteType.F, NoteType.A, NoteType.C],
		],
		[
			{
				root: NoteType.D,
				rootSharpFlat: 0,
				type: ChordType.Major,
				appends: [ChordAppends.Sharp5],
			},
			true,
			false,
			[NoteType.D, NoteType.F_Sharp, NoteType.A_Sharp],
		],
		[
			{
				root: NoteType.D,
				rootSharpFlat: 0,
				type: ChordType.Minor,
				appends: [],
			},
			false,
			false,
			[NoteType.D, NoteType.F],
		],
		[
			{
				root: NoteType.D,
				rootSharpFlat: 0,
				type: ChordType.Minor,
				appends: [ChordAppends.Seventh],
			},
			false,
			false,
			[NoteType.D, NoteType.F, NoteType.C],
		],
		[
			{
				root: NoteType.D,
				rootSharpFlat: 0,
				type: ChordType.Major,
				appends: [ChordAppends.Sharp5],
			},
			false,
			false,
			[NoteType.D, NoteType.F_Sharp, NoteType.A_Sharp],
		],
	];
	beforeEach(() => {
		jest.clearAllMocks();
	});
	it.each(patterns)(
		'should use appropriate functions: chord = %s, isAllOptionalIncluded = %s, randomBoolean = %s, expectNotes = %s',
		(chord, isAllOptionalIncluded, randomBoolean, expectNotes) => {
			delete chord._cachedNotes;
			const r = generateNotes(
				chord,
				isAllOptionalIncluded,
				() => randomBoolean
			).sort((a, b) => a - b);
			const e = expectNotes.sort((a, b) => a - b);

			expect(r).toEqual(e);
			expect(chord._cachedNotes).toEqual(
				isAllOptionalIncluded ? [undefined, e] : [e]
			);
		}
	);
	it("should return generated notes if '_cachedNotes' is not available (for optional omitted)", () => {
		const dummyCached: any = { __type: 'CachedNotes' };
		const dummyChord: ChordWithCache = {
			_cachedNotes: [undefined, dummyCached],
			root: NoteType.F,
			rootSharpFlat: 0,
			type: ChordType.Major,
			appends: [],
		};
		const r = generateNotes(dummyChord, false, () => false);
		expect(r).not.toEqual(dummyCached);
	});
	it("should return generated notes if '_cachedNotes' is not available (for optional included)", () => {
		const dummyCached: any = { __type: 'CachedNotes' };
		const dummyChord: ChordWithCache = {
			_cachedNotes: [dummyCached],
			root: NoteType.F,
			rootSharpFlat: 0,
			type: ChordType.Major,
			appends: [],
		};
		const r = generateNotes(dummyChord, true, () => true);
		expect(r).not.toEqual(dummyCached);
	});
	it("should return cached notes if '_cachedNotes' is available (for optional omitted)", () => {
		const dummyCached: any = { __type: 'CachedNotes' };
		const dummyChord: ChordWithCache = {
			_cachedNotes: [dummyCached],
			root: NoteType.F,
			rootSharpFlat: 0,
			type: ChordType.Major,
			appends: [],
		};
		const r = generateNotes(dummyChord, false, () => false);
		expect(r).toEqual(dummyCached);
	});
	it("should return cached notes if '_cachedNotes' is available (for optional included)", () => {
		const dummyCached: any = { __type: 'CachedNotes' };
		const dummyChord: ChordWithCache = {
			_cachedNotes: [undefined, dummyCached],
			root: NoteType.F,
			rootSharpFlat: 0,
			type: ChordType.Major,
			appends: [],
		};
		const r = generateNotes(dummyChord, true, () => true);
		expect(r).toEqual(dummyCached);
	});
});
