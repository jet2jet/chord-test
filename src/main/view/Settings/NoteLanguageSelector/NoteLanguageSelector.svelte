<script lang="ts">
	import { onDestroy } from 'svelte';

	import {
		getNoteLanguage,
		listenNoteLanguage,
		setNoteLanguage,
	} from '../../../service/settings';

	import { getTextS } from '../../loc';

	import MESSAGES from '../../loc/messages';

	let noteLanguages = MESSAGES.noteLangNames.map((s, i) => [i, s] as const);
	let curLang = getNoteLanguage();

	$: setNoteLanguage(curLang);

	const labelNoteLanguage = getTextS('label.noteLanguage');

	const unlisten = listenNoteLanguage((newVal) => {
		if (curLang !== newVal) {
			curLang = newVal;
		}
	});
	onDestroy(() => {
		labelNoteLanguage.unsubscribe();
		unlisten();
	});

</script>

<label>
	{$labelNoteLanguage}
	<select size="1" bind:value={curLang}>
		{#each noteLanguages as noteLang}
			<option value={noteLang[0]}>{noteLang[1]}</option>
		{/each}
	</select>
</label>
