<script lang="ts">
	import { onDestroy } from 'svelte';

	import { getTextS } from '../loc';

	import ModalDialog from '../ModalDialog';
	import LanguageSelector from './LanguageSelector';
	import NoteLanguageSelector from './NoteLanguageSelector';
	import PlayerSelector from './PlayerSelector';
	import Question from './Question';
	import Volume from './Volume';

	export let ref: HTMLElement;

	const title = getTextS('dialog.settings');

	onDestroy(() => title.unsubscribe());

</script>

<ModalDialog bind:ref title={$title}>
	<p><LanguageSelector /></p>
	<p><NoteLanguageSelector /></p>
	<p><PlayerSelector /></p>
	<p><Volume /></p>
	<p><Question /></p>
</ModalDialog>

<style>
</style>
