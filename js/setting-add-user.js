$(document).ready(function() {
	// 修改密码按钮事件
	$('.setting-add-user .btn-submit a').on('click',function(event) {
		event.preventDefault();
		// 判断用户名是否为空
		if(!$('.add-user-name').val()) {
			$.notice('添加用户提示：', '用户名不能为空！', undefined, 300, 150);
			return;
		}
		// 判断邮箱是否为空
		if(!$('.add-user-email').val()) {
			$.notice('添加用户提示：', '邮箱不能为空！', undefined, 300, 150);
			return;
		}
		// 邮箱格式校验
        var regEmail = /^\w+(\.\w+)*@\w+(\.\w+)+$/;
        if($.trim($('.add-user-email').val()) && !regEmail.test($.trim($('.add-user-email').val()))) {
            $.notice('添加用户提示：', '请输入正确格式的邮件地址！');
            return;
        }
	});
})