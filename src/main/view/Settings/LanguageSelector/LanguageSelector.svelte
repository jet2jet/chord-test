<script lang="ts">
	import { getLanguage, setLanguage } from '../../loc';
	import MESSAGES from '../../loc/messages';

	const languages = (MESSAGES.text.langName as string[]).map(
		(s, i) => [i, s] as const
	);
	let curLang: number = getLanguage();

	$: setLanguage(curLang);

</script>

<label>
	<select size="1" bind:value={curLang}>
		{#each languages as lang}
			<option value={lang[0]}>{lang[1]}</option>
		{/each}
	</select>
</label>
