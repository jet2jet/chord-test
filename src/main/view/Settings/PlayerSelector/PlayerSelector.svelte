<script lang="ts">
	import {
		setPlayer,
		PlayerType,
		PLAYER_PIANO,
		PLAYER_MACHINE,
	} from '../../../service/settings';

	import { getTextS } from '../../loc';

	export let playerValue: PlayerType = PLAYER_PIANO;

	const labelPlayerSelect = getTextS('label.playerSelect');
	const labelPlayerPiano = getTextS('label.playerPiano');
	const labelPlayerMachine = getTextS('label.playerMachine');

	$: setPlayer(playerValue);

</script>

<label
	>{$labelPlayerSelect}
	<select bind:value={playerValue}>
		<option value={PLAYER_PIANO}>{$labelPlayerPiano}</option>
		<option value={PLAYER_MACHINE}>{$labelPlayerMachine}</option>
	</select>
</label>
