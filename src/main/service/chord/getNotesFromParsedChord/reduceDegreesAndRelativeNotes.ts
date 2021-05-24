import type DegreeAndRelativeNote from '../../../model/DegreeAndRelativeNote';

export default function reduceDegreesAndRelativeNotes(
	base: ReadonlyArray<readonly DegreeAndRelativeNote[]>
): DegreeAndRelativeNote[] {
	return base.reduce<DegreeAndRelativeNote[]>((p, c) => {
		for (const d of c) {
			if (p.some((t) => d[0] === t[0] && d[1] === t[1])) {
				continue;
			}
			p.push(d);
		}
		return p;
	}, []);
}
