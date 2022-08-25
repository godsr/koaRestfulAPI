const Router = require('koa-router');

const api = new Router();
const lms = require('./lms')

api.use('/lms', lms.routes());

module.exports = api;