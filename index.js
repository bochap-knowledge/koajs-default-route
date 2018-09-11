import Koa from 'koa';
import KoaRouter from 'koa-router';
import koaStatic from 'koa-static';
import path from 'path';

const PORT = process.env.PORT || 3000;
const app = new Koa();
const router = new KoaRouter();

app
  .use(router.routes())
  .use(router.allowedMethods());

router.get('*', async (ctx, next) => {
  await next();
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
