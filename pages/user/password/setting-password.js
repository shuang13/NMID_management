$(document).ready(function() {
	var URLHead = 'http:119.29.234.36:8080/nmid';
	var $priKey = $('#primary-password');
	var $nowKey = $('#new-password');
	// 插入到弹出框的内容
    var html = [
        '<div>确认修改密码？</div>',
        '<button class="true btn btn-danger"',
            ' style="position: absolute; bottom: 10px;',
            ' right: 100px;">确定</button>',
        '<button class="false btn btn-default"',
            ' style="position: absolute; bottom: 10px;',
            ' right: 30px;">取消</button>'
    ].join('');
	// 按钮事件
	$('.setting-password .btn-submit a').on('click', function(event) {
		event.preventDefault();
		// 判断密码是否为空
		if(!$priKey.val()||!$nowKey.val()) {
			$.notice('修改密码提示：', '密码不能为空！', undefined, 300, 150);
			return;			
		}else if($priKey.val().length < 6||$nowKey.val().length < 6) {
			$.notice('修改密码提示：', '密码不能小于6位！', undefined, 300, 150);
			return;	
		}else {
        	$.notice('基本设置提示：', html, function () {
            // 确认修改
            $('.jq-notice-container .true').on('click', function () {
            	$.ajax({
                type: "POST",
                url: URLHead + '',
                data: {'':$nowKey.val()},
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