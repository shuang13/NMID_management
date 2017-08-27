var utils = new Utils();
$(document).ready(function() {
    utils.loginTesting();
    // 按钮事件
    $('.setting-add-user .btn-submit a').on('click', function(event) {
        event.preventDefault();
        var ajaxArgs = {
            name: $('#add-user-name').val(),
            email: $('#add-user-email').val(),
            password: $('#add-user-password').val(),
            tel: '',
            platform: $('input[name="platform"]:checked').val(),
            job: $('input[name="job"]:checked').val(),
            role: $('input[name="user-type"]:checked').val(),
        }
        $.ajax({
                type: "POST",
                beforeSend: $.notice('提示！', '正在提交...', function () {
                     utils.loading($('.jq-notice-context'));
                }),
                url: utils.URLHead + "/users",
                data: ajaxArgs,
                success: function(data){
                    if(typeof data == 'string') {
                            data = JSON.parse(data);
                    }
                    var status = data.code;
                    if(status == 201) {
                    $('.jq-notice-context').html('提交成功!');
                        setTimeout('window.location.href = "../list/page.html"',2000); 
                    } else {
                        $('.jq-notice-context').html('提交失败!');
                        window.reload();
                    }
                }
        });
    });
})