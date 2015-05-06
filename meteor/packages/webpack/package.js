Package.describe({
    name: 'trusktr:webpack',
    version: '0.0.1',
    // Brief, one-line summary of the package.
    summary: 'Write modular organized code in Meteor without depending on load order.',
    // URL to the Git repository containing the source code for this package.
    git: '',
    // By default, Meteor will default to using README.md for documentation.
    // To avoid submitting documentation, set this field to null.
    documentation: 'README.md'
})

Package.registerBuildPlugin({
    name: 'webpack',
    use: ['meteor'],
    sources: ['plugin/plugin.js'],
    npmDependencies: {
        'webpack': '1.8.11',
        'rndm': '1.1.0',
        'babel-loader': '5.0.0',
        'css-loader': '0.12.0',
        'style-loader': '0.12.1',
        'lodash': '3.8.0'
    }
})

Package.onUse(function(api) {
    api.versionsFrom('1.1.0.2')
    api.addFiles('webpack.js', 'client')
    api.export('Webpack', 'client')
})

Package.onTest(function(api) {
    api.use('tinytest')
    api.use('trusktr:webpack')
    api.addFiles('webpack-tests.js')
})
