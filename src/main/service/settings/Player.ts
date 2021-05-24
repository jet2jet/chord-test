import EventDispatcher from '../../utils/EventDispatcher';

export const PLAYER_PIANO = 0;
export const PLAYER_MACHINE = 1;
export type PlayerType = typeof PLAYER_PIANO | typeof PLAYER_MACHINE;

let _player: PlayerType = PLAYER_PIANO;
let _volume = 0.75;
let _rootVolume = 1;

const _playerDispatcher = new EventDispatcher<PlayerType>();
const _volumeDispatcher = new EventDispatcher<
	[volume: number, rootVolume: number]
>();

export function getPlayer(): PlayerType {
	return _player;
}
export function setPlayer(player: PlayerType): void {
	_player = player;
	_playerDispatcher.dispatch(player);
}
export function listenPlayer(cb: (player: PlayerType) => void): () => void {
	return _playerDispatcher.listen(cb);
}

export function getVolume(): [volume: number, rootVolume: number] {
	return [_volume, _rootVolume];
}
export function setVolume(volume: number, rootVolume: number): void {
	_volume = volume;
	_rootVolume = rootVolume;
	_volumeDispatcher.dispatch([volume, rootVolume]);
}
export function listenVolume(
	cb: (data: [volume: number, rootVolume: number]) => void
): () => void {
	return _volumeDispatcher.listen(cb);
}
