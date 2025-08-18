module.exports = {
	createOldCatalogs: true,

	lexers: {
		ts: ['JavascriptLexer'],
		tsx: ['JsxLexer'],
		default: ['JavascriptLexer'],
	},

	locales: ['en', 'ru'],

	keySeparator: false,
	nsSeparator: false,
	namespaceSeparator: false,
	verbose: false,

	output: 'src/i18n/translations/$NAMESPACE.$LOCALE.json',

	input: ['src/**/*.tsx', 'src/**/*.ts'],
};
