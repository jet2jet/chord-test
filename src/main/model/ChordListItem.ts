import type Chord from '../model/Chord';

type ChordListItem = readonly [
	chord: Chord,
	typeName: string,
	aliasNames: readonly string[]
];
export default ChordListItem;
