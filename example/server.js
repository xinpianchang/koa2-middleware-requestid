const Koa = require('koa');
const requestId = require('../dist/index.js').default;
console.log('requestId', requestId)
const app = new Koa();

app.use(requestId({
  type: 'uuid'
}));
app.use(async ctx => {
  console.log('ctx', ctx);
  console.log('new v4 id', requestId.generateID());
  console.log('new bson id', requestId.generateID('object-id'));
  ctx.body = ctx.id;
});

app.listen(3000);