import ChordMeta from '../../../model/ChordMeta';
import ChordType from '../../../model/ChordType';

export default function chordTypeToMeta(type: ChordType): ChordMeta[] {
	switch (type) {
		default:
			return [];
		case ChordType.Major:
			return [ChordMeta.Required, ChordMeta.Omittable];
		case ChordType.Minor:
			return [ChordMeta.Required, ChordMeta.Omittable];
		case ChordType.Sus4:
			return [ChordMeta.Required, ChordMeta.Omittable];
		case ChordType.Diminish:
			return [ChordMeta.Required, ChordMeta.Required];
		case ChordType.Diminish7:
			return [ChordMeta.Required, ChordMeta.Required, ChordMeta.Required];
		case ChordType.Augment:
			return [ChordMeta.Required, ChordMeta.Required];
		case ChordType.Power:
			return [ChordMeta.Required];
	}
}
