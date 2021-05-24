import { generateNotes, makeRandomChord } from './service/chord';
import { OscillatorPlayer } from './service/player';

import App from './App.svelte';

function getGlobal(this: any): any {
	if (typeof window !== 'undefined') {
		return window;
	} else if (typeof global !== 'undefined') {
		return global;
	} else {
		return this;
	}
}

function initialize() {
	const app = new App({
		target: document.getElementById('MainApp')!,
	});
	return app;
}

getGlobal().ChordTest = {
	generateNotes,
	makeRandomChord,
	player: OscillatorPlayer,
};

if (document.readyState !== 'loading') {
	initialize();
} else {
	document.addEventListener('DOMContentLoaded', initialize, false);
}
