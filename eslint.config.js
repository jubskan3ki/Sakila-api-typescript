// eslint.config.js
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier';
import securityPlugin from 'eslint-plugin-security';

/**
 * ESLint Flat Config for TypeScript API Project (Node 22 ESM)
 */
export default [
	{
		ignores: [
			'node_modules',
			'dist',
			'build',
			'coverage',
			'public/swagger.json',
			'package.json',
			'tsconfig.json',
			'tsoa.json',
		],
	},
	{
		files: ['**/*.ts'],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				project: './tsconfig.json',
				ecmaVersion: 'latest',
				sourceType: 'module',
			},
			globals: {
				NodeJS: 'readonly',
				console: 'readonly',
				process: 'readonly',
			},
		},
		plugins: {
			'@typescript-eslint': tsPlugin,
			import: importPlugin,
			prettier: prettierPlugin,
			security: securityPlugin,
		},
		rules: {
			'prettier/prettier': 'error',
			'@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
			'@typescript-eslint/no-explicit-any': 'warn',
			'@typescript-eslint/ban-ts-comment': 'warn',
			'@typescript-eslint/explicit-function-return-type': 'warn',
			'@typescript-eslint/consistent-type-imports': 'error',
			'@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
			'@typescript-eslint/no-floating-promises': 'error',
			'@typescript-eslint/no-misused-promises': 'error',

			'import/order': [
				'error',
				{
					groups: [['builtin', 'external', 'internal', 'parent', 'sibling', 'index']],
					'newlines-between': 'always',
					alphabetize: { order: 'asc', caseInsensitive: true },
				},
			],
			'import/extensions': [
				'error',
				'ignorePackages',
				{
					ts: 'never',
					js: 'never',
				},
			],
			'import/no-unresolved': 'error',
			'import/no-extraneous-dependencies': [
				'error',
				{
					devDependencies: ['**/*.test.ts', '**/*.spec.ts', '**/test/**'],
				},
			],

			'security/detect-object-injection': 'off',
			'security/detect-non-literal-fs-filename': 'warn',
			'security/detect-child-process': 'warn',
		},
		settings: {
			'import/resolver': {
				typescript: {
					project: './tsconfig.json',
				},
				alias: {
					map: [
						['@controllers', './src/controllers'],
						['@middlewares', './src/middlewares'],
						['@routes', './src/routes'],
						['@utilities', './src/utilities'],
						['@orm', './src/utilities/ORM'],
						['@error', './src/utilities/error'],
						['@models', './src/models'],
						['@config', './src/config'],
					],
					extensions: ['.ts', '.js'],
				},
			},
		},
	},
	{
		files: ['**/*.json'],
		plugins: {
			prettier: prettierPlugin,
		},
		rules: {
			'prettier/prettier': 'error',
		},
	},
];
