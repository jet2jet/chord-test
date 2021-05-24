import { writable, Readable } from 'svelte/store';
import MESSAGES from './messages';

let language: number = 0;
const _languageListeners: Array<() => void> = [];

export interface TextStore extends Readable<string> {
	unsubscribe: (this: unknown) => void;
}

export function getLanguage(): number {
	return language;
}

export function setLanguage(value: number): void {
	language = value;
	for (const cb of _languageListeners) {
		cb();
	}
}

function getTextData(label: string): [string, ...string[]] {
	const labelTokens = label.split('.');
	let obj: string[] | Record<string, unknown> = MESSAGES.text;
	for (const token of labelTokens) {
		if (obj instanceof Array) {
			return [`#msg:${label}`];
		}
		if (obj[token] === undefined) {
			return [`#msg:${label}`];
		}
		obj = obj[token] as string[] | Record<string, unknown>;
	}
	if (!(obj instanceof Array)) {
		return [`#msg:${label}`];
	}
	if (obj[0] === undefined) {
		return [`#msg:${label}`];
	}
	return obj as [string, ...string[]];
}

export function getText(label: string): string {
	const obj = getTextData(label);
	let lang = language;
	if (!(lang in obj)) {
		lang = 0;
	}
	return obj[language];
}

export function getTextS(label: string): TextStore {
	const obj = getTextData(label);
	let lang = language;
	if (!(lang in obj)) {
		lang = 0;
	}
	const r = writable<string>(obj[lang]);
	const cb = () => {
		let lang = language;
		if (!(lang in obj)) {
			lang = 0;
		}
		r.set(obj[lang]);
	};
	_languageListeners.push(cb);
	const unsubscribe = () => {
		const i = _languageListeners.indexOf(cb);
		if (i >= 0) {
			_languageListeners.splice(i, 1);
		}
	};
	return {
		subscribe: r.subscribe,
		unsubscribe,
	};
}
