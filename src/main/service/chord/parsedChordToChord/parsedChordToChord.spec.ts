import { mocked } from 'ts-jest/utils';
import type Chord from '../../../model/Chord';
import ChordAppends from '../../../model/ChordAppends';
import ChordType from '../../../model/ChordType';
import pickupChordByName from '../pickupChordByName';
import degreeToAppends from './degreeToAppends';
import parsedChordToChord from './parsedChordToChord';

jest.mock('../pickupChordByName');
jest.mock('./degreeToAppends');

describe('parsedChordToChord', () => {
	const dummyRoot: any = { __type: 'Root' };
	const dummyRootSharpFlat: any = { __type: 'RootSharpFlat' };

	const dummyTokenRegistered: any = { __type: 'TokenRegistered' };
	const dummyTokenDegree1: any = { __type: 'TokenDegree1' };
	const dummyTokenDegree2: any = { __type: 'TokenDegree2' };
	const dummyTokenDegreeSeventh: any = { __type: 'TokenDegreeSeventh' };
	const dummyTokenDegreeMajor7: any = { __type: 'TokenDegreeSeventh' };
	const dummyTokenDegreeNinth: any = { __type: 'TokenDegreeNinth' };
	const dummyTokenNone: any = { __type: 'TokenNone' };
	const dummyTokenDataRegistered: any = { t: dummyTokenRegistered };
	const dummyTokenDataDegree1: any = { t: dummyTokenDegree1, d: 1 };
	const dummyTokenDataDegree2: any = { t: dummyTokenDegree2 };
	const dummyTokenDataDegreeSeventh: any = { t: dummyTokenDegreeSeventh };
	const dummyTokenDataDegreeMajor7: any = { t: dummyTokenDegreeMajor7 };
	const dummyTokenDataDegreeNinth: any = {
		t: dummyTokenDegreeNinth,
		d: 9,
	};
	const dummyTokenDataUnknown: any = { t: dummyTokenNone };
	const dummyRegisteredType: any = { __type: 'RegisteredType' };
	const dummyRegisteredAppends: any = { __type: 'RegisteredAppends' };
	const dummyDegreeAppends1: any = { __type: 'DegreeAppends1' };
	const dummyDegreeAppends2: any = { __type: 'DegreeAppends2' };
	const dummyDegreeAppendsNinth: any = { __type: 'DegreeAppendsNinth' };

	beforeEach(() => {
		mocked(pickupChordByName).mockImplementation((name) =>
			name === dummyTokenRegistered
				? ([
						[
							{
								type: dummyRegisteredType,
								appends: [dummyRegisteredAppends],
							},
						],
				  ] as any)
				: null
		);
		mocked(degreeToAppends).mockImplementation((degreeString) =>
			degreeString === dummyTokenDegree1
				? dummyDegreeAppends1
				: degreeString === dummyTokenDegree2
				? dummyDegreeAppends2
				: degreeString === dummyTokenDegreeSeventh
				? ChordAppends.Seventh
				: degreeString === dummyTokenDegreeMajor7
				? ChordAppends.Major7
				: degreeString === dummyTokenDegreeNinth
				? dummyDegreeAppendsNinth
				: null
		);
	});

	it('should return major chord if no tokens are specified', () => {
		expect(
			parsedChordToChord(
				{
					root: dummyRoot,
					rootSharpFlat: dummyRootSharpFlat,
					tokens: [],
				},
				false
			)
		).toEqual<Chord>({
			root: dummyRoot,
			rootSharpFlat: dummyRootSharpFlat,
			type: ChordType.Major,
			appends: [],
		});
	});
	it('should return major chord if the unknown token is included', () => {
		expect(
			parsedChordToChord(
				{
					root: dummyRoot,
					rootSharpFlat: dummyRootSharpFlat,
					tokens: [dummyTokenDataUnknown],
				},
				false
			)
		).toEqual<Chord>({
			root: dummyRoot,
			rootSharpFlat: dummyRootSharpFlat,
			type: ChordType.Major,
			appends: [],
		});
	});
	it('should return registered chord if the registered chord token is included', () => {
		expect(
			parsedChordToChord(
				{
					root: dummyRoot,
					rootSharpFlat: dummyRootSharpFlat,
					tokens: [dummyTokenDataRegistered],
				},
				false
			)
		).toEqual<Chord>({
			root: dummyRoot,
			rootSharpFlat: dummyRootSharpFlat,
			type: dummyRegisteredType,
			appends: [dummyRegisteredAppends],
		});
	});
	it('should return major chord with appends if the degree token is included', () => {
		expect(
			parsedChordToChord(
				{
					root: dummyRoot,
					rootSharpFlat: dummyRootSharpFlat,
					tokens: [dummyTokenDataDegree1],
				},
				false
			)
		).toEqual<Chord>({
			root: dummyRoot,
			rootSharpFlat: dummyRootSharpFlat,
			type: ChordType.Major,
			appends: [dummyDegreeAppends1],
		});
		expect(
			parsedChordToChord(
				{
					root: dummyRoot,
					rootSharpFlat: dummyRootSharpFlat,
					tokens: [dummyTokenDataDegree2],
				},
				false
			)
		).toEqual<Chord>({
			root: dummyRoot,
			rootSharpFlat: dummyRootSharpFlat,
			type: ChordType.Major,
			appends: [dummyDegreeAppends2],
		});
	});
	it('should return registered chord with appends if the registered chord token and the degree tokens are included', () => {
		expect(
			parsedChordToChord(
				{
					root: dummyRoot,
					rootSharpFlat: dummyRootSharpFlat,
					tokens: [
						dummyTokenDataRegistered,
						dummyTokenDataDegree1,
						dummyTokenDataDegree2,
					],
				},
				false
			)
		).toEqual<Chord>({
			root: dummyRoot,
			rootSharpFlat: dummyRootSharpFlat,
			type: dummyRegisteredType,
			appends: expect.arrayContaining([
				dummyRegisteredAppends,
				dummyDegreeAppends1,
				dummyDegreeAppends2,
			]),
		});
	});
	describe('for ninth chord', () => {
		it('should return major chord with two appends with only Ninth token (Seventh token is not included)', () => {
			expect(
				parsedChordToChord(
					{
						root: dummyRoot,
						rootSharpFlat: dummyRootSharpFlat,
						tokens: [dummyTokenDataDegreeNinth],
					},
					true
				)
			).toEqual<Chord>({
				root: dummyRoot,
				rootSharpFlat: dummyRootSharpFlat,
				type: ChordType.Major,
				appends: [ChordAppends.Seventh, dummyDegreeAppendsNinth],
			});
		});
		it('should return major chord with two appends with Ninth token and Seventh token', () => {
			expect(
				parsedChordToChord(
					{
						root: dummyRoot,
						rootSharpFlat: dummyRootSharpFlat,
						tokens: [
							dummyTokenDataDegreeNinth,
							dummyTokenDataDegreeSeventh,
						],
					},
					true
				)
			).toEqual<Chord>({
				root: dummyRoot,
				rootSharpFlat: dummyRootSharpFlat,
				type: ChordType.Major,
				appends: [dummyDegreeAppendsNinth, ChordAppends.Seventh],
			});
		});
		it('should return major chord with two appends with Ninth token and Major7 token', () => {
			expect(
				parsedChordToChord(
					{
						root: dummyRoot,
						rootSharpFlat: dummyRootSharpFlat,
						tokens: [
							dummyTokenDataDegreeNinth,
							dummyTokenDataDegreeMajor7,
						],
					},
					true
				)
			).toEqual<Chord>({
				root: dummyRoot,
				rootSharpFlat: dummyRootSharpFlat,
				type: ChordType.Major,
				appends: [dummyDegreeAppendsNinth, ChordAppends.Major7],
			});
		});
		it('should return major chord with one appends with only Ninth token (Seventh token is not included) when autoAddSevenForNinth is false', () => {
			expect(
				parsedChordToChord(
					{
						root: dummyRoot,
						rootSharpFlat: dummyRootSharpFlat,
						tokens: [dummyTokenDataDegreeNinth],
					},
					false
				)
			).toEqual<Chord>({
				root: dummyRoot,
				rootSharpFlat: dummyRootSharpFlat,
				type: ChordType.Major,
				appends: [dummyDegreeAppendsNinth],
			});
		});
	});
});
