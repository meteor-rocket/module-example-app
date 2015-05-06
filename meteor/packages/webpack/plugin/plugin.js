// builtin modules
var path    = Npm.require('path')
var fs      = Npm.require('fs')

// npmjs modules
var rndm    = Npm.require('rndm')
var webpack = Npm.require('webpack')
var _       = Npm.require('lodash')

function CompileManager(extension) {
    this.extension = extension
    this.count = 0
    this.init()
}
_.assign(CompileManager.prototype, {
    constructor: CompileManager,
    init: function() {
        Plugin.registerSourceHandler(this.extension, this.sourceHandler)
    },
    sourceHandler: function(compileStep) {

        /*
         * Link the node_modules directory so modules can be resolved.
         */
        var modulesLink = compileStep.fullInputPath.replace(compileStep.inputPath, '')+'node_modules'
        var modulesSource = compileStep.fullInputPath.replace(compileStep.inputPath, '')+'.npm/package/node_modules'
        if (fs.existsSync(modulesLink)) fs.unlinkSync(modulesLink)
        fs.symlinkSync(modulesSource, modulesLink)

        /*
         * Choose a temporary output location that doesn't exist yet.
         * TODO: Get the app id (from .meteor/.id) a legitimate way.
         */
        var output, files, fileMatch
        var tmpLocation = '/tmp'
        var appId = fs.readFileSync(
            path.resolve(process.cwd(), '.meteor', '.id')
        ).toString().trim().split('\n').slice(-1)[0]
        do output = [tmpLocation, 'meteor-'+appId, 'bundle-'+rndm(24)].join('/')
        while ( fs.existsSync(output) )
        output = [output, compileStep.pathForSourceMap].join('/')

        // Get a configured webpack compiler. Calling webpack with no callback
        // returns a Webpack Compiler without running it.
        var webpackCompiler = webpack({
            entry: compileStep.fullInputPath
                .replace(/\.[A-Za-z]*$/, ''), // remove the extension
            output: {
                filename: output
            }
        })

        // run the webpack compiler synchronously
        var webpackResult = Meteor.wrapAsync(webpackCompiler.run, webpackCompiler)()

        // add the compiled result
        compileStep.addJavaScript({
            path: compileStep.inputPath,
            data: fs.readFileSync(output).toString(),
            sourcePath: compileStep.inputPath
        })
    }
})
CompileManager.symlinkMap = []

var manager = new CompileManager('main.js')
