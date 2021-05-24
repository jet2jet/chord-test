import type DegreeAndRelativeNote from '../../../../model/DegreeAndRelativeNote';
import degreeTokenToDegreeAndRelativeNote from './degreeTokenToDegreeAndRelativeNote';

describe('degreeTokenToDegreeAndRelativeNote', () => {
	it('should return null if the token is not a number', () => {
		expect(degreeTokenToDegreeAndRelativeNote('a')).toBeNull();
		expect(degreeTokenToDegreeAndRelativeNote('+a')).toBeNull();
		expect(degreeTokenToDegreeAndRelativeNote('-a')).toBeNull();
		expect(degreeTokenToDegreeAndRelativeNote('++1')).toBeNull();
		expect(degreeTokenToDegreeAndRelativeNote('--1')).toBeNull();
	});
	it('should return null if the token degree is 0', () => {
		expect(degreeTokenToDegreeAndRelativeNote('0')).toBeNull();
		expect(degreeTokenToDegreeAndRelativeNote('+0')).toBeNull();
		expect(degreeTokenToDegreeAndRelativeNote('-0')).toBeNull();
	});
	it('should return null if the token degree is Greater than 14', () => {
		expect(degreeTokenToDegreeAndRelativeNote('15')).toBeNull();
		expect(degreeTokenToDegreeAndRelativeNote('+15')).toBeNull();
		expect(degreeTokenToDegreeAndRelativeNote('-15')).toBeNull();
	});

	type Case = [token: string, expected: DegreeAndRelativeNote];
	const cases: Case[] = [
		['5', [5, 7]],
		['+5', [5, 8]],
		['-5', [5, 6]],
		// should be '(actual relative) - 1' for seventh
		['7', [7, 10]],
		['-7', [7, 9]],
		['+7', [7, 11]],
		['9', [9, 14]],
		['-9', [9, 13]],
		['+9', [9, 15]],
	];
	it.each(cases)(
		"should return degreeToRelativeBaseNote's return value and degree: token = %s",
		(token, expected) => {
			expect(degreeTokenToDegreeAndRelativeNote(token)).toEqual(expected);
		}
	);
});
