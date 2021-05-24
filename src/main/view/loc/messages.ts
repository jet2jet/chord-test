import type ChordAppends from '../../model/ChordAppends';
import type ChordType from '../../model/ChordType';

declare global {
	const MESSAGES: {
		chords: {
			typeNames: Record<ChordType, readonly string[]>;
			appendNames: Record<ChordAppends, readonly string[]>;
			appendFormats: ReadonlyArray<
				readonly [first: string, rest: string]
			>;
		};
		notes: ReadonlyArray<
			readonly [
				C: string,
				D: string,
				E: string,
				F: string,
				G: string,
				A: string,
				B: string
			]
		>;
		symbols: ReadonlyArray<
			readonly [sharp: string, flat: string, prepend?: boolean | 'de']
		>;
		noteLangNames: readonly string[];
		text: Record<string, string[] | Record<string, unknown>>;
	};
}
export default MESSAGES;
