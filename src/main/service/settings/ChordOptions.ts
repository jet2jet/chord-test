import EventDispatcher from '../../utils/EventDispatcher';

let _autoAddSeventhForNinth = false;
const _eventAutoAddSeventhForNinth = new EventDispatcher<boolean>();

export function getAutoAddSeventhForNinth(): boolean {
	return _autoAddSeventhForNinth;
}
export function setAutoAddSeventhForNinth(value: boolean): void {
	_autoAddSeventhForNinth = value;
	_eventAutoAddSeventhForNinth.dispatch(value);
}
export function listenAutoAddSeventhForNinth(
	cb: (value: boolean) => void
): () => void {
	return _eventAutoAddSeventhForNinth.listen(cb);
}
