/* eslint-disable @typescript-eslint/no-empty-function */

import { mocked } from 'ts-jest/utils';
import type Chord from '../../../model/Chord';

import validateChord from './validateChord';
import validateChordAppends from './validateChordAppends';
import validateChordType from './validateChordType';

jest.mock('./validateChordAppends');
jest.mock('./validateChordType');

describe('validateChord', () => {
	const dummyRoot: any = { __type: 'Root' };
	const dummyRootSharpFlat: any = { __type: 'RootSharpFlat' };
	const dummyType: any = { __type: 'Type' };
	const dummyAppends: any = { __type: 'Appends' };
	const dummyChord: Chord = {
		root: dummyRoot,
		rootSharpFlat: dummyRootSharpFlat,
		type: dummyType,
		appends: dummyAppends,
	};

	beforeEach(() => {
		jest.resetAllMocks();
	});
	it('should not throw any errors if both validateChordAppends and validateChordType do not throw', () => {
		mocked(validateChordAppends).mockImplementation(() => {});
		mocked(validateChordType).mockImplementation(() => {});
		expect(() => validateChord(dummyChord)).not.toThrow();
		expect(validateChordType).toBeCalledWith(dummyType, dummyAppends);
		expect(validateChordAppends).toBeCalledWith(dummyAppends);
	});
	it('should throw an error if validateChordType throws', () => {
		const e = new Error();
		mocked(validateChordAppends).mockImplementation(() => {});
		mocked(validateChordType).mockImplementation(() => {
			throw e;
		});
		expect(() => validateChord(dummyChord)).toThrow(e);
		expect(validateChordType).toBeCalledWith(dummyType, dummyAppends);
		// undefined call
		// expect(validateChordAppends).toBeCalledWith(dummyAppends);
	});
	it('should throw an error if validateChordAppends throws', () => {
		const e = new Error();
		mocked(validateChordAppends).mockImplementation(() => {
			throw e;
		});
		mocked(validateChordType).mockImplementation(() => {});
		expect(() => validateChord(dummyChord)).toThrow(e);
		// undefined call
		// expect(validateChordType).toBeCalledWith(dummyType, dummyAppends);
		expect(validateChordAppends).toBeCalledWith(dummyAppends);
	});
});
