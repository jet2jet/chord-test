import type DegreeNumber from './DegreeNumber';

export default interface TokenData {
	/** token */
	t: string;
	/** original (specified) name */
	o: string;
	/** degree number (if available; 0 is invalid) */
	d?: DegreeNumber;
}
