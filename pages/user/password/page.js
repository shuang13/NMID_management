var utils = new Utils();
// 本页面表单验证
function validate(ajaxArgs) {
    if ($.trim(ajaxArgs.old).length < 6) {
        $.notice("提示！", "密码不得少于6位！");
        return false;
    }
    return true;
}
$(document).ready(function() {
    utils.loginTesting();
    // 按钮事件
    $('.btn-submit a').on('click', function(event) {
        event.preventDefault();
        var ajaxArgs = {
            id: utils.my_id,
            old: $('#primary-password').val(),
            new: $('#new-password').val(),
        }
        if(!utils.validateEmpty(ajaxArgs) || !validate(ajaxArgs)) {
            return false;
        }
        $.ajax({
                type: "POST",
                beforeSend: $.notice('提示！', '正在提交...', function () {
                     utils.loading($('.jq-notice-context'));
                }),
                url: utils.URLHead + "/users/changePassWord",
                data: ajaxArgs,
                success: function(data){
                    if(typeof data == 'string') {
                            data = JSON.parse(data);
                    }
                    log(data)
                    var status = data.code;
                    if(status == 200) {
                    $('.jq-notice-context').html('提交成功!');
                        setTimeout('window.location.href = "../setting/page.html"',2000); 
                    } else {
                        $('.jq-notice-context').html('提交失败!');
                    }
                }
        });
    });
})