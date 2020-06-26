const Koa = require('koa');
const router = require('koa-router')();
const app = new Koa();
// a simple car object that we can serve

const axios = require('axios').default;

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


const tradeAdj = {
    account: 'Account name',
    strategy: 'strategy name',
    symbol: 'symbol name',
    tradePrice: 'trade price',
    tradeQty: 'qty num'
}

const tradeAdjArr = Array(3).fill().map((el, idx) => {
    return {
        account: tradeAdj.account + ' ' + idx,
        strategy: tradeAdj.strategy + ' ' + idx,
        symbol: tradeAdj.symbol + ' ' + idx,
        tradePrice: tradeAdj.tradePrice + ' ' + idx,
        tradeQty: tradeAdj.tradeQty + ' ' + idx,
    }
})

// console.log('trade adj arr', tradeAdjArr);

let counter = 0;

let count = () => {
    if(counter === 3) {
        counter = 0;
    }
    return counter++;
}


const randResponce0to3 = () => {
    let responce; 
    const currCounter = count();
    if(currCounter === 0){
        response = []
    } else if(currCounter === 1){
        response = [tradeAdjArr[0]];
    } else if (currCounter === 2) {
        response = tradeAdjArr;
    }
    return response;
}

router.post('/trade-adjustments/securities/:id', async (ctx, next) => {
    console.log('on inner of router', ctx.request.body);
    //local
    // ctx.response.body = randResponce0to3();
    // ctx.status = 200;
    // await next();
    const body = ctx.request.body;
    const id = ctx.params.id;
    try {
        const {data, status} = await axios({
        method: 'post',
        data: body,
        url:'https://uat.beacon-tech.net/trade-adjustments/securities/'+ id,
        headers: {
         'Content-Type': 'application/json',
         'X-Auth-Token': 'b8b929b473a6ace91f06fde83e8cb5b0617ceec30a29645426fa45419e4087b7cd2441db1177'
       } 
 
     })
     console.log('responce in local server', data)
     ctx.status = status;
     ctx.body = data;
    } catch(e) {
        console.log('error in Responce', e)
    }
    await next();
});



app.use(router.routes()); // route middleware
module.exports = app;