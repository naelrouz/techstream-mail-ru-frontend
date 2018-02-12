const Koa = require('koa');
const koaStatic = require('koa-static');
const koaLogger = require('koa-logger');
const uuidv4 = require('uuid/v4');

const koaBody = require('koa-body');

const app = new Koa();

app.use(koaStatic('../client'));
app.use(koaLogger());
app.use(
  koaBody({
    multipart: true
  })
);

const Router = require('koa-router');

const router = new Router();

const users = {};
const ids = {};

router.post('/auth', async ctx => {
  const { username, email } = ctx.request.body;

  console.log(username);

  if (!username || !email) {
    ctx.status = 400;
  }

  if (!users[email]) {
    users[email] = {
      username,
      email,
      count: 0
    };
  }

  const id = uuidv4();
  ids[id] = email;

  ctx.cookies.set('podvorot', id, {
    domain: 'localhost',
    expires: new Date(Date.now() + 1000 * 60 * 10)
  });

  console.log('users: ', users);
  console.log('ids: ', ids);

  ctx.body = { id };
});

router.get('/me', async ctx => {
  const id = ctx.cookies.get('podvorot');
  const email = ids[id];

  console.log('"/me" id: ', id);
  console.log('"/me" email: ', email);
  console.log('"/me" users[email]: ', users[email]);

  if (!email || !users[email]) {
    ctx.status = 401;
  }

  users[email].count += 1;

  ctx.body = users[email];
});

router.get('/scorelist', async ctx => {
  const scorelist = Object.entries(users)
    .sort((l, r) => l.scope - r.scope)
    .map(user => ({
      email: user.email,
      age: user.age,
      scope: user.scope
    }));

  ctx.body = scorelist;
});

router.get('/views', async ctx => {
  const n = ctx.cookies.get('view') + 1;
  ctx.cookies.set(`view ${n}`);
  ctx.body = `${n} views`;
});

// router.get('/views', async (ctx, next) => {
//   let count = ctx.session.count || 0;
//   ctx.session.count = ++count;

//   ctx.body = count;
// });

app.use(router.routes());

module.exports = app;
