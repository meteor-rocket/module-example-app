module.exports = {
    entry: "./src/app.js",
    output: {
        path: './meteor/client',
        filename: "app.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            { test: /\.js$/, loader: "babel" }
        ]
    }
}
