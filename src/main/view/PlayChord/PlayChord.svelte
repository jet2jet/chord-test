<script lang="ts">
	import { onDestroy } from 'svelte';

	import type Chord from '../../model/Chord';
	import type { PlayerBase } from '../../service/player';
	import { playChord } from '../../service/player';
	import { getTextS } from '../loc';

	export let chord: Chord;
	export let player: PlayerBase;
	export let isPlaying: boolean = false;

	function doPlay() {
		if (isPlaying) {
			return;
		}
		isPlaying = true;
		playChord(player, chord, true, 42, 60, 2).then(() => {
			isPlaying = false;
		});
	}

	const buttonPlay = getTextS('button.play');
	const buttonPlaying = getTextS('button.playing');

	onDestroy(() => {
		buttonPlay.unsubscribe();
	});

</script>

<button on:click={doPlay}>{isPlaying ? $buttonPlaying : $buttonPlay}</button>
