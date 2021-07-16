# bluejay

Bluejay (named after the bird **native** to Texas because I just needed a name)
contains all native code for the Sidekick project.

It is a native Node.JS module, meaning that we can use it from Sidekick just
like any other Node.JS dependency.

TypeScript definitions are in `index.d.ts`, and are manually written to match
what functionality we expose.

This module is not concerned with ensuring that only applications that are
supposed to have access are able to call its functions, but it is concerned
with providing functions that cannot be abused. e.g. - it would be totally fine
to expose a function to read and write from the native keychain, but it would
not be fine to expose a function to read and write arbitrary files.

## Developing

To re-compile `bluejay` and use it in the main project, simply run `yarn upgrade bluejay`
in the root directory.
All cargo commands will work normally in the `bluejay` directory.
