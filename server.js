const Koa = require('koa');
const cors = require('@koa/cors');
const logger = require('koa-logger');
const router = require('koa-router')();
const mount = require('koa-mount');
var bodyParser = require('koa-bodyparser');

// var bodyParser = require('koa-body');

const app = new Koa();
const port = 3030;

// app.use(bodyParser({
//     formidable:{uploadDir: './uploads'},    //This is where the files would come
//     multipart: true,
//     // urlencoded: true
//   }));


app.use(router.allowedMethods());
app.use(logger());
app.use(bodyParser());
app.use(cors({
    origin : '*'
}));
app.use(mount(require('./router/adjustment')));
app.use(mount(require('./router/commision')))
app.use(mount(require('./router/reports')))

app.use(router.routes()); // route middleware

if(require.main === module) {
    app.listen(port, (err) => {
        console.info('server is listening on port: ', port, err)
    }); // default
}