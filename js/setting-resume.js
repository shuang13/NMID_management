$(document).ready(function() {
	$('.setting-resume .btn-submit a').on('click',function(event) {
		event.preventDefault();
		
		// 先判断至少有一项不为空！！！！！

		$.notice('简历设置提示：', '密码不能为空！', undefined, 300, 150);
		
	});
})