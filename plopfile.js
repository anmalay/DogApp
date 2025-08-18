export default (plop) => {
	plop.setGenerator('page', {
		description: 'Compositional layer to construct full pages from entities, features and widgets.',
		prompts: [
			{
				type: 'input',
				name: 'name',
				message: 'Enter name',
			},
		],
		actions: function () {
			const actions = [
				{
					type: 'add',
					path: 'src/pages/{{name}}/ui/{{name}}/{{name}}.tsx',
					templateFile: 'src/templates/pages/ui/Page.tsx.hbs',
				},
				{
					type: 'add',
					path: 'src/pages/{{name}}/ui/{{name}}/{{name}}.lazy.tsx',
					templateFile: 'src/templates/pages/ui/Page.lazy.tsx.hbs',
				},
				{
					type: 'add',
					path: 'src/pages/{{name}}/ui/{{name}}/{{name}}.module.css',
					templateFile: 'src/templates/pages/ui/Page.module.css.hbs',
				},
				{
					type: 'add',
					path: 'src/pages/{{name}}/index.ts',
					template: `export * from "./ui/{{pascalCase name}}/{{pascalCase name}}.lazy";`,
				},
			];
			return actions;
		},
	});

	plop.setGenerator('ui', {
		description: 'UI component',
		prompts: [
			{
				type: 'list',
				name: 'layer',
				choices: ['pages', 'widgets', 'features', 'entities', 'shared'],
				message: 'Select layer',
			},
			{
				type: 'input',
				name: 'slice',
				message: 'Slice name',
			},
			{
				type: 'input',
				name: 'name',
				message: 'UI name',
			},
		],
		actions: function (data) {
			const slicePath = data.layer !== 'shared' ? '/' + data.slice : '';
			const indexSlicePath = data.layer !== 'shared' ? '/' + data.slice : '/ui';
			const importSlicePath = data.layer !== 'shared' ? '/ui' : '';
			return [
				{
					type: 'add',
					path: 'src/{{layer}}' + slicePath + '/ui/{{pascalCase name}}/{{pascalCase name}}.tsx',
					templateFile: 'src/templates/ui/Ui.tsx.hbs',
				},
				{
					type: 'add',
					path: 'src/{{layer}}' + slicePath + '/ui/{{pascalCase name}}/{{pascalCase name}}.module.css',
					templateFile: 'src/templates/ui/Ui.module.scss.hbs', // используем существующий файл
				},
				{
					type: 'add',
					path: 'src/{{layer}}' + indexSlicePath + '/index.ts',
					template: '',
					skipIfExists: true,
				},
				{
					type: 'append',
					path: 'src/{{layer}}' + indexSlicePath + '/index.ts',
					template: `export * from ".${importSlicePath}/{{pascalCase name}}/{{pascalCase name}}";`,
				},
			];
		},
	});
};
