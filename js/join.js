$(document).ready(function() {
	// 按钮
	// 不通过
	$('.btn-not-pass').on('click', function(event) {
        event.preventDefault();
        $.notice('加入我们提示：', '您已拒绝该用户的加入申请！', undefined, 300, 150);
    });

	// 通过
    $('.btn-pass').on('click', function(event) {
        event.preventDefault();
        $.notice('加入我们提示：', '您已同意该用户的加入申请！', undefined, 300, 150);
    });

})