import { mocked } from 'ts-jest/utils';
import type Chord from '../../../model/Chord';
import ChordAppends from '../../../model/ChordAppends';
import ChordType from '../../../model/ChordType';

import getNoteName from '../getNoteName';
import addChordAppendNames from './addChordAppendNames';
import getChordTypeName from './getChordTypeName';

import getChordName from './getChordName';

jest.mock('../getNoteName');
jest.mock('../messages', () => {
	return {
		__esModule: true,
		default: {},
	};
});
jest.mock('./addChordAppendNames');
jest.mock('./getChordTypeName');

describe('getChordName', () => {
	const dummyRoot: any = { __type: 'Root' };
	const dummyRootSharpFlat: any = { __type: 'RootSharpFlat' };
	const dummyChordType: any = { __type: 'ChordType' };
	const dummyAppend1: any = { __type: 'ChordAppend1' };
	const dummyAppend2: any = { __type: 'ChordAppend2' };
	const dummyChord: Chord = {
		root: dummyRoot,
		rootSharpFlat: dummyRootSharpFlat,
		type: dummyChordType,
		appends: [dummyAppend1, dummyAppend2],
	};
	const dummySus4Chord: Chord = {
		root: dummyRoot,
		rootSharpFlat: dummyRootSharpFlat,
		type: ChordType.Sus4,
		appends: [dummyAppend1, dummyAppend2],
	};
	const dummy7Sus4Chord: Chord = {
		root: dummyRoot,
		rootSharpFlat: dummyRootSharpFlat,
		type: ChordType.Sus4,
		appends: [dummyAppend1, ChordAppends.Seventh, dummyAppend2],
	};

	const dummyGetNoteNameResult = '[GetNoteNameResult]';
	const dummyGetChordTypeNameResult = '[GetChordTypeNameResult]';
	const dummyAddChordAppendNamesResult1 = '[AddChordAppendNamesResult1]';
	const dummyAddChordAppendNamesResult2 = '[AddChordAppendNamesResult2]';

	beforeEach(() => {
		jest.resetAllMocks();
		mocked(getNoteName).mockReturnValueOnce(dummyGetNoteNameResult);
		mocked(getChordTypeName).mockReturnValueOnce(
			dummyGetChordTypeNameResult
		);
		mocked(addChordAppendNames)
			.mockReturnValueOnce(dummyAddChordAppendNamesResult1)
			.mockReturnValueOnce(dummyAddChordAppendNamesResult2);
	});

	it('should return the result of addChordAppendNames called with appropriate values (normal)', () => {
		expect(getChordName(dummyChord)).toEqual(
			dummyAddChordAppendNamesResult1
		);
		expect(getNoteName).toHaveBeenCalledWith(
			dummyRoot,
			dummyRootSharpFlat,
			0
		);
		expect(getChordTypeName).toHaveBeenCalledWith(dummyChordType);
		expect(addChordAppendNames).toHaveBeenCalledTimes(1);
		expect(addChordAppendNames).toHaveBeenCalledWith(
			`${dummyGetNoteNameResult}${dummyGetChordTypeNameResult}`,
			[dummyAppend1, dummyAppend2],
			true
		);
	});
	it('should return the result of addChordAppendNames called with appropriate values (with sus4)', () => {
		expect(getChordName(dummySus4Chord)).toEqual(
			dummyAddChordAppendNamesResult1
		);
		expect(getNoteName).toHaveBeenCalledWith(
			dummyRoot,
			dummyRootSharpFlat,
			0
		);
		expect(getChordTypeName).toHaveBeenCalledWith(ChordType.Sus4);
		expect(addChordAppendNames).toHaveBeenCalledTimes(1);
		expect(addChordAppendNames).toHaveBeenCalledWith(
			`${dummyGetNoteNameResult}${dummyGetChordTypeNameResult}`,
			[dummyAppend1, dummyAppend2],
			true
		);
	});
	it('should return the result of addChordAppendNames called with appropriate values (with 7sus4)', () => {
		expect(getChordName(dummy7Sus4Chord)).toEqual(
			dummyAddChordAppendNamesResult2
		);
		expect(getNoteName).toHaveBeenCalledWith(
			dummyRoot,
			dummyRootSharpFlat,
			0
		);
		expect(getChordTypeName).toHaveBeenCalledWith(ChordType.Sus4);
		expect(addChordAppendNames).toHaveBeenCalledTimes(2);
		expect(addChordAppendNames).toHaveBeenCalledWith(
			`${dummyGetNoteNameResult}`,
			[ChordAppends.Seventh],
			true
		);
		expect(addChordAppendNames).toHaveBeenCalledWith(
			`${dummyAddChordAppendNamesResult1}${dummyGetChordTypeNameResult}`,
			[dummyAppend1, dummyAppend2],
			false
		);
	});
});
