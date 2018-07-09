# daypicker-preact-issue

Seeing an issue with [react-day-picker](https://github.com/gpbl/react-day-picker) and [preact](https://github.com/developit/preact) +  [preact-compat](https://github.com/developit/preact-compat), but only when building for production. Here's the simplest possible reproduction of that issue.

How to repo:
```shell
npm i
npm run build
npm start # launches a web browser
```

Have a look in the console and you'll see this error:
```
Uncaught DOMException: Failed to execute 'createElement' on 'Document': The tag name provided ('[object Object]') is not a valid name.
    at HTMLDocument.createElement (<anonymous>:1:1554)
    at http://localhost:8080/app.951e12a3fd9b200472cf.js:1:5002
    at P (http://localhost:8080/app.951e12a3fd9b200472cf.js:1:5051)
    at http://localhost:8080/app.951e12a3fd9b200472cf.js:1:5985
    at P (http://localhost:8080/app.951e12a3fd9b200472cf.js:1:6176)
    at http://localhost:8080/app.951e12a3fd9b200472cf.js:1:5985
    at P (http://localhost:8080/app.951e12a3fd9b200472cf.js:1:6176)
    at N (http://localhost:8080/app.951e12a3fd9b200472cf.js:1:4021)
    at S (http://localhost:8080/app.951e12a3fd9b200472cf.js:1:8253)
    at j (http://localhost:8080/app.951e12a3fd9b200472cf.js:1:7401)
```
Possible cause:
 - It seems as if `react-day-picker` `nodeName` [comes in as an object here](https://github.com/developit/preact/blob/master/src/vdom/diff.js#L116)
