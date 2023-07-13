module.exports = function (api) {
	api.cache(true);
	return {
		presets: ['babel-preset-expo'],
		plugins: [
			[
				'module-resolver',
				{
					root: ['.'],
					alias: {
						'@screens': './src/screens/index.js',
						'@components': './src/components/index.js',
						'@data': './data',
						'@config': './src/config.js',
						'@api': './src/api',
					},
				},
			],
			'nativewind/babel',
			'react-native-reanimated/plugin',
		],
	};
};
