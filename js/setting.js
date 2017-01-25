$(document).ready(function() {
	// 选择文件事件
	$("#upload-pic").change(function() {
		// 显示文件路径
		$("#viewfile").val(this.value);
		// 头像预览
		$(".head-view").attr("src", "");
		var objUrl = getObjectURL(this.files[0]);
		if (objUrl) {
			$(".head-view").attr("src", objUrl);
		}
		//存储文件url
		function getObjectURL(file) {
			var url = null ; 
			if (window.createObjectURL != undefined) { // basic
				url = window.createObjectURL(file) ;
			} else if (window.URL != undefined) { // mozilla(firefox)
				url = window.URL.createObjectURL(file) ;
			} else if (window.webkitURL != undefined) { // webkit or chrome
				url = window.webkitURL.createObjectURL(file) ;
			}
			return url ;
		};
	})

	// 修改确认按钮事件
	$('.information-setting .btn-submit a').on('click',function(event) {
		event.preventDefault();
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
	});

	// 修改密码按钮事件
	$('.password-setting .btn-submit a').on('click',function(event) {
		event.preventDefault();
		// 判断原密码是否正确
		// 判断新密码是否为空
		if(!$('.new-password').val()) {
			$.notice('密码修改提示：', '密码不能为空！', undefined, 300, 150);
			return;
		}
	});
})