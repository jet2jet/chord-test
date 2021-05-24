<script lang="ts">
	import { onDestroy } from 'svelte';
	import type Chord from '../../model/Chord';
	import NoteType from '../../model/NoteType';
	import {
		generateNotes,
		parseChordName,
		parsedChordToChord,
	} from '../../service/chord';
	import type EventDispatcher from '../../utils/EventDispatcher';
	import {
		getChordName,
		getNoteName,
		getNoteLanguage,
		getTextS,
		listenNoteLanguage,
	} from '../loc';

	import KeyboardInput from './KeyboardInput';

	export let resetter: EventDispatcher<void>;
	export let onInput:
		| ((value: string, chord: Chord | null) => void)
		| undefined = undefined;
	export let root: NoteType = NoteType.C;
	export let notes: NoteType[] = [];
	export let fixedRoot: boolean = false;

	let noteLanguage = getNoteLanguage();
	let keys: boolean[] = [...Array(12)].map(() => false);
	let lastKeys: boolean[] = keys.slice();
	let lastRoot: NoteType = root;

	let value: string = '';
	let parsedChordName: string | null = '';
	let noteNames: string[];

	onDestroy(
		listenNoteLanguage((newLang) => {
			noteLanguage = newLang;
		})
	);

	// clear chord input if keyboard input changed
	$: if (
		root !== lastRoot ||
		keys.some((value, i) => value !== lastKeys[i])
	) {
		value = '';
		parsedChordName = '';
	}
	$: notes = keyboardInputToNotes(keys, root);
	$: noteNames = notes.map((noteVal) =>
		getNoteName(noteVal, 0, noteLanguage)
	);

	function keyboardInputToNotes(keys: boolean[], root: NoteType) {
		const notes = keys
			.map((checked, i) => (checked ? (i as NoteType) : null))
			.filter((v): v is Exclude<typeof v, null> => v !== null);
		if (notes.indexOf(root) < 0) {
			notes.push(root);
		}
		return notes.sort();
	}

	function onInputEvent() {
		let chord: Chord | null = null;
		if (value === '') {
			parsedChordName = '';
		} else {
			try {
				const parsed = parseChordName(value);
				if (!parsed) {
					parsedChordName = null;
				} else if (fixedRoot && parsed.root !== root) {
					parsedChordName = null;
				} else {
					chord = parsedChordToChord(parsed);
					parsedChordName = getChordName(chord);
				}
			} catch {
				parsedChordName = null;
			}
		}
		if (onInput) {
			onInput(value, chord);
		}
		if (chord !== null) {
			const notes = generateNotes(chord, true, () => true);
			for (let i = 0; i < keys.length; ++i) {
				keys[i] = notes.indexOf(i as NoteType) >= 0;
			}
			lastKeys = keys.slice();
			root = chord.root;
			lastRoot = root;
		}
	}

	function onReset() {
		value = '';
		parsedChordName = '';
		keys = [...Array(12)].map(() => false);
	}

	const labelChordInput = getTextS('label.chordInput');
	const labelParsedChord = getTextS('label.parsedChord');
	const messageInvalidChord = getTextS('message.invalidChord');
	const labelRootNote = getTextS('label.rootNote');
	const labelNotes = getTextS('label.notes');
	const unlisten = resetter.listen(onReset);
	onDestroy(() => {
		labelChordInput.unsubscribe();
		labelParsedChord.unsubscribe();
		messageInvalidChord.unsubscribe();
		labelRootNote.unsubscribe();
		labelNotes.unsubscribe();
		unlisten();
	});

</script>

<div class="input">
	<div class="inputField">
		<div class="inputTyped">
			<label
				>{$labelChordInput}
				<input bind:value on:input={onInputEvent} /></label
			>
		</div>
		<div class="inputKeyboard">
			<KeyboardInput bind:keys bind:root {fixedRoot} />
		</div>
	</div>
	<div class="inputValue">
		<div>
			{#if parsedChordName !== ''}
				{$labelParsedChord}
				{parsedChordName !== null
					? `${parsedChordName}`
					: $messageInvalidChord}
			{/if}
		</div>
		<div>
			{$labelRootNote}
			{getNoteName(root, 0, noteLanguage)}
		</div>
		<div>{$labelNotes} {noteNames.join(',')}</div>
	</div>
</div>

<style>
	.input {
		display: block;
	}
	.inputField {
		display: inline-block;
		vertical-align: top;
	}
	.inputValue {
		display: inline-block;
		vertical-align: top;
	}

</style>
