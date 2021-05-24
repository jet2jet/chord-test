<script lang="ts">
	import { onDestroy } from 'svelte';
	import type Chord from '../../../model/Chord';
	import type NoteType from '../../../model/NoteType';
	import {
		getChordMatchScore,
		isChordSame,
		makeRandomChord,
	} from '../../../service/chord';
	import type { PlayerBase } from '../../../service/player';
	import { isRootFixed } from '../../../service/settings';
	import type EventDispatcher from '../../../utils/EventDispatcher';
	import { getChordName, getTextS } from '../../loc';
	import Input from '../../Input';
	import PlayChord from '../../PlayChord';

	export let player: PlayerBase;
	export let isPlaying: boolean;
	export let level: number;
	export let chords: Chord[];
	export let resetter: EventDispatcher<void>;
	export let score: number = 0;
	export let answerMode: boolean;
	let chord: Chord;
	let chordName: string = '';
	let inputRoot: NoteType | undefined;
	let inputNotes: NoteType[];
	let fixedRoot = isRootFixed();
	$: score =
		chord !== undefined && inputRoot !== undefined
			? getChordMatchScore(chord, { root: inputRoot, notes: inputNotes })
			: 0;

	function initialize() {
		for (;;) {
			chord = makeRandomChord(level, Math.random);
			if (chords.some((c) => isChordSame(c, chord))) {
				continue;
			}
			break;
		}
		chords.push(chord);
		chordName = getChordName(chord);
		fixedRoot = isRootFixed();
		if (fixedRoot) {
			inputRoot = chord.root;
			inputNotes = [inputRoot];
		}
	}

	initialize();

	const labelAnswer = getTextS('label.answer');
	const unlisten = resetter.listen(initialize);
	onDestroy(() => {
		labelAnswer.unsubscribe();
		unlisten();
	});

</script>

<div class="question">
	<div class="questionPlay">
		<div class="questionPlayChord">
			<PlayChord {chord} {player} bind:isPlaying />
		</div>
		{#if answerMode}
			<div class="questionAnswer {score === 100 ? '' : 'incorrect'}">
				{$labelAnswer}
				<span class="questionAnswerChordName">{chordName}</span>
			</div>
		{/if}
	</div>
	<div class="questionInput">
		<Input
			{resetter}
			{fixedRoot}
			bind:root={inputRoot}
			bind:notes={inputNotes}
		/>
	</div>
</div>

<style>
	.question .questionPlay {
		display: block;
		margin-bottom: 8px;
	}
	.question .questionPlayChord {
		display: inline-block;
		vertical-align: top;
	}
	.question .questionAnswer {
		display: inline-block;
		vertical-align: top;
	}
	.question .questionAnswer .questionAnswerChordName {
		color: #00f;
	}
	.question .questionAnswer.incorrect .questionAnswerChordName {
		color: #f00;
	}
	.question .questionInput {
		display: block;
	}

</style>
