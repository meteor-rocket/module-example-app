To run the app:

```sh
cd meteor && meteor
```

Meteor and `rocket:module`
==========================

Many useful React components and React-related modules are available on NPM,
and can be bundled for the client with `rocket:module`. We are still working on
adding first-party support for using these modules to Meteor core, but there
are community-maintained packages that work great!

Using client-side modules from NPM with `rocket:module`
-------------------------------------------------------

You can use `rocket:module` to load client-side NPM modules. Here's how:

### 1. Add `rocket:module`

```sh
meteor add rocket:module
```

### 2. Add the npm modules you want to packages.json

Create an `npm.json` file in your app or package that specifies the
dependencies you'd like from NPM. In most cases, you should leave the carrot
(`^`) in front of the version number to ensure that the most compatible
versions of your dependencies can be found. If you need more control of the
versions in your package for whatever reason, you can (but try to avoid)
[plucking the carrot](http://semver.org).

If you're making a package, be sure to add your `npm.json` file via
`api.addFiles()`.

```js
{
  "react": "^0.13.1",
  "famous": "^0.6.0",
  "async": "^1.4.0"
}
```

### 3. Write code with ES6, CommonJS, or AMD modules.

`rocket:module` handles all the JavaScript files in your app. JavaScript files
that end with `.entry.js` or are entirely named `"entry.js"` are entry points
into your application. You'll need at least one entrypoint file. In each entrypoint you can
begin importing whatever you need, like in the following ES6 samples:

##### /path/to/your/app/entry.js
```js
import React from 'react'
import Node  from 'famous/core/Node'
import async from 'async'
```
or

##### /path/to/your/app/main.entry.js
```js
import React from 'react'
import Node  from 'famous/core/Node'
import async from 'async'
```

Use CommonJS module syntax if you feel more comfortable with that or if you need asynchronous control of your module loading:

##### /path/to/your/app/server/entry.js
```js
let React = require('react')
let Node  = require('famous/core/Node')
let async = require('async')
```

Heck. If you really like AMD for some reason, use it:

##### /path/to/your/app/server/entry.js
```js
define([
    'react',
    'famous/core/Node',
    'async',
], function(
    React,
    Node,
    async,
) {
})
```

You've just imported React, Famous, and async onto every client and server. It works on both sides! Now *that's* something to feel good about.

### See it in action in the example app.

- []()

Module load order
-----------------

All your entrypoint files load in the same order as normal files would, based
on Meteor's [load order rules](http://docs.meteor.com/#/full/fileloadorder).

Note that Meteor's load order rules don't apply to any files that you've
`import`ed or `require`d from any other file. In this case, the order is
defined by you, and loading starts from your entrypoint files. Imported or
required files are completely ignored by Meteor's load order mechanism.

Files that are not entrypoint files and that are never imported into any other
file are ignored by `rocket:module`. Those files are handled exclusively by
Meteor's load order mechanism.

## Future improvements

- `rocket:module` will have a cache before reaching 1.0.0. Until then, your app
  may take a long time to build if you've got lots of files.
- Version 1.0.0 of `rocket:module` will handle source maps.

