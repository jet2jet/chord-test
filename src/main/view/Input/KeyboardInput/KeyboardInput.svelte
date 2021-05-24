<script lang="ts">
	import NoteType from '../../../model/NoteType';

	export let root: NoteType = NoteType.C;
	export let keys: boolean[] = [...Array(12)].map(() => false);
	export let fixedRoot: boolean = false;

	function changeRoot(r: NoteType) {
		root = r;
	}
	function toggleKey(i: number) {
		keys[i] = !keys[i];
	}

</script>

<form class="keyboardInput" action="#" on:submit={(e) => e.preventDefault()}>
	<div class="keyboardMain">
		<div class="keyboardSide">
			<!-- prettier-ignore --><button disabled={fixedRoot} on:click={() => changeRoot(NoteType.C_Sharp)} class="root root-upper root-Cs {root === NoteType.C_Sharp ? 'checked' : ''}"title="C♯/D♭ (root)"><span class="selection" role="presentation">↓</span><span class="marker"></span></button>
			<!-- prettier-ignore --><button disabled={fixedRoot} on:click={() => changeRoot(NoteType.D_Sharp)} class="root root-upper root-Ds {root === NoteType.D_Sharp ? 'checked' : ''}"title="D♯/E♭ (root)"><span class="selection" role="presentation">↓</span><span class="marker"></span></button>
			<!-- prettier-ignore --><button disabled={fixedRoot} on:click={() => changeRoot(NoteType.F_Sharp)} class="root root-upper root-Fs {root === NoteType.F_Sharp ? 'checked' : ''}"title="F♯/G♭ (root)"><span class="selection" role="presentation">↓</span><span class="marker"></span></button>
			<!-- prettier-ignore --><button disabled={fixedRoot} on:click={() => changeRoot(NoteType.G_Sharp)} class="root root-upper root-Gs {root === NoteType.G_Sharp ? 'checked' : ''}"title="G♯/A♭ (root)"><span class="selection" role="presentation">↓</span><span class="marker"></span></button>
			<!-- prettier-ignore --><button disabled={fixedRoot} on:click={() => changeRoot(NoteType.A_Sharp)} class="root root-upper root-As {root === NoteType.A_Sharp ? 'checked' : ''}"title="A♯/B♭ (root)"><span class="selection" role="presentation">↓</span><span class="marker"></span></button>
		</div>
		<div class="keyboardCore">
			<!-- prettier-ignore --><button on:click={() => toggleKey(0) } class="key key-C        {keys[0]  ? 'checked' : ''}" title="C"      ><span class="selection"></span><span class="marker"></span></button>
			<!-- prettier-ignore --><button on:click={() => toggleKey(1) } class="key key-s key-Cs {keys[1]  ? 'checked' : ''}" title="C♯/D♭"><span class="selection"></span><span class="marker"></span></button>
			<!-- prettier-ignore --><button on:click={() => toggleKey(2) } class="key key-D        {keys[2]  ? 'checked' : ''}" title="D"      ><span class="selection"></span><span class="marker"></span></button>
			<!-- prettier-ignore --><button on:click={() => toggleKey(3) } class="key key-s key-Ds {keys[3]  ? 'checked' : ''}" title="D♯/E♭"><span class="selection"></span><span class="marker"></span></button>
			<!-- prettier-ignore --><button on:click={() => toggleKey(4) } class="key key-E        {keys[4]  ? 'checked' : ''}" title="E"      ><span class="selection"></span><span class="marker"></span></button>
			<!-- prettier-ignore --><button on:click={() => toggleKey(5) } class="key key-F        {keys[5]  ? 'checked' : ''}" title="F"      ><span class="selection"></span><span class="marker"></span></button>
			<!-- prettier-ignore --><button on:click={() => toggleKey(6) } class="key key-s key-Fs {keys[6]  ? 'checked' : ''}" title="F♯/G♭"><span class="selection"></span><span class="marker"></span></button>
			<!-- prettier-ignore --><button on:click={() => toggleKey(7) } class="key key-G        {keys[7]  ? 'checked' : ''}" title="G"      ><span class="selection"></span><span class="marker"></span></button>
			<!-- prettier-ignore --><button on:click={() => toggleKey(8) } class="key key-s key-Gs {keys[8]  ? 'checked' : ''}" title="G♯/A♭"><span class="selection"></span><span class="marker"></span></button>
			<!-- prettier-ignore --><button on:click={() => toggleKey(9) } class="key key-A        {keys[9]  ? 'checked' : ''}" title="A"      ><span class="selection"></span><span class="marker"></span></button>
			<!-- prettier-ignore --><button on:click={() => toggleKey(10)} class="key key-s key-As {keys[10] ? 'checked' : ''}" title="A♯/B♭"><span class="selection"></span><span class="marker"></span></button>
			<!-- prettier-ignore --><button on:click={() => toggleKey(11)} class="key key-B        {keys[11] ? 'checked' : ''}" title="B"      ><span class="selection"></span><span class="marker"></span></button>
		</div>
		<div class="keyboardSide">
			<!-- prettier-ignore --><button disabled={fixedRoot} on:click={() => changeRoot(NoteType.C)} class="root root-lower root-C {root === NoteType.C ? 'checked' : ''}" title="C (root)"><span class="selection" role="presentation">↑</span><span class="marker"></span></button>
			<!-- prettier-ignore --><button disabled={fixedRoot} on:click={() => changeRoot(NoteType.D)} class="root root-lower root-D {root === NoteType.D ? 'checked' : ''}" title="D (root)"><span class="selection" role="presentation">↑</span><span class="marker"></span></button>
			<!-- prettier-ignore --><button disabled={fixedRoot} on:click={() => changeRoot(NoteType.E)} class="root root-lower root-E {root === NoteType.E ? 'checked' : ''}" title="E (root)"><span class="selection" role="presentation">↑</span><span class="marker"></span></button>
			<!-- prettier-ignore --><button disabled={fixedRoot} on:click={() => changeRoot(NoteType.F)} class="root root-lower root-F {root === NoteType.F ? 'checked' : ''}" title="F (root)"><span class="selection" role="presentation">↑</span><span class="marker"></span></button>
			<!-- prettier-ignore --><button disabled={fixedRoot} on:click={() => changeRoot(NoteType.G)} class="root root-lower root-G {root === NoteType.G ? 'checked' : ''}" title="G (root)"><span class="selection" role="presentation">↑</span><span class="marker"></span></button>
			<!-- prettier-ignore --><button disabled={fixedRoot} on:click={() => changeRoot(NoteType.A)} class="root root-lower root-A {root === NoteType.A ? 'checked' : ''}" title="A (root)"><span class="selection" role="presentation">↑</span><span class="marker"></span></button>
			<!-- prettier-ignore --><button disabled={fixedRoot} on:click={() => changeRoot(NoteType.B)} class="root root-lower root-B {root === NoteType.B ? 'checked' : ''}" title="B (root)"><span class="selection" role="presentation">↑</span><span class="marker"></span></button>
		</div>
	</div>
