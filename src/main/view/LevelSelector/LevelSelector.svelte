<script lang="ts">
	import { onDestroy } from 'svelte';

	import MAX_LEVEL from '../../data/MAX_LEVEL';
	import { getTextS } from '../loc';

	export let level: number = 0;
	const levels = [...Array(MAX_LEVEL + 1)].map((_, i) => i);

	const levelText = getTextS('level');
	onDestroy(() => {
		levelText.unsubscribe();
	});

</script>

<label>
	<select bind:value={level}>
		{#each levels as l}
			<option value={l}>{$levelText} {l + 1}</option>
		{/each}
	</select>
</label>
