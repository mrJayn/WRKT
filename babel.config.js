// const fs = require('fs')
const path = require('path')
const { resolvePath } = require('babel-plugin-module-resolver')

const projectDir = process.cwd()

const tsConfigFile = path.join(projectDir, 'tsconfig.json')
const tsConfig = require(tsConfigFile)

/**
 * Create alias paths for module-resolver plugin based off tsconfig.json paths
 */
const getResolverAlias = () => {
	const tsConfigPaths = tsConfig?.compilerOptions?.paths || {}
	// remove the "/*" at end of tsConfig paths key and values array
	// and ensure that the paths start with "./"
	const pathAlias = Object.keys(tsConfigPaths)
		.map((tsKey) => {
			const pathsArr = tsConfigPaths[tsKey]
			const key = tsKey.replace('/*', '')
			const paths = pathsArr.map((p) => {
				let newP = p.replace('/*', '')
				return newP.startsWith('./') ? newP : `./${newP}`
			})
			return { key, paths }
		})
		.reduce((obj, item) => {
			return {
				...obj,
				[item.key]: item.paths[0],
			}
		}, {})

	console.debug('  - pathAlias:', pathAlias)

	return pathAlias
}

/**
 * Also add special resolving of the "src" tsconfig paths.
 * This is so "src" used within the common projects (eg within components) correctly resolves
 */
const fixResolvePath = () => (sourcePath, currentFile, opts) => {
	const ret = resolvePath(sourcePath, currentFile, opts)
	if (!sourcePath.startsWith('src')) {
		// ignore non "src" dirs
		return ret
	}
	// common root folder of all apps (ie "c:\git\Monorepo")
	const basePath = path.join(projectDir, '../')

	// currentFile is of form "c:\git\Monorepo\components\src\comps\Foo\Foo.tsx"
	// extract which project this file is in, eg "components"
	const currentFileEndPath = currentFile.substring(basePath.length)
	const currentProject = currentFileEndPath.split(path.sep)[0]

	// sourcePath is the path in the import statement, eg "src/theme"
	// So return path to file in *this* project: eg "c:\git\Monorepo\components\src\theme"
	// out of the box module-resolver was previously returning the app folder eg "c:\git\Monorepo\app1\src\theme"
	const correctResolvedPath = path.join(basePath, currentProject, `./${sourcePath}`)

	console.debug('[ babel.config.js ]')
	console.debug('  - correct-resolved-path:', correctResolvedPath)

	return correctResolvedPath
}

const metro = {
	presets: ['babel-preset-expo'],
	plugins: [
		[
			'module-resolver',
			{
				root: ['.'],
				// alias: {
				// 	'@assets': './assets',
				// 	'@api': './src/api',
				// 	'@components': './src/components',
				// 	'@features': './src/features',
				// 	'@hooks': './src/hooks',
				// 	'@libs': './src/libs',
				// 	'@navigation': './src/navigation',
				// 	'@screens': './src/screens',
				// 	'@utils': './src/utils',
				// 	'@src': './src',
				// 	'@colors': './styles/colors.js',
				// 	'@styles': './styles',
				// },
				alias: getResolverAlias(),
				resolvePath: fixResolvePath(),
			},
		],
		'nativewind/babel',
		'react-native-reanimated/plugin',
	],
}

module.exports = (api) => {
	console.debug('[ babel.config.js ]')
	console.debug('  - api.version:', api.version)
	console.debug('  - api.env:', api.env())
	console.debug('  - process.env.NODE_ENV:', process.env.NODE_ENV)
	console.debug('  - process.env.BABEL_ENV:', process.env.BABEL_ENV)

	api.cache(true)

	return metro
}
