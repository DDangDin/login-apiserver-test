const Joi = require('joi');
const Account = require('../../models/Account');

// 회원가입
// 데이터 검증은 안드로이드 스튜디오에서..!!!
exports.register = async (ctx) => {
     // 닉네임 / 이메일 중복 체크
     let existing = null;
     try {
         existing = await Account.findByEmailOrNickName(ctx.request.body);
     } catch (e) {
         ctx.throw(500, e);
     }
 
     if(existing) {
     // 중복되는 닉네임/이메일이 있을 경우
         ctx.status = 409; // Conflict
         // 어떤 값이 중복되었는지 알려줍니다
         ctx.body = {
             key: existing.profile.email === ctx.request.body.email ? 'email' : 'nickname',
             emailValue: `${existing.profile.email}, ${ctx.request.body.email}`,
             nicknameValue: `${existing.profile.nickname}, ${ctx.request.body.nickname}`,
         };
         return;
     }

    // 계정 생성
    let account = null;
    try {
        account = await Account.register(ctx.request.body);
    } catch (e) {
        ctx.throw(500, e);
    }

    ctx.body = account.profile; // 프로필 정보로 응답합니다.
};


// 로그인
exports.login = async (ctx) => {
    // 데이터 검증 (검증은 안드로이드 스튜디오에서 해도 될듯 아마??!)
    // const schema = Joi.object().keys({
    //     email: Joi.string().email().required(),
    //     nickname: Joi.string().required()
    // });

    // const result = Joi.validate(ctx.request.body, schema);

    // if(result.error) {
    //     ctx.status = 400; // Bad Request
    //     return;
    // }


    let account = null
    try{
        // 이메일로 계정 찾기
        account = await Account.findByEmailAndUserName(ctx.request.body);
    } catch (e) {
        ctx.throw(500, e);
    }

    if(!account) {
        // 유저가 존재하지 않거나 || 닉네임이 일치하지 않으면
            ctx.status = 403; // Forbidden
            return;
        }
    
        ctx.body = account.profile;

};


// 이메일 / 아이디 존재유무 확인 (닉네임 하고 추천인 검사하는데 수정해서 사용하기)
exports.exists = async (ctx) => {
    const { key, value } = ctx.params;
    let account = null;

    try {
        // key 에 따라 findByEmail 혹은 findByUsername 을 실행합니다.
        account = await (key === 'email' ? Account.findByEmail(value) : Account.findByNickName(value));    
    } catch (e) {
        ctx.throw(500, e);
    }

    ctx.body = {
        exists: account !== null
    };
};


// 로그아웃
exports.logout = async (ctx) => {
    ctx.body = 'logout';
};
