import type ChordAppends from '../../../model/ChordAppends';
import type ChordType from '../../../model/ChordType';

const _typeSettings: {
	[type in ChordType]?: number;
} = {};

const _appendSettings: {
	[type in ChordAppends]?: number;
} = {};

let _appendFormat: number = 0;

export function getChordTypeNamePattern(chordType: ChordType): number {
	const r = _typeSettings[chordType];
	return r !== undefined ? r : 0;
}

export function getChordAppendNamePattern(appendType: ChordAppends): number {
	const r = _appendSettings[appendType];
	return r !== undefined ? r : 0;
}

export function getChordAppendFormatPattern(): number {
	return _appendFormat;
}

export function setChordAppendFormatPattern(value: number): void {
	_appendFormat = value;
}
