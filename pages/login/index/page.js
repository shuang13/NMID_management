var utils = new Utils();

$(document).ready(function() {
    var $form = $('form');
    var $user = $form.find('#username');
    var $passwd = $form.find('#password');
    var $submit = $form.find('.login-submit');
    $('#username').mailAutoComplete({
        emailType: [
            '@nexuslink.cn',
            '@foxmail.com',
        ],
        width: 235,
        height: 120,
    });
    // enter键登录   
    $(document).keyup(function(event) {
        if (event.keyCode == 13) {
            $submit.trigger("click");
        }
    });
    $submit.on('click', function(event) {
        event.preventDefault();
        var ajaxArgs = {
            email: $user.val(),
            password: $passwd.val()
        };
        if (!utils.validateEmpty(ajaxArgs)) {
            return false;
        }
        $.ajax({
            type: "POST",
            url: utils.URLHead + "/users/login",
            beforeSend: $.notice('提示！', '正在登录...', function() {
                utils.loading($('.jq-notice-context'));
            }),
            data: ajaxArgs,
            success: function(data) {
                if (typeof data === 'string') {
                    data = JSON.parse(data);
                }
                if (data.code == 200) {
                    var admin = data.body;
                    // 设置登录状态
                    utils.setLoginState(admin);
                    // 登录用户信息保存到cookie中

                    $.notice("提示！", "登录成功，正在跳转...");
                    utils.jumpUrl('../../user/setting/page.html', 2000);

                } else {
                    $.notice("提示！", "登录失败，用户或密码错误，请重新登录...");
                }
            }
        })



    });
});