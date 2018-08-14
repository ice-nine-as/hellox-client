# Style rules for the Hello X project

Those making modifications made to the Hello X codebase should endeavor to write code which is consistent with the code that already exists in the codebase. To this end, programmers should try to follow this style guide as closely as possible, or, assuming radical differences in opinion or necessity arise in the future, should modify this style guide *and* the whole of the codebase. A well-maintained, consistently-styled codebase reduces stress on programmers, makes learning unfamiliar parts easier, and is in raw terms very likely cheaper for one's employers.

## All languages

* Line length
    * Try to keep line lengths below 80 characters.
    * If there's no way to keep a line under 80 characters, consider 100 a fallback maximum.
* Indentation
    * Indent using spaces, not tabs.

## TypeScript, JavaScript, and JSX

* Spacing
    * Two spaces per indentation.
* Variable assignment
    * ```javascript
      const a = 12;
      ```
    * Use `const` or `let`. Never use `var`.
    * Avoid prefix and postfix incrementing and decrementing. Use `+=` and `-=` instead.
* Semicolons
    * Should follow every expression.
    * Should not follow function, class, and enum declarations.
* ES Modules
    * Named imports:
        * ```javascript
          import {
            foo,
          } from 'bar';
          ```
        * `import {`, `foo`, and `} from 'bar';` should all be on separate lines. This places the imported properties and the filename at the same character for every import and improves readability.
    * Default imports:
        * ```javascript
          import foo from 'bar';
          ```
        * ```javascript
          import * from 'bar';
          ```
        * Should be avoided wherever possible. Default imports have arbitrary names disconnected from the definition in the module from which they are imported. This increases the risk of identifiers rotting and remaining an old name which is no longer illustrative or correct.
        *  There are times where you'll need to use default imports (`import * as React from 'react') and that's okay.
* Require
    * Always use `const` for required modules or properties.
    * Do not mutate required modules or properties except where absolutely necessary. Use `Object.assign` to clone objects, and foo.bind to clone functions.
    * Named imports
        * ```javascript
          const {
            foo,
          } = require('bar');
          ```
        * Always prioritize destructuring. Do not import whole modules unless necessary.
    * Default imports
        * ```javascript
          const foo = require('bar');
          ```
* Strings
     * Use single quotes (`'`) rather than double quotes (`"`).
     * Use template strings rather than concatenating strings.
        * ```javascript
          const one = 'foo';
          const two = 'bar';
          const together = `${one} ${two}`;
          ```
* Objects
    * Use ES6 shorthands where possible.
        * Property names
            * ```javascript
              const foo = 1;
              const bar = {
                foo,
              };
              ```
            * Don't feel compelled to do this if you don't already have a (notional) `a` variable defined.
        * Method names
            * ```javascript
              const a = {
                foo() {
                  console.log('bar');
                },
              };
           * There may be times where you specifically want or need an arrow function (e.g. for the different binding context) and that's fine.
        * Computed properties
            * ```javascript
              const prefix = 'prefix';
              const foo = {
                [prefix + '1']: 1,
                [prefix + '2']: 2,
              };
              ```
            * This is an example for example's sake, so try to find better purposes than this.
            * The takeaway here should be that computed property assignment should be performed at initialization, not after the fact.
    * Prioritize immutable objects.
        * Use `Object.freeze` (or, in certain cases, `Object.seal`) to make objects immutable.
        * Use `Object.assign` to copy and alter the contents of an immutable objects without mutating it.
    * Avoid getters and setters wherever possible.
        * Largely invisible to consumers of your defined APIs.
        * Often introduce side effects where users would not expect them.
    * Use trailing commas in all object initializations.
* Arrays
    * Use trailing commas in all array initializations.
    * Use `Array.from` to convert array-like objects (e.g. `NodeList`s) into arrays before usage.
    * Prioritize immutable arrays. Use `Array.from` and `array.concat` to construct new arrays from existing immutable arrays. 
* Functions
    * Arrow functions
        * ```javascript
          (aa) => {
            console.log('foo');
          }
          ```
        * Use wherever possible.
        * Parenthesize arguments even when there is a single argument. This simplifies refactoring.
        * Use an expression rather than a code block when little or no computation is necessary.
            * ```javascript
              () => 'foo bar baz bux buzz';
            * ```javascript
              (aa) => (
                'foo bar baz bux buzz' +
                aa +
                'buzz bux baz'
              );
              ```
    * IIFEs
        * ```javascript
          (() => {
            const foo = 'bar';
            console.log(foo);
          })();
          ```
        * Place the executing parentheses outside of the enclosing parentheses.
        * Prioritize arrow functions.
        * Always use IIFEs in contexts where variable definitions would otherwise become globals (e.g. script blocks).
* Loops
    * ```javascript
      [ 1, 2, 3, ].map((aa) => {
        return aa * 2;
      }).filter((aa) => {
        return aa > 2;
      }).forEach((aa) => {
        console.log(aa);
      });
      ```
    * Prioritize functional expression-chaining over `for`, `while`, and `do-while` loops.
    * Prioritize arrow functions over generic functions.
    * Prioritize double-letters (e.g. `ii`) over single letters (e.g. `i`). This makes it easier to search code files for variable names.
    * Try to use code blocks rather than expressions. This makes it easier to refactor code to include logging or debugger statements.
* Switch statements
    * Don't ever use them. Use `if-else` blocks instead.
