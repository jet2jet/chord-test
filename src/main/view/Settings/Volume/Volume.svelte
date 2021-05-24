<script lang="ts">
	import { onDestroy } from 'svelte';

	import { getVolume, setVolume } from '../../../service/settings';
	import { getTextS } from '../../loc';

	let volume: number;
	let rootVolume: number;

	[volume, rootVolume] = getVolume();

	$: setVolume(volume, rootVolume);

	const labelVolume = getTextS('label.volume');
	const labelRootVolume = getTextS('label.rootVolume');

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

<style>
	.volumeParent {
		display: inline-block;
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

</style>
