const autoprefixer = require('autoprefixer')
const postcssNested = require('postcss-nested')

module.exports = options => ({
	progress: true,
	colors: true,
	postcss: () => {
    return [
      postcssNested,
      autoprefixer
    ];
  },
	resolve: {
		extensions: ['', '.js'],
	},
	resolveLoader: { 
		root: options.nodeModulesPath,
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				include: options.srcPath,
				loader: 'babel-loader',
				query: {
					presets: ['es2015']
				}
			},
			{
				test: /\.css$/,
				include: options.srcPath,
				[!options.isDev ? 'loader' : 'loaders']: !options.isDev ? ExtractTextPlugin.extract(
					'style-loader',
					'css-loader?modules&importLoaders=1!postcss-loader'
				) : [
					'style-loader?sourceMaps', 
					'css-loader?modules&importLoaders=1',
					'postcss-loader',
				]
			},
      {
        test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader',
      },
			{ 
				test: /\.handlebars$/, 
				loader: "handlebars-loader" 
			}
		]
	}
})