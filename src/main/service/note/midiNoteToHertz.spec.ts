import midiNoteToHertz from './midiNoteToHertz';

describe('midiNoteToHertz', () => {
	it('should calculate correct values', () => {
		expect(midiNoteToHertz(57)).toEqual(220);
		expect(midiNoteToHertz(69)).toEqual(440);
		expect(midiNoteToHertz(76)).toEqual(440 * Math.pow(2, 7 / 12));
	});
});
