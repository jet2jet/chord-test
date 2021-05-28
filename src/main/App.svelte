<script lang="ts">
	import { onDestroy } from 'svelte';
	import {
		OscillatorPlayer,
		SoundfontPlayer,
		PlayerBase,
	} from './service/player';
	import {
		getVolume,
		listenVolume,
		listenPlayer,
		PlayerType,
		PLAYER_PIANO,
		getPlayer,
	} from './service/settings';
	import EventDispatcher from './utils/EventDispatcher';
	import Question from './view/Question';
	import LevelSelector from './view/LevelSelector';
	import { getTextS } from './view/loc';
	import * as OverlayMask from './view/OverlayMask';
	import Settings from './view/Settings';

	let player: PlayerBase;
	let oscillatorPlayer: OscillatorPlayer;
	let soundfontPlayer: SoundfontPlayer;
	let level: number = 0;
	let inTest: boolean = false;
	let initializing = true;
	let resetDispatcher = new EventDispatcher<void>();

	let settingsElement: HTMLElement;

	initialize();

	function initialize() {
		const unlistenPlayer = listenPlayer(updatePlayer);
		const unlistenVolume = listenVolume(updateVolume);
		onDestroy(() => {
			unlistenPlayer();
			unlistenVolume();
		});

		const ctx = new AudioContext();
		oscillatorPlayer = new OscillatorPlayer(ctx);
		SoundfontPlayer.instantiate(ctx).then((p) => {
			soundfontPlayer = p;

			initializing = false;

			updatePlayer(getPlayer());
			updateVolume(getVolume());
		});
	}

	function updatePlayer(playerType: PlayerType) {
		if (initializing) {
			return;
		}
		player =
			playerType === PLAYER_PIANO ? soundfontPlayer : oscillatorPlayer;
	}

	function updateVolume([volume, rootVolume]: [
		volume: number,
		rootVolume: number
	]) {
		if (player === undefined) {
			return;
		}
		player.volume = volume;
		player.rootVolume = rootVolume;
	}

	function start() {
		inTest = true;
		resetDispatcher.dispatch();
	}

	function showSettings() {
		OverlayMask.show(settingsElement);
	}

	const messageInitializing = getTextS('message.initializing');
	const buttonSettings = getTextS('button.settings');
	const buttonStart = getTextS('button.start');
	const buttonRetry = getTextS('button.retry');

	onDestroy(() => {
		buttonSettings.unsubscribe();
		buttonStart.unsubscribe();
		buttonRetry.unsubscribe();
	});

</script>

<div class="main">
	<p>
		<LevelSelector bind:level />
		<button on:click={showSettings}>{$buttonSettings}</button>
	</p>
	{#if !inTest}
		{#if initializing}
			<p>{$messageInitializing}</p>
		{/if}
		{#if !initializing}
			<p><button on:click={start}>{$buttonStart}</button></p>
		{/if}
	{/if}
	{#if inTest}
		<p><button on:click={start}>{$buttonRetry}</button></p>
		<Question {player} {level} resetter={resetDispatcher} />
		<p>
			<LevelSelector bind:level />
			<button on:click={start}>{$buttonRetry}</button>
		</p>
	{/if}
	<Settings bind:ref={settingsElement} {player} />
</div>

<style>
	div.main {
		margin: 16px;
	}

</style>
