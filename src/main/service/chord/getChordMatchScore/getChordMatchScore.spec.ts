import { mocked } from 'ts-jest/utils';
import getChordMatchScore from './getChordMatchScore';
import getExcessNoteCount from './getExcessNoteCount';
import getExcludedNoteCount from './getExcludedNoteCount';
import getExcludedRequiredNoteCount from './getExcludedRequiredNoteCount';
import isMatchRoot from './isMatchRoot';

jest.mock('./getExcessNoteCount');
jest.mock('./getExcludedNoteCount');
jest.mock('./getExcludedRequiredNoteCount');
jest.mock('./isMatchRoot');

describe('getChordMatchScore', () => {
	const dummyTargetChord: any = { __type: 'TargetChord' };
	const dummyInputChord: any = { __type: 'TargetChord' };

	it('should return 100 if the input is exactly match', () => {
		mocked(getExcludedRequiredNoteCount).mockReturnValueOnce(0);
		mocked(getExcludedNoteCount).mockReturnValueOnce(0);
		mocked(getExcessNoteCount).mockReturnValueOnce(0);
		mocked(isMatchRoot).mockReturnValueOnce(true);

		expect(getChordMatchScore(dummyTargetChord, dummyInputChord)).toEqual(
			100
		);

		expect(getExcludedRequiredNoteCount).toHaveBeenCalledWith(
			dummyTargetChord,
			dummyInputChord
		);
		expect(getExcludedNoteCount).toHaveBeenCalledWith(
			dummyTargetChord,
			dummyInputChord
		);
		expect(getExcessNoteCount).toHaveBeenCalledWith(
			dummyTargetChord,
			dummyInputChord
		);
		expect(isMatchRoot).toHaveBeenCalledWith(
			dummyTargetChord,
			dummyInputChord
		);
	});
	it.each([
		[80, 1],
		[60, 2],
		[40, 3],
	] as const)(
		'should return %s if the input is missing %s required note',
		(expectedScore, count) => {
			mocked(getExcludedRequiredNoteCount).mockReturnValueOnce(count);
			mocked(getExcludedNoteCount).mockReturnValueOnce(0);
			mocked(getExcessNoteCount).mockReturnValueOnce(0);
			mocked(isMatchRoot).mockReturnValueOnce(true);

			expect(
				getChordMatchScore(dummyTargetChord, dummyInputChord)
			).toEqual(expectedScore);

			expect(getExcludedRequiredNoteCount).toHaveBeenCalledWith(
				dummyTargetChord,
				dummyInputChord
			);
			expect(getExcludedNoteCount).toHaveBeenCalledWith(
				dummyTargetChord,
				dummyInputChord
			);
			expect(getExcessNoteCount).toHaveBeenCalledWith(
				dummyTargetChord,
				dummyInputChord
			);
			expect(isMatchRoot).toHaveBeenCalledWith(
				dummyTargetChord,
				dummyInputChord
			);
		}
	);
	it.each([
		[95, 1],
		[90, 2],
		[85, 3],
	] as const)(
		'should return %s if the input is missing %s normal note',
		(expectedScore, count) => {
			mocked(getExcludedRequiredNoteCount).mockReturnValueOnce(0);
			mocked(getExcludedNoteCount).mockReturnValueOnce(count);
			mocked(getExcessNoteCount).mockReturnValueOnce(0);
			mocked(isMatchRoot).mockReturnValueOnce(true);

			expect(
				getChordMatchScore(dummyTargetChord, dummyInputChord)
			).toEqual(expectedScore);

			expect(getExcludedRequiredNoteCount).toHaveBeenCalledWith(
				dummyTargetChord,
				dummyInputChord
			);
			expect(getExcludedNoteCount).toHaveBeenCalledWith(
				dummyTargetChord,
				dummyInputChord
			);
			expect(getExcessNoteCount).toHaveBeenCalledWith(
				dummyTargetChord,
				dummyInputChord
			);
			expect(isMatchRoot).toHaveBeenCalledWith(
				dummyTargetChord,
				dummyInputChord
			);
		}
	);
	it.each([
		[70, 1],
		[40, 2],
		[10, 3],
	] as const)(
		'should return %s if the input has excess %s note(s)',
		(expectedScore, count) => {
			mocked(getExcludedRequiredNoteCount).mockReturnValueOnce(0);
			mocked(getExcludedNoteCount).mockReturnValueOnce(0);
			mocked(getExcessNoteCount).mockReturnValueOnce(count);
			mocked(isMatchRoot).mockReturnValueOnce(true);

			expect(
				getChordMatchScore(dummyTargetChord, dummyInputChord)
			).toEqual(expectedScore);

			expect(getExcludedRequiredNoteCount).toHaveBeenCalledWith(
				dummyTargetChord,
				dummyInputChord
			);
			expect(getExcludedNoteCount).toHaveBeenCalledWith(
				dummyTargetChord,
				dummyInputChord
			);
			expect(getExcessNoteCount).toHaveBeenCalledWith(
				dummyTargetChord,
				dummyInputChord
			);
			expect(isMatchRoot).toHaveBeenCalledWith(
				dummyTargetChord,
				dummyInputChord
			);
		}
	);
	it('should return 70 if the input root is not match', () => {
		mocked(getExcludedRequiredNoteCount).mockReturnValueOnce(0);
		mocked(getExcludedNoteCount).mockReturnValueOnce(0);
		mocked(getExcessNoteCount).mockReturnValueOnce(0);
		mocked(isMatchRoot).mockReturnValueOnce(false);

		expect(getChordMatchScore(dummyTargetChord, dummyInputChord)).toEqual(
			70
		);

		expect(getExcludedRequiredNoteCount).toHaveBeenCalledWith(
			dummyTargetChord,
			dummyInputChord
		);
		expect(getExcludedNoteCount).toHaveBeenCalledWith(
			dummyTargetChord,
			dummyInputChord
		);
		expect(getExcessNoteCount).toHaveBeenCalledWith(
			dummyTargetChord,
			dummyInputChord
		);
		expect(isMatchRoot).toHaveBeenCalledWith(
			dummyTargetChord,
			dummyInputChord
		);
	});
	it('should return 0 if the input is too mismatch', () => {
		mocked(getExcludedRequiredNoteCount).mockReturnValueOnce(3);
		mocked(getExcludedNoteCount).mockReturnValueOnce(3);
		mocked(getExcessNoteCount).mockReturnValueOnce(3);
		mocked(isMatchRoot).mockReturnValueOnce(false);

		expect(getChordMatchScore(dummyTargetChord, dummyInputChord)).toEqual(
			0
		);

		expect(getExcludedRequiredNoteCount).toHaveBeenCalledWith(
			dummyTargetChord,
			dummyInputChord
		);
		expect(getExcludedNoteCount).toHaveBeenCalledWith(
			dummyTargetChord,
			dummyInputChord
		);
		expect(getExcessNoteCount).toHaveBeenCalledWith(
			dummyTargetChord,
			dummyInputChord
		);
		expect(isMatchRoot).toHaveBeenCalledWith(
			dummyTargetChord,
			dummyInputChord
		);
	});
});
