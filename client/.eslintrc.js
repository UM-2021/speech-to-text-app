/** @format */

module.exports = {
	env: {
		browser: true,
		node: true,
		es6: true
	},
	root: true,
	plugins: ['@typescript-eslint', 'react'],
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
		'prettier'
	],
	globals: {
		Atomics: 'readonly'
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: 'module'
	},
	rules: {
		'react-hooks/exhaustive-deps': 'error',
		'react-hooks/rules-of-hooks': 'error',
		semi: ['error', 'always'],
		quotes: ['error', 'single'],
		'linebreak-style': ['error', 'windows'],
		'no-duplicate-imports': [
			'error',
			{
				includeExports: true
			}
		],
		'react/prop-types': 0,
		'react/display-name': 0,
		'rest-spread-spacing': ['error', 'never'],
		'jsx-quotes': ['error', 'prefer-double'],
		'prefer-spread': ['error'],
		'prefer-const': 'error',
		'no-useless-call': ['error'],
		'no-trailing-spaces': ['error'],
		'space-before-blocks': ['error', 'always'],
		'no-unused-vars': ['error'],
		'no-floating-decimal': ['error'],
		'comma-dangle': ['error', 'never'],
		'array-bracket-spacing': ['error', 'never'],
		'object-curly-spacing': ['error', 'always'],
		'space-infix-ops': ['error', { int32Hint: false }],
		'switch-colon-spacing': [
			'error',
			{
				after: true,
				before: false
			}
		],
		'space-unary-ops': [
			'error',
			{
				words: true,
				nonwords: false
			}
		],
		'space-before-function-paren': ['error', 'always'],
		'keyword-spacing': [
			'error',
			{
				before: true,
				after: true
			}
		],
		'key-spacing': [
			'error',
			{
				singleLine: {
					beforeColon: false,
					afterColon: true,
					mode: 'strict'
				},
				multiLine: {
					beforeColon: false,
					afterColon: true,
					mode: 'strict'
				}
			}
		],
		'generator-star-spacing': [
			'error',
			{
				before: false,
				after: true
			}
		],
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-alert': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
		'no-explicit-any': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off'
	},
	settings: {
		react: {
			version: 'detect'
		}
	},
	overrides: [
		{
			files: ['*.js', '*.jsx'],
			rules: {
				'@typescript-eslint/explicit-function-return-type': 'off',
				'@typescript-eslint/explicit-module-boundary-types': 'off',
				'@typescript-eslint/no-explicit-any': 'off'
			}
		}
	]
};
