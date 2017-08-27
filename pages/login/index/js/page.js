var utils = new Utils();

$(document).ready(function () {
    var $form = $('form');
    var $user = $form.find('#username');
    var $passwd = $form.find('#password');
    var $submit = $form.find('.login-submit');
    var serverurl = '';
    $submit.on('click', function (event) {
        event.preventDefault();
        var ajaxArgs = {
            username: $user.val(),
            password: $passwd.val()
        };
        console.log(ajaxArgs);
        if(!utils.validateEmpty(ajaxArgs)) {
            return false;
        }
        var userStorage = {};
        var admin = {
            id: 71,
            role: "user"
        };
        // 设置登录状态
        utils.setLoginState(admin);
        // 登录用户信息保存到cookie中
        utils.setCookie('my_username', admin.username);
        utils.setCookie('my_id', admin.id);
        utils.setCookie('my_role', admin.role);
        
        $.notice("提示！", "登录成功，正在跳转...");
        window.location.href = '../../user/setting/page.html';
        // $.ajax({
        //     type: "POST",
        //     // url: utils.URLHead + "",
        //     beforeSend: $.notice('提示！', '正在登录...', function () {
        //         utils.loading($('.jq-notice-context'));
        //     }),
        //     data: ajaxArgs,
        //     success: function(data){
        //         if(typeof data === 'string') {
        //             data = JSON.parse(data);
        //         }
        //         if(data.code == 200) {
        //             var userStorage = {};
        //             var admin = {
        //                 username: 'zbb',
        //                 id: 71,
        //                 role: "admin"
        //             };
        //             // 设置登录状态
        //             session.setLoginState(admin.username);
        //             // 登录用户信息保存到cookie中
        //             utils.setCookie('my_username', admin.username);
        //             utils.setCookie('my_id', admin.id);
        //             utils.setCookie('my_role', admin.role);
        //             $.notice("提示！", "登录成功，正在跳转...");
        //             window.location.href = './index/page.html';
        //         } else {
        //             $.notice("提示！", "登录失败，请重新登录...");
        //         }
        //     }
        // })

    });
});