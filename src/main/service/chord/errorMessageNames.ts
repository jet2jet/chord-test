import ErrorMessageIndex from './ErrorMessageIndex';

const errorMessageNames = {
	[ErrorMessageIndex.NoResult]: 'chordErrorNoResult',
	[ErrorMessageIndex.InvalidRoot]: 'chordErrorInvalidRoot',
	[ErrorMessageIndex.NaturalNotAllowed]: 'chordErrorNaturalNotAllowed',
	[ErrorMessageIndex.SharpFlatOnlySingle]: 'chordErrorSharpFlatOnlySingle',
	[ErrorMessageIndex.InvalidName]: 'chordErrorInvalidName',
	[ErrorMessageIndex.NoMoreNames]: 'chordErrorNoMoreNames',
	[ErrorMessageIndex.InvalidDegree]: 'chordErrorInvalidDegree',
	[ErrorMessageIndex.NoMoreDegrees]: 'chordErrorNoMoreDegrees',
	[ErrorMessageIndex.NoNamePair]: 'chordErrorNoNamePair',
	[ErrorMessageIndex.PowerOnlySingle]: 'chordErrorPowerOnlySingle',
} as const;
export default errorMessageNames;