</form>

<style>
	.keyboardInput {
		display: inline-block;
		border: inset 1px #48f;
	}
	.keyboardMain {
		position: relative;
		display: inline-block;
		vertical-align: top;
	}
	.keyboardSide {
		position: relative;
		box-sizing: content-box;
		height: 20px;
		width: 210px;
		background-color: #ff8;
	}
	.keyboardSide .root {
		position: absolute;
		display: inline-block;
		overflow: hidden;
		top: 0;
		width: 30px;
		height: 20px;
		cursor: pointer;
		background-color: transparent;
		border: none;
	}
	.keyboardSide .root:disabled {
		cursor: default;
	}
	.keyboardSide .root span.selection,
	.keyboardSide .root span.marker {
		position: absolute;
		display: inline-block;
		box-sizing: border-box;
	}
	.keyboardSide .root span.selection {
		text-align: center;
		font-size: 100%;
		color: #f00;
		opacity: 0;
		z-index: 2;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
	}
	.keyboardSide .root:disabled span.selection {
		color: #000;
	}
	.keyboardSide .root span.marker {
		background-color: #fff;
		border-radius: 100%;
		top: 1px;
		bottom: 1px;
	}
	.keyboardSide .root.root-upper span.marker {
		left: 3px;
		right: 3px;
	}
	.keyboardSide .root.root-lower span.marker {
		left: 6px;
		right: 6px;
	}
	.keyboardSide .root:hover:not(:disabled) span.selection {
		opacity: 0.25;
	}
	.keyboardSide .root.checked span.selection {
		opacity: 1;
	}
	.keyboardSide .root.checked:hover:not(:disabled) span.selection {
		opacity: 0.5;
	}
	.keyboardSide .root.checked span.marker {
		background-color: #6cf;
	}
	.keyboardSide .root.checked:disabled span.marker {
		background-color: #ccc;
	}
	.keyboardSide .root:focus span.marker {
		border: dotted 1px #00f;
	}
	.keyboardCore {
		position: relative;
		box-sizing: content-box;
		height: 90px;
		width: 210px;
	}
	.keyboardCore .key {
		position: absolute;
		display: inline-block;
		overflow: hidden;
		box-sizing: border-box;
		top: 0;
		width: 30px;
		height: 90px;
		background-color: #fff;
		border: solid 1px #000;
		cursor: pointer;
	}
	.keyboardCore .key span.selection {
		display: inline-block;
		box-sizing: border-box;
		position: absolute;
		left: 1px;
		top: 1px;
		right: 1px;
		bottom: 1px;
	}
	.keyboardCore .key span.marker {
		display: inline-block;
		box-sizing: border-box;
		position: absolute;
		left: 4px;
		top: 4px;
		right: 4px;
		bottom: 4px;
	}
	.keyboardCore .key:hover span.selection {
		background-color: #cfc;
	}
	.keyboardCore .key.checked span.selection {
		background-color: #4f4;
	}
	.keyboardCore .key.checked:hover span.selection {
		background-color: #cf4;
	}
	.keyboardCore .key:focus span.marker {
		border: dotted 2px rgba(255, 128, 128, 0.75);
		border-radius: 2px;
	}
	.keyboardCore .key.key-s,
	.keyboardSide .root.root-upper {
		width: 24px;
	}
	.keyboardCore .key.key-s {
		height: 60px;
		z-index: 10;
		border: none;
		background-color: #000;
	}
	.keyboardCore .key.key-C,
	.keyboardSide .root.root-C {
		left: 0;
	}
	.keyboardCore .key.key-Cs,
	.keyboardSide .root.root-Cs {
		left: 16px;
	}
	.keyboardCore .key.key-D,
	.keyboardSide .root.root-D {
		left: 30px;
	}
	.keyboardCore .key.key-Ds,
	.keyboardSide .root.root-Ds {
		left: 50px;
	}
	.keyboardCore .key.key-E,
	.keyboardSide .root.root-E {
		left: 60px;
	}
	.keyboardCore .key.key-F,
	.keyboardSide .root.root-F {
		left: 90px;
	}
	.keyboardCore .key.key-Fs,
	.keyboardSide .root.root-Fs {
		left: 104px;
	}
	.keyboardCore .key.key-G,
	.keyboardSide .root.root-G {
		left: 120px;
	}
	.keyboardCore .key.key-Gs,
	.keyboardSide .root.root-Gs {
		left: 138px;
	}
	.keyboardCore .key.key-A,
	.keyboardSide .root.root-A {
		left: 150px;
	}
	.keyboardCore .key.key-As,
	.keyboardSide .root.root-As {
		left: 172px;
	}
	.keyboardCore .key.key-B,
	.keyboardSide .root.root-B {
		left: 180px;
	}

</style>
