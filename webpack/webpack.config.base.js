
module.exports = options => ({
    progress: true,
    colors: true,
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
                test: /\.handlebars$/, 
                loader: "handlebars-loader" 
            }
        ]
    }
})