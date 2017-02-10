$(document).ready(function() {
	var $userName = $('#add-user-name');
	var $userEmail = $('#add-user-email');
	var regEmail = /^\w+(\.\w+)*@\w+(\.\w+)+$/;
	// 插入到弹出框的内容
    var html = [
        '<div>确认要修改以上信息？</div>',
        '<button class="true btn btn-danger"',
            ' style="position: absolute; bottom: 10px;',
            ' right: 100px;">确定</button>',
        '<button class="false btn btn-default"',
            ' style="position: absolute; bottom: 10px;',
            ' right: 30px;">取消</button>'
    ].join('');
	// 按钮事件
	$('.setting-add-user .btn-submit a').on('click', function(event) {
		event.preventDefault();
		var $character = $('input[name="user-type"]:checked').val();
		var $platform = $('input[name="platform"]:checked').val();
		var $job = $('input[name="job"]:checked').val();
		// 判断用户名是否为空
		if(!$userName.val()) {
			$.notice('添加用户提示：', '用户名不能为空！', undefined, 300, 150);
			return;
		}
		// 判断邮箱是否为空
		if(!$userEmail.val()) {
			$.notice('添加用户提示：', '邮箱不能为空！', undefined, 300, 150);
			return;
		} else if($.trim($userEmail.val()) && !regEmail.test($.trim($userEmail.val()))) {
            $.notice('添加用户提示：', '请输入正确格式的邮件地址！', undefined, 300, 150);
            return;
        } else if (!$character) {
        	$.notice('添加用户提示：', '请选择用户角色！', undefined, 300, 150);
            return;
        }
         else if (!$platform) {
        	$.notice('添加用户提示：', '请选择用户平台！', undefined, 300, 150);
            return;
        }
         else if (!$job) {
        	$.notice('添加用户提示：', '请选择用户职务！', undefined, 300, 150);
            return;
        } else {
        	$.notice('基本设置提示：', html, function () {
            // 确认修改
            $('.jq-notice-container .true').on('click', function () {
            	$.ajax({
                type: "POST",
                url: "????",
                data: {},
                success: function (data) {
                    if(typeof data == 'string') {
                        data = JSON.parse(data);
                    }

                    if(data.status == true) {
                        $.notice('基本设置提示：', '操作成功！', undefined, 300, 150);
                    } else {
                        $.notice('基本设置提示：', '操作失败：' + data.error_information, undefined, 300, 150);
                    }
                }
            	});
            });
            // 取消修改
            $('.jq-notice-container .false').on('click', function () {
                $.closeNotice();
            });
        	}, 300, 150);
        }
	});
})