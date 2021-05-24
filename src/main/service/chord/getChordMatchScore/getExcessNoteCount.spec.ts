import { mocked } from 'ts-jest/utils';
import type NoteType from '../../../model/NoteType';
import generateNotes from '../generateNotes';
import getExcessNoteCount from './getExcessNoteCount';

jest.mock('../generateNotes');

describe('getExcessNoteCount', () => {
	it('should return count of notes which is included by input chord but not included by target chord', () => {
		const dummyTargetChord: any = { __type: 'TargetChord' };
		const dummyTargetNote1: any = { __type: 'TargetNote1' };
		const dummyTargetNote2: any = { __type: 'TargetNote2' };
		const dummyTargetNote3: any = { __type: 'TargetNote3' };
		const dummyExcessNote1: any = { __type: 'ExcessNote1' };
		const dummyExcessNote2: any = { __type: 'ExcessNote2' };
		const dummyTargetNotes: NoteType[] = [
			dummyTargetNote1,
			dummyTargetNote2,
			dummyTargetNote3,
		];
		const dummyInputNotes: NoteType[] = [
			dummyTargetNote1,
			dummyExcessNote1,
			dummyTargetNote2,
			dummyExcessNote2,
		];
		const dummyInputChord: any = {
			__type: 'InputChord',
			notes: dummyInputNotes,
		};
		mocked(generateNotes).mockImplementation(
			(chord, _, getRandomBoolean) => {
				expect(getRandomBoolean()).toBeTruthy();
				return chord === dummyTargetChord ? dummyTargetNotes : [];
			}
		);
		const r = getExcessNoteCount(dummyTargetChord, dummyInputChord);
		expect(r).toEqual(2);
		expect(generateNotes).toHaveBeenCalledWith(
			dummyTargetChord,
			true,
			expect.any(Function)
		);
	});
});
