import Koa from 'koa';
import KoaRouter from 'koa-router';
import koaStatic from 'koa-static';
import path from 'path';

const PORT = process.env.PORT || 3000;
const app = new Koa();
const router = new KoaRouter();

// Note that the router becomes the first middleware
// here even though route.get comes after the console.log middleware
app
  .use(router.routes())
  .use(router.allowedMethods());

app.use(async (ctx, next) => {
  console.log('before console.log middleware');
  console.log(`${ctx.method} ${ctx.url}`);
  await next();
  console.log('after console.log middleware');
});

router.get('*', async (ctx, next) => {
  console.log('before router middleware');
  await next();
  console.log('after router middleware');
  if (ctx.body != null || ctx.status !== 404) return;
  const page404 = `
    <!doctype html>
    <head>
      <title>Koa.js Custom 404 Handler</title>
    </head>
    <body>
      <div>
        Sorry Koa.js cannot find your page
      </div>
    </body>
    </html>    
  `;
  ctx.body = page404;
});

app
  .use(koaStatic(path.join(__dirname, 'public')));

app.listen(PORT);

console.log(`listening on port ${PORT}`);
