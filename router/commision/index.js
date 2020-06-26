const Koa = require('koa');
const router = require('koa-router')();
const app = new Koa();

const accountList = require('../../accountsList');

const axios = require('axios').default;


router.post('/commissionLoginRedirect', async (ctx, next) => {
  console.log('log body', ctx.request.body);
  ctx.cookies.set('SameSite', 'None');
  ctx.cookies.set('superToken', 'blaha');
  
  ctx.redirect('http://localhost:3000/commission-panel/')
  await next();
})

router.get('/someNotExist', async (ctx, next) => {
  ctx.body = 'Hello from me';
  await next();
})

 router.post('/login', async (ctx, next) => {
    // ctx.response.status = 400;
    // ctx.response.body = 'Bad Request';
    
     ctx.body = {
         userName: "Andrey",
         token: 'b8b929b473a6ace91f06fde83e8cb5b0617ceec30a29645426fa45419e4087b7cd2441db1177'
     }
     await next();
 })
 router.post('/login/accounts/list', async (ctx, next) => {
    // ctx.response.status = 400;
    // ctx.response.body = 'Bad Request';
    
     ctx.body = accountList;
     await next();
 })
 router.get('/reports/tc/:accountName', async (ctx, next) => {
  const accountName = ctx.params.accountName;
    const {data} = await axios({
        method: 'get',
        url:'https://uat.beacon-tech.net/reports/tc/' + accountName,
        headers: {
         'Content-Type': 'application/json',
         'X-Auth-Token': 'b8b929b473a6ace91f06fde83e8cb5b0617ceec30a29645426fa45419e4087b7cd2441db1177'
       } 
 
     })
    ctx.body = data;
    await next();
 });
 router.get('/brokers', async (ctx, next) => {
    const {data} = await axios({
        method: 'get',
        url:'https://uat.beacon-tech.net/static-references/brokers',
        headers: {
         'Content-Type': 'application/json',
         'X-Auth-Token': '68a42e76dc6bbe61f5a49220cefdfa0440a1e77d66db5ae8c3dd2a7467d8aca4937922f6cc29'
       } 
 
     })
    ctx.body = data;
    await next();
 });
 router.get('/brokers/codes', async (ctx, next) => {
    const {data} = await axios({
        method: 'get',
        url:'https://uat.beacon-tech.net/static-references/brokers/codes',
        headers: {
         'Content-Type': 'application/json',
         'X-Auth-Token': '68a42e76dc6bbe61f5a49220cefdfa0440a1e77d66db5ae8c3dd2a7467d8aca4937922f6cc29'
       } 
 
     })
    ctx.body = data;
    await next();
 });

 router.post('/brokers', async (ctx, next) => {
    
    const body = JSON.stringify(ctx.request.body);
       try {
    const {data, status} = await axios({
        method: 'post',
        url:'https://uat.beacon-tech.net/static-references/brokers/',
        data: body,
        headers: {
         'Content-Type': 'application/json',
         'X-Auth-Token': 'b8b929b473a6ace91f06fde83e8cb5b0617ceec30a29645426fa45419e4087b7cd2441db1177'
       } 
 
     })
     ctx.status = status;
     ctx.body = data;
    } catch(e) {
        console.log('error in Responce', e)
    }
    await next();
 });
 router.put('/brokers/:id', async (ctx, next) => {
    const id = ctx.params.id;
    const body = JSON.stringify(ctx.request.body);

       try {
    const {data, status} = await axios({
        method: 'put',
        url:'https://uat.beacon-tech.net/static-references/brokers/' + id,
        data: body,
        headers: {
         'Content-Type': 'application/json',
         'X-Auth-Token': 'b8b929b473a6ace91f06fde83e8cb5b0617ceec30a29645426fa45419e4087b7cd2441db1177'
       } 
 
     })
     ctx.status = status;
     ctx.body = data;
    } catch(e) {
        console.log('error in Responce', e)
    }
    await next();
 });
 router.delete('/brokers/:id', async (ctx, next) => {
    const id = ctx.params.id;
       try {
    const {data, status} = await axios({
        method: 'delete',
        url:'https://uat.beacon-tech.net/static-references/brokers/' + id,
        headers: {
         'Content-Type': 'application/json',
         'X-Auth-Token': 'b8b929b473a6ace91f06fde83e8cb5b0617ceec30a29645426fa45419e4087b7cd2441db1177'
       } 
 
     })
     ctx.status = status;
     ctx.body = data;
    } catch(e) {
        console.log('error in Responce', e)
    }
    await next();
 });
 router.get('/brokers/codes', async (ctx, next) => {
    const {data} = await axios({
        method: 'get',
        url:'https://uat.beacon-tech.net/static-references/brokers/codes',
        headers: {
         'Content-Type': 'application/json',
         'X-Auth-Token': '68a42e76dc6bbe61f5a49220cefdfa0440a1e77d66db5ae8c3dd2a7467d8aca4937922f6cc29'
       } 
 
     })
    ctx.body = data;
    await next();
 });

