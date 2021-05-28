<script lang="ts">
	import { onDestroy } from 'svelte';

	import type { PlayerBase } from '../../service/player';
	import { getTextS } from '../loc';

	import ModalDialog from '../ModalDialog';
	import ChordOptions from './ChordOptions';
	import LanguageSelector from './LanguageSelector';
	import NoteLanguageSelector from './NoteLanguageSelector';
	import PlayerSelector from './PlayerSelector';
	import Question from './Question';
	import Volume from './Volume';

	export let ref: HTMLElement;
	export let player: PlayerBase;

	const title = getTextS('dialog.settings');

	onDestroy(() => title.unsubscribe());

</script>

<ModalDialog bind:ref title={$title}>
	<p><LanguageSelector /></p>
	<p><NoteLanguageSelector /></p>
	<p><PlayerSelector /></p>
	<p><Volume {player} /></p>
	<p><Question /></p>
	<p><ChordOptions /></p>
</ModalDialog>

<style>
</style>
