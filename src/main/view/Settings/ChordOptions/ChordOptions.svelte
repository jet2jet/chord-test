<script lang="ts">
	import { onDestroy } from 'svelte';

	import {
		getAutoAddSeventhForNinth,
		setAutoAddSeventhForNinth,
	} from '../../../service/settings';
	import { getTextS } from '../../loc';

	let autoAddSeventhForNinth: boolean = getAutoAddSeventhForNinth();

	$: setAutoAddSeventhForNinth(autoAddSeventhForNinth);

	const labelAddSeventhForNinth = getTextS('label.autoAddSeventhForNinth');
	onDestroy(() => labelAddSeventhForNinth.unsubscribe());

</script>

<label
	><input type="checkbox" bind:checked={autoAddSeventhForNinth} />
	{$labelAddSeventhForNinth}</label
>
