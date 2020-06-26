const Koa = require('koa');
const router = require('koa-router')();
const app = new Koa();


const axios = require('axios').default;

router.post('/reports/tc', async (ctx, next) => {
    const body = JSON.stringify(ctx.request.body);
    try {
        const {data} = await axios({
        method: 'post',
        url:'https://uat.beacon-tech.net/reports/tc',
        data: body,
        headers: {
         'Content-Type': 'application/json',
         'X-Auth-Token': '68a42e76dc6bbe61f5a49220cefdfa0440a1e77d66db5ae8c3dd2a7467d8aca4937922f6cc29'
       } 
 
     })
    ctx.body = data;
    await next();
    } catch(e) {
        console.log(JSON.stringify(e));
    }

 });

router.get('/references/reports/tc/fields', async (ctx, next) => {
    const {data} = await axios({
        method: 'get',
        url:'https://uat.beacon-tech.net/references/reports/tc/fields',
        headers: {
         'Content-Type': 'application/json',
         'X-Auth-Token': '68a42e76dc6bbe61f5a49220cefdfa0440a1e77d66db5ae8c3dd2a7467d8aca4937922f6cc29'
       } 
     })
    ctx.body = data;
    await next();
 });
router.post('/references/reports/tc/fields', async (ctx, next) => {
    const body = JSON.stringify(ctx.request.body);
    const {data} = await axios({
        method: 'post',
        url:'https://uat.beacon-tech.net/references/reports/tc/fields',
        data: body,
        headers: {
         'Content-Type': 'application/json',
         'X-Auth-Token': '68a42e76dc6bbe61f5a49220cefdfa0440a1e77d66db5ae8c3dd2a7467d8aca4937922f6cc29'
       } 
     })
    ctx.body = data;
    await next();
 });
router.put('/references/reports/tc/fields/:id', async (ctx, next) => {
    const body = JSON.stringify(ctx.request.body);
    const id = ctx.params.id;
    const {data} = await axios({
        method: 'put',
        url:'https://uat.beacon-tech.net/references/reports/tc/fields/' + id,
        data: body,
        headers: {
         'Content-Type': 'application/json',
         'X-Auth-Token': '68a42e76dc6bbe61f5a49220cefdfa0440a1e77d66db5ae8c3dd2a7467d8aca4937922f6cc29'
       } 
 
     })
    ctx.body = data;
    await next();
 });
router.delete('/references/reports/tc/fields/:id', async (ctx, next) => {
    const id = ctx.params.id;
    const {data} = await axios({
        method: 'delete',
        url:'https://uat.beacon-tech.net/references/reports/tc/fields/' + id,
        headers: {
         'Content-Type': 'application/json',
         'X-Auth-Token': '68a42e76dc6bbe61f5a49220cefdfa0440a1e77d66db5ae8c3dd2a7467d8aca4937922f6cc29'
       } 
 
     })
    ctx.body = data;
    await next();
 });

 app.use(router.routes()); // route middleware
module.exports = app;