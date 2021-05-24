import { mocked } from 'ts-jest/utils';

import type DegreeNumber from '../../DegreeNumber';
import type TokenData from '../../TokenData';

import pickupChordByName from '../../pickupChordByName';
import chordTypeToDegreesAndRelativeNotesWithDegreeUsed from './chordTypeToDegreesAndRelativeNotesWithDegreeUsed';
import degreeTokenToDegreeAndRelativeNote from './degreeTokenToDegreeAndRelativeNote';

import convertTokenToDegreesAndRelativeNotes from './convertTokenToDegreesAndRelativeNotes';

jest.mock('../../pickupChordByName');
jest.mock('./chordTypeToDegreesAndRelativeNotesWithDegreeUsed');
jest.mock('./degreeTokenToDegreeAndRelativeNote');

describe('convertTokenToDegreesAndRelativeNotes', () => {
	const dummyDegreeUsed: any = { __type: 'DegreeUsed' };

	it("should return chordTypeToDegreesAndRelativeNotesWithDegreeUsed's result if token's degree is undefined and pickChordByName returns non-null item", () => {
		const dummyToken: any = { __type: 'Token' };
		const dummyTokenData: TokenData = {
			t: dummyToken,
			o: '',
		};
		const dummyChordType: any = { __type: 'ChordType' };
		const dummyChordItem: any = [[{ type: dummyChordType }]];
		const dummyResult: any = { __type: 'Result' };

		mocked(pickupChordByName).mockReturnValueOnce(dummyChordItem);
		mocked(
			chordTypeToDegreesAndRelativeNotesWithDegreeUsed
		).mockReturnValueOnce(dummyResult);

		const r = convertTokenToDegreesAndRelativeNotes(
			dummyTokenData,
			dummyDegreeUsed
		);

		expect(r).toEqual(dummyResult);
		expect(pickupChordByName).toHaveBeenCalledWith(dummyToken);
		expect(
			chordTypeToDegreesAndRelativeNotesWithDegreeUsed
		).toHaveBeenCalledWith(dummyChordType, dummyDegreeUsed);
		expect(degreeTokenToDegreeAndRelativeNote).not.toHaveBeenCalled();
	});

	/* eslint-disable jest/no-conditional-expect */
	function testForUsingDegreeTokenToDegreeAndRelativeNote(
		d: DegreeNumber | undefined
	) {
		const dummyToken: any = { __type: 'Token' };
		const dummyTokenData: TokenData = {
			t: dummyToken,
			o: '',
			d,
		};
		beforeEach(() => {
			if (d === undefined) {
				mocked(pickupChordByName).mockReturnValueOnce(null);
			}
		});
		it('should return an empty array if degreeTokenToDegreeAndRelativeNote returns null', () => {
			mocked(degreeTokenToDegreeAndRelativeNote).mockReturnValueOnce(
				null
			);

			const r = convertTokenToDegreesAndRelativeNotes(
				dummyTokenData,
				dummyDegreeUsed
			);

			expect(r).toEqual([]);
			expect(degreeTokenToDegreeAndRelativeNote).toHaveBeenCalledWith(
				dummyToken
			);
			if (d === undefined) {
				expect(pickupChordByName).toHaveBeenCalledWith(dummyToken);
			} else {
				expect(pickupChordByName).not.toHaveBeenCalled();
			}
			expect(
				chordTypeToDegreesAndRelativeNotesWithDegreeUsed
			).not.toHaveBeenCalled();
		});
		it("should return one-element array with degreeTokenToDegreeAndRelativeNote's return value (non-null)", () => {
			const dummyResult: any = { __type: 'Result' };
			mocked(degreeTokenToDegreeAndRelativeNote).mockReturnValueOnce(
				dummyResult
			);

			const r = convertTokenToDegreesAndRelativeNotes(
				dummyTokenData,
				dummyDegreeUsed
			);

			expect(r).toEqual([dummyResult]);
			expect(degreeTokenToDegreeAndRelativeNote).toHaveBeenCalledWith(
				dummyToken
			);
			if (d === undefined) {
				expect(pickupChordByName).toHaveBeenCalledWith(dummyToken);
			} else {
				expect(pickupChordByName).not.toHaveBeenCalled();
			}
			expect(
				chordTypeToDegreesAndRelativeNotesWithDegreeUsed
			).not.toHaveBeenCalled();
		});
	}
	/* eslint-enable jest/no-conditional-expect */

	describe('with token not found as chord by name', () => {
		testForUsingDegreeTokenToDegreeAndRelativeNote(undefined);
	});
	describe("with token's degree defined", () => {
		testForUsingDegreeTokenToDegreeAndRelativeNote(1);
	});
});
