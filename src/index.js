require('dotenv').config(); // .env에서 환경변수 불러오기
const Koa = require('koa');
const Router = require('koa-router');
const cors = require('koa-cors');

const app = new Koa();
const router = new Router();
const api = require('./api');

const bodyParser = require('koa-bodyparser');

const port = process.env.PORT || 15051; // PORT 값이 설정되어있지 않다면 4000 을 사용합니다.

router.use('/api', api.routes()); // api 라우트를 /api 경로 하위 라우트로 설정

app.use(cors()); 
app.use(bodyParser()); // 바디파서 적용, 라우터 적용코드보다 상단에 있어야합니다.
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(port, () => {
    console.log('koa server is listening to port ' + port);
});