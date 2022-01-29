const Router = require('@koa/router');
const auth = new Router();
const authCtrl = require('./auth.controller');

auth.post('/register', authCtrl.register);
auth.post('/login', authCtrl.login);
auth.get('/exists/:key(email|username)/:value', authCtrl.exists);
// key 라는 파라미터를 설정하는데, 이 값들이 email 이나 username 일때만 허용한다는 것 입니다.
auth.post('/logout', authCtrl.logout);

module.exports = auth;