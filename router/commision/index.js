const Koa = require('koa');
const router = require('koa-router')();
const app = new Koa();
// a simple car object that we can serve

const axios = require('axios').default;

const commission = {
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


router.get('/commissions', async (ctx, next) => {
   const {data} = await axios({
       method: 'get',
       url:'https://uat.beacon-tech.net/tss/reference-data/commissions',
       headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': '68a42e76dc6bbe61f5a49220cefdfa0440a1e77d66db5ae8c3dd2a7467d8aca4937922f6cc29'
      } 

    })
   ctx.body = data;
   await next();
});

router.post('/commissions/new', async (ctx, next) => {
    
    console.log('new commission route', ctx.request.body);
    if( isNaN(parseInt(ctx.request.body.account))){
        ctx.response.status = 400;
        ctx.response.body = {
            "name":"Bad Request",
            "message":"execute.tradecommission: Either Sedol or Currency and Symbol are required",
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

router.post('/commissions/update', async (ctx, next) => {
    console.log('update commission route', ctx.request.body);
    ctx.status = 200;
    await next();
});

router.post('/commissions/cancel', async (ctx, next) => {
    console.log('cancel commission route', ctx.request.body);
    ctx.status = 200;
    await next();
});


app.use(router.routes()); // route middleware
module.exports = app;