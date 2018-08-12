Note that two separate testing frameworks are used here – Wallaby, a paid,
live-testing extension for VS Code, and Jest's default coverage functionality.
The intersection of the requirements for these to as they apply to
transpilation options means that some features will not transpile correctly
and will fail tests, and should be left out of all code intended to be tested.

Current features which should be avoided, and their surrogate:

* Spread operator (`...`)
    * This can be replaced with Object.assign.