export default class EventDispatcher<T> {
	private readonly _cbs: Array<(arg: T) => void> = [];

	public listen(cb: (arg: T) => void): () => void {
		this._cbs.push(cb);
		return () => {
			const cbs = this._cbs;
			for (let i = cbs.length - 1; i >= 0; --i) {
				if (cbs[i] === cb) {
					cbs.splice(i, 1);
					break;
				}
			}
		};
	}
	public dispatch(arg: T): void {
		const cbs = this._cbs.slice();
		for (const cb of cbs) {
			cb(arg);
		}
	}
}
