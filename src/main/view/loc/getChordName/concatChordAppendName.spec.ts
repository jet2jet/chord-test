import { mocked } from 'ts-jest/utils';

import { getChordAppendFormatPattern } from './ChordNamePattern';
import concatChordAppendName from './concatChordAppendName';

function getDummyAppendFormats(): ReadonlyArray<
	readonly [first: string, rest: string]
> {
	return [
		['0c', '0#c'],
		['1c1c', '1c#c'],
	] as const;
}

jest.mock('../messages', () => {
	return {
		__esModule: true,
		default: {
			chords: {
				appendFormats: getDummyAppendFormats(),
			},
		},
	};
});
jest.mock('./ChordNamePattern');

const dummyBase = 'DummyBase';
const dummyAppend = 'DummyAppend';

describe('concatChordAppendName', () => {
	describe.each([1, undefined] as const)(
		'for format pattern %s',
		(formatPattern) => {
			beforeEach(() => {
				mocked(getChordAppendFormatPattern).mockReturnValueOnce(
					formatPattern ?? 2 // '2' is not defined pattern index
				);
			});
			const dummyPattern = getDummyAppendFormats()[formatPattern ?? 0];

			type Case = [isFirst: boolean, expectPatternIndex: number];
			const cases: Case[] = [
				[true, 0],
				[false, 1],
			];
			it.each(cases)(
				'should use appropriate pattern: isFirst = %s',
				(isFirst, expectPatternIndex) => {
					const expectedRest = dummyPattern[
						expectPatternIndex
					].replace(/c/g, dummyAppend);
					expect(
						concatChordAppendName(dummyBase, dummyAppend, isFirst)
					).toEqual(`${dummyBase}${expectedRest}`);
				}
			);
		}
	);
});
