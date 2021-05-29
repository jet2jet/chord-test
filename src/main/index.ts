import App from './App.svelte';

function initialize() {
	const app = new App({
		target: document.getElementById('MainApp')!,
	});
	return app;
}

if (document.readyState !== 'loading') {
	initialize();
} else {
	document.addEventListener('DOMContentLoaded', initialize, false);
}
