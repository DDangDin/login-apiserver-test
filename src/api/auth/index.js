const Router = require('@koa/router');
const auth = new Router();
const authCtrl = require('./auth.controller');


// 결과 값들 ctx.body 말고 응답만 받을 것
auth.post('/register', authCtrl.register);
auth.post('/login', authCtrl.login);
auth.get('/exists/:key(email|nickname)/:value', authCtrl.exists);
// key 라는 파라미터를 설정하는데, 이 값들이 email 이나 username 일때만 허용한다는 것 입니다.
auth.post('/logout', authCtrl.logout);


module.exports = auth;