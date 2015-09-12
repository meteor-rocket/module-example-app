
To run the app:

```sh
cd meteor-app
meteor
```

Note: Until Meteor 1.2 is officially released, we've gotta manually specify for
our app to use Meteor 1.2-rc.7 or higher. `rocket:module` use Meteor 1.2's new
`Plugin.registerCompiler` API, which will be out very soon!

Meteor and `rocket:module`
==========================

Many useful React components and React-related modules are available on NPM,
and can be bundled for the client or the server with `rocket:module`.
`rocket:module` also allows you to write CommonJS, AMD, or ES6 modules.
`rocket:module` can be used for packages too, not just apps, and it will share
(as much as possible) NPM dependencies across packages in an app (and the app
itself).

Using NPM packages with `rocket:module`
---------------------------------------

You can use `rocket:module` to load NPM modules on the client or the server. Here's how:

### 1. Add `rocket:module`

```sh
meteor update --release 1.2-rc.7
meteor add rocket:module
```

Note that the update command is only temporary until Meteor 1.2 is released.

### 2. Add the NPM packages that you want to `npm.json`

Create an `npm.json` file in your app or package that specifies the
dependencies you'd like from NPM. In most cases, you should leave the carrot
(`^`) in front of the version number to ensure that the most compatible
versions of your dependencies can be found. If you need more control of the
versions in your package for whatever reason, you can (but try to avoid)
[plucking the carrot](http://semver.org).

If you're making a package, be sure to add your `npm.json` file via
`api.addFiles()`.

> `/path/to/your/app/npm.json`
> ```js
> {
>   "react": "^0.13.1",
>   "famous": "^0.7.0",
>   "async": "^1.4.0"
> }
> ```

### 3. Write code with ES6, CommonJS, or AMD modules.

`rocket:module` handles all the JavaScript files in your app. JavaScript files
that end with `.entry.js` or are entirely named `"entry.js"` are entry points
into your application. You'll need at least one entrypoint file. In each
entrypoint you can begin importing whatever you need, like in the following ES6
examples:

> `/path/to/your/app/entry.js`
> ```js
> import React from 'react'
> import Node  from 'famous/core/Node'
> import async from 'async'
>
> ...
> ```

or

> `/path/to/your/app/main.entry.js`
> ```js
> import React from 'react'
> import Node  from 'famous/core/Node'
> import async from 'async'
>
> ...
> ```

Note, these last two entry point examples would run on boths sides, the client
and the server.

Use CommonJS module syntax if you feel more comfortable with that:

> `/path/to/your/app/server/entry.js`
> ```js
> let React = require('react')
> let Node  = require('famous/core/Node')
> let async = require('async')
>
> ...
> ```

Heck. If you really like AMD, use it:

> `/path/to/your/app/server/entry.js`
> ```js
> define([
>     'react',
>     'famous/core/Node',
>     'async',
> ], function(
>     React,
>     Node,
>     async,
> ) {
>     ...
> })
> ```

You've just imported React, Famous, and async from NPM.

Note, `rocket:module` works on both sides, client and server! The last two
entry point examples run on the server because they're in a `server` folder.
Now *that's* something to feel good about.

You can also import local files!

> `/path/to/your/app/client/entry.js`
> ```js
> import somethingLocal from './path/to/local/file'
>
> ...
> ```

Note, this last one loads on the client only because it's in a `client` folder.

That's basically it! See the [example
app](https://github.com/meteor-rocket/module-example-app) for an actual
example. See the [example
package](https://github.com/meteor-rocket/module-example-package) to learn how
to use `rocket:module` in a Meteor package.

Module load order
-----------------

All your entrypoint files load in the same order as normal files would, based
on Meteor's [load order rules](http://docs.meteor.com/#/full/fileloadorder).

Note that Meteor's load order rules don't apply to any files that you've ever
`import`ed or `require`d into any other file. In this case, the order is
defined by you, and loading starts from your entrypoint files. Imported or
required files are completely ignored by Meteor's load order mechanism.

Files that are not entrypoint files and that are never imported into any other
file are ignored by `rocket:module`. Those files are handled exclusively by
Meteor's load order mechanism, not by `rocket:module`.

Caveats
-------

If you make a change to `npm.json`, the server will reload as expected, but
will fail to update your NPM dependencies. This will be fixed in
`rocket:module` v1.0.0.

You may experience a build delay (sometimes around a minute long) due to a
possible bug in the release candidate of Meteor. I hope we can get to the
bottom of it soon. See https://github.com/meteor/meteor/issues/5067.

Future improvements
-------------------

- ~~`rocket:module` will have a cache before reaching 1.0.0. Until then, your app
  may take a long time to build if you've got lots of files.~~ Added in `rocket:module` v0.8.1.
- Some more speed improvements around NPM package handling.
- Version 1.0.0 of `rocket:module` will handle source maps.
- Fix npm.json live reload.
- Cross-package imports/exports (ES6, CommonJS, or AMD).
