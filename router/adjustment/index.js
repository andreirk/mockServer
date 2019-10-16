const Koa = require('koa');
const router = require('koa-router')();
const app = new Koa();
// a simple car object that we can serve


const adjustment = {
    "trdId": "20190314173635123456ABC1",
    "account": "JP-Hashemi",
    "bookName": "AH01ARLS",
    "sedol": "4152952",
    "currency": "CHF",
    "symbol": "BEAN",
    "trdQty": -1000,
    "trdPrice": 123.5678,
    "trdSource": "bchennawar",
    "requestId":"ABC123457"
 }


router.get('/trade-adj', async (ctx, next) => {
    ctx.body = adjustment;
    await next();
});

router.post('/trade-adj/new', async (ctx, next) => {
    
    console.log('new adjustment route', ctx.request.body);
    if( isNaN(parseInt(ctx.request.body.account))){
        ctx.response.status = 400;
        ctx.response.body = {
            "name":"Bad Request",
            "message":"execute.tradeAdjustment: Either Sedol or Currency and Symbol are required",
            "violations": [
               { 
                "field": "account",
                "message":"Accound field must be correct"
               },
               { 
                "field": "cedol",
                "message":"Either Sedol or Currency and Symbol are required"
               }
            ]
         }
        
    } else {
        ctx.status = 200;
    } 
    
    await next();
    
});

router.post('/trade-adj/update', async (ctx, next) => {
    console.log('update adjustment route', ctx.request.body);
    ctx.status = 200;
    await next();
});

router.post('/trade-adj/cancel', async (ctx, next) => {
    console.log('cancel adjustment route', ctx.request.body);
    ctx.status = 200;
    await next();
});


app.use(router.routes()); // route middleware
module.exports = app;