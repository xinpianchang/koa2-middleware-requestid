<div align="center">
  <h1>koa2-middleware-requestid</h1>
</div>

<p align="center">
  A middleware that generates a unique Request ID for every incoming HTTP request in Koa2.
</p>

## How to develop

Using `VSCode` as deafult for *debugger*

```
# Using NPM
npm run example

# Using Yarn
yarn example
```


## Dependencies

- [**uuid**](https://github.com/uuidjs/uuid)
- [**bson**](https://github.com/mongodb/js-bson)



## How to use
### Installation

```
# Using NPM
$ npm install --save @newstudios/koa2-middleware-requestid

# Using Yarn
$ yarn add @newstudios/koa2-middleware-requestid
```



## Usage

Use `@newstudios/koa2-middleware-requestid` as a middleware for a [koa](https://github.com/koajs/koa) app. By default, it generates a unique uuid (v4) and exposes it on the response via the `X-Request-ID` header. The id is also saved as part of the *ctx.req.id*、*ctx.request.id*、*ctx.id*.

In the following example, the generated uuid is manually exposed on the body for debugging purposes:

```js
const Koa = require('koa');
const requestId = require('@newstudios/koa2-middleware-requestid');
const app = new Koa();

app.use(requestId());
app.use(async ctx => {
  ctx.body = ctx.id;
});

app.listen(3000);
```

Execute a request to the running app:

```bash
❯ curl -v http://localhost:3000

< HTTP/1.1 200 OK
< X-Request-ID: 5ea534105429c3f44cfb188c

5ea534105429c3f44cfb188c
```


## API

### Creating an middleware

```node
// With default options
const middleware = requestId({
  header: 'X-Request-ID',
  property: 'id',
  type: 'object-id'
});
```

### Middleware Configuration

These are the available config options for the middleware. All is optional. 
The middleware try to get the request id from `X-Request-ID` request header or generate a new request id using `uuidv4` generator or `bson`.

```node
{
  // Request header name to get the forwarded request id
  header: 'X-Request-ID',

  // generate id using bson or uuid
  // 'uuid' | 'object-id'
  type: 'object-id'
}
```

also has a method generateID
```
default generate uuid, you can set type as *generateID('object-id')*
```

```
new v4 id fad3039d-091f-4611-8288-8c9b90d71697
server.js:11
new bson id 5ea543b87fe39832cee0db5c
```


## License

Provided under the terms of the MIT License

Copyright © 2020, [xinpianchang](https://www.xinpianchang.com).
