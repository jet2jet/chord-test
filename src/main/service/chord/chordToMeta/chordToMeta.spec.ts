import { mocked } from 'ts-jest/utils';

import chordAppendsToMeta from './chordAppendsToMeta';
import chordTypeToMeta from './chordTypeToMeta';

import chordToMeta from './chordToMeta';
import NoteType from '../../../model/NoteType';
import ChordMeta from '../../../model/ChordMeta';

jest.mock('./chordAppendsToMeta');
jest.mock('./chordTypeToMeta');

describe('chordToMeta', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});
	it("should return an array with Root, type's meta, and appends' meta", () => {
		const dummyChordType: any = { __type: 'dummyChordType' };
		const dummyAppends: any = { __type: 'dummyAppends' };

		const dummyTypeMeta: any = {
			__type: 'dummyTypeMeta',
		};
		const dummyAppendsMeta: any = {
			__type: 'dummyAppendsMeta',
		};
		mocked(chordTypeToMeta).mockImplementation(() => [dummyTypeMeta]);
		mocked(chordAppendsToMeta).mockImplementation(() => [dummyAppendsMeta]);

		expect(
			chordToMeta({
				root: NoteType.C,
				rootSharpFlat: 0,
				type: dummyChordType,
				appends: dummyAppends,
			})
		).toEqual([ChordMeta.Root, dummyTypeMeta, dummyAppendsMeta]);
		expect(chordTypeToMeta).toBeCalledWith(dummyChordType);
		expect(chordAppendsToMeta).toBeCalledWith(
			[dummyTypeMeta],
			dummyAppends
		);
	});
});