router.get('/commissions', async (ctx, next) => {

  /* error */
  // ctx.status = 500;
  // ctx.body = {
  //     "timestamp": "2019-11-11T13:22:13.289+0000",
  //     "status": 500,
  //     "error": "Not Found",
  //     "message": "Something happend ",
  //     "path": "/commissions/11"
  // };

   const {data} = await axios({
       method: 'get',
       url:'https://uat.beacon-tech.net/references/tss/commissions',
       headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': 'b8b929b473a6ace91f06fde83e8cb5b0617ceec30a29645426fa45419e4087b7cd2441db1177'
      } 

    })
   ctx.body = data;
   await next();
});

router.put('/commissions/:id', async (ctx, next) => {
    const id = ctx.params.id;
    const body = JSON.stringify(ctx.request.body);
    console.log('new commission route', {id, body});

    // error
    // ctx.status = 404;
    // ctx.body = {
    //     "timestamp": "2019-11-11T13:22:13.289+0000",
    //     "status": 404,
    //     "error": "Not Found",
    //     "path": "/commissions/11"
    // };

    try {
    const {data, status} = await axios({
        method: 'put',
        url:'https://uat.beacon-tech.net/references/tss/commissions/'+ id,
        data: body,
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

router.delete('/commissions/:id', async (ctx, next) => {
    const id = ctx.params.id;
    try {
    const responce = await axios({
        method: 'delete',
        body: {},
        url:'https://uat.beacon-tech.net/references/tss/commissions/'+ id,
        headers: {
         'Content-Type': 'application/json',
         'X-Auth-Token': 'b8b929b473a6ace91f06fde83e8cb5b0617ceec30a29645426fa45419e4087b7cd2441db1177'
       } 
 
     })
     console.log('responce in local server', data)
     ctx.status = responce.status;
     ctx.body = responce;
    } catch(e) {
        console.log('error in Responce', e)
    }
    await next();
});

router.post('/commissions', async (ctx, next) => {


    // error
    // ctx.status = 500;
    // ctx.body = {
    //     "timestamp": "2019-11-11T13:22:13.289+0000",
    //     "status": 500,
    //     "error": "Not Found",
    //     "message": "Something happend ",
    //     "path": "/commissions/11"
    // };

    try {
      const id = ctx.params.id;
      const body = JSON.stringify(ctx.request.body);
      console.log('new commission route', {id, body});
    const {data, status} = await axios({
        method: 'post',
        url:'https://uat.beacon-tech.net/references/tss/commissions',
        data: body,
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

// const multer = require('@koa/multer');
// const upload = multer();
// router.post('/commissions/bulk',upload.single('file'),  (ctx, next) => {
//     try {
//        console.log("Files: ", ctx.request.file);
//        ctx.status = 200;
//     } catch (error) {
//       console.log('Error in bulk commisions', error)
//     }
   
//      next();
// });


app.use(router.routes()); // route middleware
module.exports = app;