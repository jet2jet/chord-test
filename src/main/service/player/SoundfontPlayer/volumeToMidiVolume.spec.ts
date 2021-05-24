import volumeToMidiVolume from './volumeToMidiVolume';

describe('volumeToMidiVolume', () => {
	it('should return 12800 * rate value', () => {
		expect(volumeToMidiVolume(1)).toEqual(12800);
		expect(volumeToMidiVolume(0.5)).toEqual(6400);
		expect(volumeToMidiVolume(0.001)).toEqual(Math.floor(12.8));
	});
	it('should return 16383 if the calculated value is larger than 16383', () => {
		expect(volumeToMidiVolume(1.28)).toEqual(16383);
	});
	it('should return 0 if the calculated value is smaller than 0', () => {
		expect(volumeToMidiVolume(-0.1)).toEqual(0);
	});
});
