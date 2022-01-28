exports.list = (ctx) => {
    ctx.body = 'listed';
}

exports.create = (ctx) => {
    ctx.body = 'created';
}

exports.delete = (ctx) => {
    ctx.body = 'deleted';
}

exports.replace = (ctx) => {
    ctx.body = 'replaced';
}

exports.update = (ctx) => {
    ctx.body = 'update';
}

// - 위에 코드는 밑에처럼 사용 -
// const 모듈명 = require('파일명');
// 모듈명.변수명

// 코드를 내보낼때에는, 일반 변수값을 내보낼수도 있고, 함수를 내보낼수도있다