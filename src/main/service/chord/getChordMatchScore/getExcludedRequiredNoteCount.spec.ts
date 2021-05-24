import { mocked } from 'ts-jest/utils';
import type NoteType from '../../../model/NoteType';
import generateNotes from '../generateNotes';
import getExcludedRequiredNoteCount from './getExcludedRequiredNoteCount';

jest.mock('../generateNotes');

describe('getExcludedRequiredNoteCount', () => {
	it('should return count of notes which is included by input chord but not included by target chord', () => {
		const dummyTargetChord: any = { __type: 'TargetChord' };
		const dummyTargetNote1: any = { __type: 'TargetNote1' };
		const dummyTargetNote2: any = { __type: 'TargetNote2' };
		const dummyExcludedNote1: any = { __type: 'ExcludedNote1' };
		const dummyExcludedNote2: any = { __type: 'ExcludedNote2' };
		const dummyTargetNotes: NoteType[] = [
			dummyTargetNote1,
			dummyExcludedNote1,
			dummyTargetNote2,
			dummyExcludedNote2,
		];
		const dummyInputNotes: NoteType[] = [
			dummyTargetNote1,
			dummyTargetNote2,
		];
		const dummyInputChord: any = {
			__type: 'InputChord',
			notes: dummyInputNotes,
		};
		mocked(generateNotes).mockImplementation(
			(chord, _, getRandomBoolean) => {
				// eslint-disable-next-line jest/no-conditional-expect
				expect(getRandomBoolean()).toBeFalsy();
				return chord === dummyTargetChord ? dummyTargetNotes : [];
			}
		);
		const r = getExcludedRequiredNoteCount(
			dummyTargetChord,
			dummyInputChord
		);
		expect(r).toEqual(2);
		expect(generateNotes).toHaveBeenCalledWith(
			dummyTargetChord,
			false,
			expect.any(Function)
		);
	});
});
