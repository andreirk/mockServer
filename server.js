const Koa = require('koa');
const cors = require('@koa/cors');
const logger = require('koa-logger');
const router = require('koa-router')();
const mount = require('koa-mount');
var bodyParser = require('koa-bodyparser');

const app = new Koa();
const port = 3030;

app.use(logger());
app.use(bodyParser());
app.use(cors({
    origin : '*'
}));
app.use(mount(require('./router/adjustment')));
app.use(mount(require('./router/commision')))

app.use(router.routes()); // route middleware

if(require.main === module) {
    app.listen(port, (err) => {
        console.info('server is listening on port: ', port, err)
    }); // default
}