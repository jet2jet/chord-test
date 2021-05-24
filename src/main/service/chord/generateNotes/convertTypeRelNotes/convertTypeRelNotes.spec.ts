import { mocked } from 'ts-jest/utils';

import relativeNoteToAbsoluteNote from '../../../note/relativeNoteToAbsoluteNote';
import isRelNoteToBeIncluded from './isRelNoteToBeIncluded';

import convertTypeRelNotes from './convertTypeRelNotes';

jest.mock('../../../note/relativeNoteToAbsoluteNote');
jest.mock('./isRelNoteToBeIncluded');

describe('convertTypeRelNotes', () => {
	it('should use isRelNoteToBeIncluded for filter and relativeNoteToAbsoluteNote for mapping', () => {
		const dummyRoot: any = { __type: 'root' };
		const dummyTypeMeta: any = { __type: 'typeMeta' };
		const dummyRemoveNotes: any = { __type: 'removeNotes' };
		const dummyIsAllOptionalIncluded: any = {
			__type: 'isAllOptionalIncluded',
		};
		const dummyGetRandomBoolean: any = { __type: 'getRandomBoolean' };
		const dummyAbsoluteNotes: any[] = [
			{ __type: 'absoluteNote0' },
			{ __type: 'absoluteNote1' },
		];

		const dummyFilteredTypeRelNotes: any[] = [
			{ __type: 'typeRelNote0' },
			{ __type: 'typeRelNote1' },
		];
		const indexToBeFiltered = 1;
		const dummyTypeRelNotes = dummyFilteredTypeRelNotes.slice();
		dummyTypeRelNotes.splice(indexToBeFiltered, 0, {
			__type: 'typeRelNoteToBeFiltered',
		});

		mocked(isRelNoteToBeIncluded).mockImplementation(
			(_, i) => i !== indexToBeFiltered
		);
		mocked(relativeNoteToAbsoluteNote).mockImplementation((rel) => {
			const i = dummyFilteredTypeRelNotes.findIndex((x) => x === rel);
			if (i < 0) {
				throw new Error('Unexpected input: ' + JSON.stringify(rel));
			}
			return dummyAbsoluteNotes[i];
		});

		expect(
			convertTypeRelNotes(
				dummyRoot,
				dummyTypeRelNotes,
				dummyTypeMeta,
				dummyRemoveNotes,
				dummyIsAllOptionalIncluded,
				dummyGetRandomBoolean
			)
		).toEqual(dummyAbsoluteNotes);

		expect(isRelNoteToBeIncluded).toHaveBeenCalledTimes(
			dummyTypeRelNotes.length
		);
		for (let i = 0; i < dummyTypeRelNotes.length; ++i) {
			expect(isRelNoteToBeIncluded).toHaveBeenCalledWith(
				dummyTypeRelNotes[i],
				i,
				dummyTypeMeta,
				dummyRemoveNotes,
				dummyIsAllOptionalIncluded,
				dummyGetRandomBoolean
			);
		}
		expect(relativeNoteToAbsoluteNote).toHaveBeenCalledTimes(
			dummyFilteredTypeRelNotes.length
		);
		for (let i = 0; i < dummyFilteredTypeRelNotes.length; ++i) {
			expect(relativeNoteToAbsoluteNote).toHaveBeenCalledWith(
				dummyFilteredTypeRelNotes[i],
				dummyRoot
			);
		}
	});
});
