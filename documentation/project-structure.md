# Project structure

The project is served through [Express](https://expressjs.com), a Node.js HTTP server module. The [spdy](https://github.com/spdy-http2/node-spdy) module is used to add `HTTP2` functionality.

It is written in [Typescript](https://www.typescriptlang.org) and [React](https://reactjs.org), with `JSX`, an XML-in-JavaScript replacement for external HTML files which is transpiled to normal JavaScript before runtime.

It uses [Webpack](https://webpack.js.org) and [Babel](https://babeljs.io) to bundle and transpile code. This reduces transfer size, browser cache lookups, and provides workarounds for all new JavaScript features such that it can run on all recent (>2013) devices with JavaScript capabilities.

State management is performed by [Redux](https://redux.js.org), with occasional usage of [redux-thunk](https://github.com/reduxjs/redux-thunk) for external RSS requests. By and large, nearly all the components in this project are stateless (implementing `React.PureComponent`), with the particular exception of those which need to display their own errors.

The [react-universal-component](https://github.com/faceyspacey/react-universal-component) package, and several other packages from the `universal-react` ecosystem, ([redux-first-router](https://github.com/faceyspacey/redux-first-router), [redux-first-router-link](https://github.com/faceyspacey/redux-first-router-link), [babel-plugin-universal-import](https://github.com/faceyspacey/babel-plugin-universal-import), and [webpack-flush-chunks](https://github.com/faceyspacey/webpack-flush-chunks)), are used to take simultaneous advantage of code-splitting (reducing the time, process, and space expenditures associated with each request) and server-side rendering (enabling the app to work more natively on phones as a progressive web app, and ensuring that semantic content is loaded and read by web crawlers for SEO purposes). The `redux-first-router` packages also enable page changes to be dispatched as simple Redux actions.

[autoprefixer](https://github.com/postcss/autoprefixer) and [browserslist](https://github.com/browserslist/browserslist) are used to convert newer CSS functionality into older, experimental functionality for out-of-date browsers.

[Jest](https://jestjs.io) is used to test the project. ([ts-jest](https://github.com/kulshekhar/ts-jest) is used to provide TypeScript functionality.) [Wallaby.js](https://wallabyjs.com) is used to add inline, live-updating results to the testing. (A private, personal license was used, so a new license would have to be purchased for anyone else to use it.)

[feedparser](https://github.com/danmactough/node-feedparser) is used to convert plain-text RSS responses into live object formats.

[node-ses](https://github.com/aheckmann/node-ses) is used to more easily automate sending e-mails through Amazon Simple E-mail Service.

[googleapis](https://github.com/googleapis/googleapis) is used to more easily automate updating content on Google Drive.

For more details on which external packages are used, check `package.json`.
