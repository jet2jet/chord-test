import type ErrorMessageIndex from './ErrorMessageIndex';

export default class ParseError extends Error {
	public readonly messageIndex: ErrorMessageIndex;
	public readonly args: string[];

	constructor(messageIndex: ErrorMessageIndex, args: string[] = []) {
		const message = `${messageIndex}${
			args.length === 0 ? '' : ` (${args.join(', ')})`
		}`;
		super(message);
		this.name = 'ParseError';
		this.messageIndex = messageIndex;
		this.args = args;
	}
	public toString(): string {
		return `Parse error: ${this.message}`;
	}
}
