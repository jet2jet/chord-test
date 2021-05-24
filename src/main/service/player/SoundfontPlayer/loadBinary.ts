// eslint-disable-next-line @typescript-eslint/promise-function-async
export default function loadBinary(url: string): Promise<ArrayBuffer> {
	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		xhr.open('GET', url);
		xhr.responseType = 'arraybuffer';
		xhr.onreadystatechange = () => {
			if (xhr.readyState === 4) {
				resolve(xhr.response);
			}
		};
		xhr.onerror = () => {
			reject(new Error('Failed to fetch'));
		};
		xhr.send(null);
	});
}
