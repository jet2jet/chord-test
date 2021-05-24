import EventDispatcher from '../../utils/EventDispatcher';

let _noteLanguage: number = 0;
const _event = new EventDispatcher<number>();

export function getNoteLanguage(): number {
	return _noteLanguage;
}
export function setNoteLanguage(noteLanguage: number): void {
	_noteLanguage = noteLanguage;
	_event.dispatch(noteLanguage);
}
export function listenNoteLanguage(cb: (value: number) => void): () => void {
	return _event.listen(cb);
}
