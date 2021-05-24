<script lang="ts">
	import { onDestroy } from 'svelte';
	import type Chord from '../../model/Chord';

	import type { PlayerBase } from '../../service/player';
	import type EventDispatcher from '../../utils/EventDispatcher';
	import { getText, getTextS } from '../loc';
	import ChordQuestion from './ChordQuestion';

	export let player: PlayerBase;
	export let level: number;
	export let resetter: EventDispatcher<void>;
	let chords: Chord[] = [];
	let scores: number[] = [...Array(5)].map(() => 0);
	let totalScore = 0;
	let totalScoreOnAnswer = 0;
	let answerMode = false;
	let tableElement: HTMLElement;
	let isPlaying: boolean = false;
	let theShareText: string = '';
	let elemShareTextField: HTMLInputElement | undefined;
	let copied: boolean = false;
	let copiedTimer: ReturnType<typeof setTimeout> | null = null;

	$: totalScore = scores.reduce(
		(prev, score) => prev + score / scores.length,
		0
	);

	function onAnswer() {
		answerMode = true;
		totalScoreOnAnswer = totalScore;

		const thisUrl = location.href;

		theShareText = getText('message.shareText')
			.replace(/\$score/g, `${totalScoreOnAnswer}`)
			.replace(/\$level/g, `${level + 1}`)
			.replace(/\$url/g, thisUrl);
	}

	function onReset() {
		chords.splice(0);
		answerMode = false;
		window.scrollTo(0, tableElement.offsetTop);
	}

	function doCopy() {
		if (elemShareTextField === undefined) {
			return;
		}
		if (copiedTimer !== null) {
			clearTimeout(copiedTimer);
		}
		elemShareTextField.select();
		document.execCommand('copy');
		copied = true;
		copiedTimer = setTimeout(() => {
			copied = false;
			copiedTimer = null;
		}, 5000);
	}

	const buttonAnswer = getTextS('button.answer');
	const buttonCopy = getTextS('button.copy');
	const labelScore = getTextS('label.score');
	const labelChangedScore = getTextS('label.changedScore');
	const labelShareText = getTextS('label.shareText');
	const messageCopied = getTextS('message.copied');

	const unlisten = resetter.listen(onReset);
	onDestroy(() => {
		buttonAnswer.unsubscribe();
		labelScore.unsubscribe();
		labelChangedScore.unsubscribe();
		unlisten();
	});

</script>

<div
	bind:this={tableElement}
	class="questionTable {answerMode ? 'answerMode' : ''}"
>
	<section class="questionItem">
		<h2 class="questionHeader">No.1</h2>
		<ChordQuestion
			{player}
			bind:isPlaying
			{answerMode}
			{level}
			{chords}
			{resetter}
			bind:score={scores[0]}
		/>
	</section>
	<section class="questionItem">
		<h2 class="questionHeader">No.2</h2>
		<ChordQuestion
			{player}
			bind:isPlaying
			{answerMode}
			{level}
			{chords}
			{resetter}
			bind:score={scores[1]}
		/>
	</section>
	<section class="questionItem">
		<h2 class="questionHeader">No.3</h2>
		<ChordQuestion
			{player}
			bind:isPlaying
			{answerMode}
			{level}
			{chords}
			{resetter}
			bind:score={scores[2]}
		/>
	</section>
	<section class="questionItem">
		<h2 class="questionHeader">No.4</h2>
		<ChordQuestion
			{player}
			bind:isPlaying
			{answerMode}
			{level}
			{chords}
			{resetter}
			bind:score={scores[3]}
		/>
	</section>
	<section class="questionItem">
		<h2 class="questionHeader">No.5</h2>
		<ChordQuestion
			{player}
			bind:isPlaying
			{answerMode}
			{level}
			{chords}
			{resetter}
			bind:score={scores[4]}
		/>
	</section>
	{#if !answerMode}
		<section class="questionShowAnswer">
			<button on:click={onAnswer}>{$buttonAnswer}</button>
		</section>
	{/if}
	{#if answerMode}
		<section class="questionResult">
			<p class="questionScoreField">
				{$labelScore}
				<span class="questionTotalScore">{totalScoreOnAnswer}</span>
				{#if totalScoreOnAnswer !== totalScore}
					<span class="questionChangedScore"
						>({$labelChangedScore}
						{totalScore})</span
					>
				{/if}
			</p>
			<p>
				{$labelShareText}
				<input
					type="text"
					readonly={true}
					value={theShareText}
					bind:this={elemShareTextField}
				/><button on:click={doCopy}>{$buttonCopy}</button
				>{#if copied}<br />{$messageCopied}{/if}
			</p>
		</section>
	{/if}
</div>

<style>
	.questionTable {
		margin: 0;
		padding: 0;
	}
	.questionTable .questionItem {
		margin: 8px 0;
		padding: 8px;
		display: block;
		border: solid 1px;
	}
	.questionTable .questionItem:nth-child(1) {
		border-color: #6ff;
		background-color: #dff;
	}
	.questionTable .questionItem:nth-child(2) {
		border-color: #f6f;
		background-color: #fdf;
	}
	.questionTable .questionItem:nth-child(3) {
		border-color: #ff6;
		background-color: #ffd;
	}
	.questionTable .questionItem:nth-child(4) {
		border-color: #8f4;
		background-color: #efd;
	}
	.questionTable .questionItem:nth-child(5) {
		border-color: #48f;
		background-color: #def;
	}
	.questionTable .questionItem .questionHeader {
		font-size: 1.25rem;
		font-weight: bold;
		padding: 0 4px 2px 4px;
		margin: 0 0 8px 0;
		border: none;
		border-bottom: 1px solid;
		border-bottom-color: inherit;
		background-color: transparent;
	}

	.questionScoreField {
		font-size: 1.25rem;
	}
	.questionScoreField .questionTotalScore {
		font-weight: bold;
		color: #00f;
	}
	.questionScoreField .questionChangedScore {
		font-size: 1rem;
		color: #888;
	}

</style>
