import type ChordListItem from '../model/ChordListItem';
import ChordAppends from '../model/ChordAppends';
import ChordType from '../model/ChordType';
import NoteType from '../model/NoteType';

const ALL_CHORDS: readonly ChordListItem[] = [
	// major
	[
		{
			root: NoteType.C,
			rootSharpFlat: 0,
			type: ChordType.Major,
			appends: [],
		},
		'',
		[''],
	],
	// minor
	[
		{
			root: NoteType.C,
			rootSharpFlat: 0,
			type: ChordType.Minor,
			appends: [],
		},
		'm',
		['m'],
	],
	// 7
	[
		{
			root: NoteType.C,
			rootSharpFlat: 0,
			type: ChordType.Major,
			appends: [ChordAppends.Seventh],
		},
		'7',
		['7'],
	],
	// M7
	[
		{
			root: NoteType.C,
			rootSharpFlat: 0,
			type: ChordType.Major,
			appends: [ChordAppends.Major7],
		},
		'maj7',
		['M7', '△7', 'maj7', 'j7'],
	],
	// m7
	[
		{
			root: NoteType.C,
			rootSharpFlat: 0,
			type: ChordType.Minor,
			appends: [ChordAppends.Seventh],
		},
		'm7',
		['m7'],
	],
	// mM7
	[
		{
			root: NoteType.C,
			rootSharpFlat: 0,
			type: ChordType.Minor,
			appends: [ChordAppends.Major7],
		},
		'mmaj7',
		['mM7', 'm△7', 'mmaj7'],
	],
	// 6
	[
		{
			root: NoteType.C,
			rootSharpFlat: 0,
			type: ChordType.Major,
			appends: [ChordAppends.Sixth],
		},
		'6',
		['6'],
	],
	// 9
	[
		{
			root: NoteType.C,
			rootSharpFlat: 0,
			type: ChordType.Major,
			appends: [ChordAppends.Seventh, ChordAppends.Ninth],
		},
		'9',
		['9'],
	],
	// dim
	[
		{
			root: NoteType.C,
			rootSharpFlat: 0,
			type: ChordType.Diminish,
			appends: [],
		},
		'dim',
		['dim'],
	],
	// dim7
	[
		{
			root: NoteType.C,
			rootSharpFlat: 0,
			type: ChordType.Diminish7,
			appends: [],
		},
		'dim7',
		['dim7', '°7'],
	],
	// aug
	[
		{
			root: NoteType.C,
			rootSharpFlat: 0,
			type: ChordType.Augment,
			appends: [],
		},
		'aug',
		['aug'],
	],
	// NOTE: alt は省略
	// sus4
	[
		{
			root: NoteType.C,
			rootSharpFlat: 0,
			type: ChordType.Sus4,
			appends: [],
		},
		'sus4',
		['sus4'],
	],
	// msus4
	[
		{
			root: NoteType.C,
			rootSharpFlat: 0,
			type: ChordType.Minor,
			appends: [ChordAppends.Eleventh],
		},
		'msus4',
		['msus4'],
	],
	// add9
	[
		{
			root: NoteType.C,
			rootSharpFlat: 0,
			type: ChordType.Major,
			appends: [ChordAppends.Add9],
		},
		'add9',
		['add9', 'add2'],
	],
	// power
	[
		{
			root: NoteType.C,
			rootSharpFlat: 0,
			type: ChordType.Power,
			appends: [],
		},
		'power',
		['(power)', '5'],
	],
];
export default ALL_CHORDS;
