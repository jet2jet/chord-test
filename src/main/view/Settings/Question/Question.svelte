<script lang="ts">
	import { onDestroy } from 'svelte';

	import { isRootFixed, setIsRootFixed } from '../../../service/settings';
	import { getTextS } from '../../loc';

	let fixedRoot: boolean = isRootFixed();

	$: setIsRootFixed(fixedRoot);

	const labelFixedRoot = getTextS('label.fixedRoot');
	onDestroy(() => labelFixedRoot.unsubscribe());

</script>

<label
	><input type="checkbox" bind:checked={fixedRoot} />
	{$labelFixedRoot}</label
>
