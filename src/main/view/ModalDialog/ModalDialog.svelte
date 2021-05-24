<script lang="ts">
	import { onDestroy } from 'svelte';

	import { getTextS } from '../loc';
	import * as OverlayMask from '../OverlayMask';

	export let title: string;
	export let ref: HTMLElement;

	function onClose() {
		OverlayMask.hide();
	}

	const buttonClose = getTextS('button.close');
	onDestroy(() => {
		buttonClose.unsubscribe();
	});

</script>

<section class="overlayDialog" role="dialog" aria-modal="true" bind:this={ref}>
	<h2 class="dialogHeader">{title}</h2>
	<div class="dialogContent">
		<slot />
	</div>
	<button class="closeButton" title={$buttonClose} on:click={onClose}
		>×</button
	>
</section>

<style>
	.overlayDialog {
		padding: 8px;
	}
	.overlayDialog .dialogHeader {
		margin: 0 0 8px 0;
		padding: 0 4px 2px 4px;
		background: transparent;
		border: none;
		border-bottom: solid 1px #008;
		color: #008;
		font-size: 1.25rem;
	}
	.overlayDialog .dialogContent {
		margin: 0;
	}

</style>
