import type ChordType from '../../model/ChordType';
import chordTypeToDegreesAndRelativeNotes from './chordTypeToDegreesAndRelativeNotes';

export default function chordTypeToUsedDegrees(type: ChordType): number[] {
	return chordTypeToDegreesAndRelativeNotes(type).map((a) => a[0]);
}
