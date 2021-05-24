import loadBinary from './loadBinary';

class MockedXmlHttpRequest {
	public static readonly _instances: MockedXmlHttpRequest[] = [];

	public open = jest.fn();
	public send = jest.fn();
	public onerror: (() => void) | null = null;
	public onreadystatechange: (() => void) | null = null;
	public readyState: number = 0;
	public responseType = '';
	public response: unknown = null;

	constructor() {
		MockedXmlHttpRequest._instances.push(this);
	}
}

describe('loadBinary', () => {
	beforeEach(() => {
		jest.spyOn(window, 'XMLHttpRequest').mockImplementation(
			((() =>
				new MockedXmlHttpRequest()) as unknown) as () => XMLHttpRequest
		);

		MockedXmlHttpRequest._instances.splice(0);
	});

	it('should use XMLHttpRequest and resolve with response', async () => {
		const dummyUrl: any = { __type: 'UrlString' };
		const dummyResponse: any = { __type: 'Response' };

		const promise = loadBinary(dummyUrl);
		expect(MockedXmlHttpRequest._instances.length).toBeGreaterThan(0);
		const theInstance = MockedXmlHttpRequest._instances[0];
		expect(theInstance.open).toHaveBeenCalledWith('GET', dummyUrl);
		expect(theInstance.send).toHaveBeenCalledWith(null);
		expect(theInstance.responseType).toEqual('arraybuffer');
		expect(theInstance.onerror).not.toBeNull();
		expect(theInstance.onreadystatechange).not.toBeNull();

		// success
		theInstance.readyState = 4;
		theInstance.response = dummyResponse;
		theInstance.onreadystatechange!();
		const response = await promise;

		expect(response).toBe(dummyResponse);
	});
	it('should use XMLHttpRequest and reject if error', async () => {
		const dummyUrl: any = { __type: 'UrlString' };

		const promise = loadBinary(dummyUrl);
		expect(MockedXmlHttpRequest._instances.length).toBeGreaterThan(0);
		const theInstance = MockedXmlHttpRequest._instances[0];
		expect(theInstance.open).toHaveBeenCalledWith('GET', dummyUrl);
		expect(theInstance.send).toHaveBeenCalledWith(null);
		expect(theInstance.responseType).toEqual('arraybuffer');
		expect(theInstance.onerror).not.toBeNull();
		expect(theInstance.onreadystatechange).not.toBeNull();

		// error
		theInstance.onerror!();
		await expect(promise).rejects.toThrow();
	});
});
