<script lang="ts">
	import { onDestroy } from 'svelte';

	import type Chord from '../../../model/Chord';
	import NoteType from '../../../model/NoteType';
	import type { PlayerBase } from '../../../service/player';
	import { getVolume, setVolume } from '../../../service/settings';
	import { getTextS } from '../../loc';
	import PlayChord from '../../PlayChord';

	export let player: PlayerBase;

	const chord: Chord = {
		root: NoteType.C,
		rootSharpFlat: 0,
		type: 0,
		appends: [],
	};

	let volume: number;
	let rootVolume: number;

	[volume, rootVolume] = getVolume();

	$: setVolume(volume, rootVolume);

	const labelVolume = getTextS('label.volume');
	const labelRootVolume = getTextS('label.rootVolume');
	const labelPlayTest = getTextS('label.playTest');

	onDestroy(() => {
		labelVolume.unsubscribe();
		labelRootVolume.unsubscribe();
	});

</script>

<span class="volumeParent">
	<span class="volumeForm">
		<label
			>{$labelVolume}
			<input
				type="range"
				min="0"
				max="2"
				step="0.05"
				bind:value={volume}
			/></label
		>
		<span>{volume}</span>
	</span>
	<span class="volumeForm">
		<label
			>{$labelRootVolume}
			<input
				type="range"
				min="0"
				max="2"
				step="0.05"
				bind:value={rootVolume}
			/></label
		>
		<span>{rootVolume}</span>
	</span>
</span>
<span class="volumeTest">
	{$labelPlayTest}
	<PlayChord {player} {chord} />
</span>

<style>
	.volumeParent,
	.volumeTest {
		display: block;
	}
	.volumeParent .volumeForm {
		display: block;
	}
	.volumeParent .volumeForm label {
		vertical-align: middle;
	}
	.volumeParent .volumeForm span {
		vertical-align: middle;
	}
	.volumeTest {
		margin-top: 8px;
	}

</style>
