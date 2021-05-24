module.exports = {
	preset: 'ts-jest',
	cacheDirectory: '<rootDir>/.jest_cache',
	clearMocks: true,
	collectCoverageFrom: [
		'src/main/**/*.{ts,tsx}',
		'!src/main/**/*.spec.{ts,tsx}',
	],
	moduleDirectories: ['node_modules', 'src/test/mockModules'],
	testEnvironment: 'jsdom',
	testMatch: ['<rootDir>/src/main/**/*.spec.ts'],
	globals: {
		'ts-jest': {
			tsconfig: 'tsconfig.test.json',
		},
		// eslint-disable-next-line @typescript-eslint/naming-convention
		CTWorkerName: '',
		// eslint-disable-next-line @typescript-eslint/naming-convention
		CTWorkletName: '',
		// eslint-disable-next-line @typescript-eslint/naming-convention
		CTWorkerDeps: [],
		// eslint-disable-next-line @typescript-eslint/naming-convention
		CTPianoSF2: '',
	},
};
