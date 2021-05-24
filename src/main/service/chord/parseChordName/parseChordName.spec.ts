import { mocked } from 'ts-jest/utils';

import parseChordName from './parseChordName';

import normalizeInput from './normalizeInput';
import parseRootNote from './parseRootNote';
import parseChordTokens from './parseChordTokens';
import sortTokens from './sortTokens';

jest.mock('./normalizeInput');
jest.mock('./parseRootNote');
jest.mock('./parseChordTokens');
jest.mock('./sortTokens');

describe('parseChordName', () => {
	it('should return null if normalized input is empty', () => {
		const dummyInput = 'dummy';

		mocked(normalizeInput).mockReturnValueOnce('');
		expect(parseChordName(dummyInput)).toBeNull();
		expect(normalizeInput).toHaveBeenCalledWith(dummyInput);
	});
	it('should return root and sorted tokens if normalized input is not empty', () => {
		const dummyInput = 'dummy2';
		const dummyNormalized = 'dummyNormalized';
		const dummyRoot: any = { __type: 'DummmyRoot' };
		const dummyRootSharpFlat: any = { __type: 'DummmyRootSharpFlat' };
		const dummyRestInput = 'dummyRest';
		const dummyTokens: any = { __type: 'Tokens' };
		const dummySortedTokens: any = { __type: 'SortedTokens' };

		mocked(normalizeInput).mockReturnValueOnce(dummyNormalized);
		mocked(parseRootNote).mockReturnValueOnce([
			dummyRoot,
			dummyRootSharpFlat,
			dummyRestInput,
		]);
		mocked(parseChordTokens).mockReturnValueOnce(dummyTokens);
		mocked(sortTokens).mockReturnValueOnce(dummySortedTokens);

		expect(parseChordName(dummyInput)).toEqual({
			root: dummyRoot,
			rootSharpFlat: dummyRootSharpFlat,
			tokens: dummySortedTokens,
		});
		expect(normalizeInput).toHaveBeenCalledWith(dummyInput);
		expect(parseRootNote).toHaveBeenCalledWith(dummyNormalized);
		expect(parseChordTokens).toHaveBeenCalledWith(dummyRestInput);
		expect(sortTokens).toHaveBeenCalledWith(dummyTokens);
	});
});
