import { mocked } from 'ts-jest/utils';
import ChordAppends from '../../../model/ChordAppends';
import isFlatSymbol from '../parseChordName/isFlatSymbol';
import isSharpSymbol from '../parseChordName/isSharpSymbol';
import degreeToAppends from './degreeToAppends';

jest.mock('../parseChordName/isFlatSymbol');
jest.mock('../parseChordName/isSharpSymbol');

describe('degreeToAppends', () => {
	// % -- sharp symbol, $ -- flat symbol
	beforeEach(() => {
		mocked(isSharpSymbol).mockImplementation((input) => input === '%');
		mocked(isFlatSymbol).mockImplementation((input) => input === '$');
	});
	type Case = readonly [input: string, expected: ChordAppends | null];
	const cases: readonly Case[] = [
		['5', null],
		['%5', ChordAppends.Sharp5],
		['$5', ChordAppends.Flat5],
		['6', ChordAppends.Sixth],
		['%6', null],
		['$6', null],
		['7', ChordAppends.Seventh],
		['%7', null],
		['$7', null],
		['9', ChordAppends.Ninth],
		['%9', ChordAppends.Sharp9],
		['$9', ChordAppends.Flat9],
		['11', ChordAppends.Eleventh],
		['%11', ChordAppends.Sharp11],
		['$11', null],
		['13', ChordAppends.Thirteenth],
		['%13', null],
		['$13', ChordAppends.Flat13],
		// invalid patterns
		['2', null],
		['3', null],
		['8', null],
		['12', null],
		['14', null],
		['15', null],
		['%%5', null],
		['$$9', null],
		['dim', null],
	];
	it.each(cases)('should parse %s to %s', (input, expected) => {
		expect(degreeToAppends(input)).toEqual(expected);
	});
});
