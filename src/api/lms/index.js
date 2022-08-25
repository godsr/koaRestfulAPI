const Router = require('koa-router');

const lms = new Router();
const lmsCtrl = require('api/lms/lms.controller');

lms.get('/', lmsCtrl.list);
lms.post('/', lmsCtrl.create);

module.exports = lms;