import { mocked } from 'ts-jest/utils';

import relativeNoteToAbsoluteNote from '../../../note/relativeNoteToAbsoluteNote';
import isAddNoteToBeIncluded from './isAddNoteToBeIncluded';

import convertAddNotes from './convertAddNotes';

jest.mock('../../../note/relativeNoteToAbsoluteNote');
jest.mock('./isAddNoteToBeIncluded');

describe('convertAddNotes', () => {
	it('should use isAddNoteToBeIncluded for filter and relativeNoteToAbsoluteNote for mapping', () => {
		const dummyRoot: any = { __type: 'root' };
		const dummyAppendsMeta: any = { __type: 'appendsMeta' };
		const dummyIsAllOptionalIncluded: any = {
			__type: 'isAllOptionalIncluded',
		};
		const dummyAbsoluteNotes: any[] = [
			{ __type: 'absoluteNote0' },
			{ __type: 'absoluteNote1' },
		];

		const dummyFilteredAddNotes: any[] = [
			{ __type: 'addNote0' },
			{ __type: 'addNote1' },
		];
		const indexToBeFiltered = 1;
		const dummyAddNotes = dummyFilteredAddNotes.slice();
		dummyAddNotes.splice(indexToBeFiltered, 0, {
			__type: 'addNoteToBeFiltered',
		});

		mocked(isAddNoteToBeIncluded).mockImplementation(
			(i) => i !== indexToBeFiltered
		);
		mocked(relativeNoteToAbsoluteNote).mockImplementation((rel) => {
			const i = dummyFilteredAddNotes.findIndex((x) => x === rel);
			if (i < 0) {
				throw new Error('Unexpected input: ' + JSON.stringify(rel));
			}
			return dummyAbsoluteNotes[i];
		});

		expect(
			convertAddNotes(
				dummyRoot,
				dummyAppendsMeta,
				dummyAddNotes,
				dummyIsAllOptionalIncluded
			)
		).toEqual(dummyAbsoluteNotes);

		expect(isAddNoteToBeIncluded).toHaveBeenCalledTimes(
			dummyAddNotes.length
		);
		for (let i = 0; i < dummyAddNotes.length; ++i) {
			expect(isAddNoteToBeIncluded).toHaveBeenCalledWith(
				i,
				dummyAppendsMeta,
				dummyIsAllOptionalIncluded
			);
		}
		expect(relativeNoteToAbsoluteNote).toHaveBeenCalledTimes(
			dummyFilteredAddNotes.length
		);
		for (let i = 0; i < dummyFilteredAddNotes.length; ++i) {
			expect(relativeNoteToAbsoluteNote).toHaveBeenCalledWith(
				dummyFilteredAddNotes[i],
				dummyRoot
			);
		}
	});
});
