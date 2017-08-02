$(document).ready(function() {
    var main = $(".main");
    $.ajax({
        type: "POST",
        url: "",
        data: {},
        success: function (data) {
            var data = JSON.parse(data);
            var $frag = $(document.createDocumentFragment());
            var dataLength = data.length;
            for (var i = 0; i < dataLength; i++) {
                frag.append("<div class=\"applicant-box\">"+
                "<div class=\"applicant-header\">"+
                    "<div class=\"applicant-name\">" + '申请者姓名' + "</div>"+
                    "<div class=\"applicant-platform\">" + '申请平台' + "</div>"+
                    "<div class=\"applicant-date\">" + '申请时间' + "</div>"+
                "</div>"+
                "<div class=\"applicant-content\">"+
                    "<span class=\"content-text\">"+ '申请内容' + "</span>"+
                "</div>"+
                "<div class=\"join-btn\">"+
                    "<div class=\"btn-not-pass\">"+
                        "<a href=\"#\">不通过</a>"+
                    "</div>"+
                    "<div class=\"btn-pass\">"+
                       "<a href=\"#\">通过</a>"+
                    "</div>"+
               "</div>"+
            "</div>")
            }
            main.append(frag);
        }
    });
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
    // 引用jqpaginator库实现分页功能
    $.jqPaginator('.pagination', {
        totalPages: 10,
        visiblePages: 4,
        currentPage: 1,
        first: '<li class="first"><a href="javascript:void(0);">首页</a></li>',
        prev: '<li class="prev"><a href="javascript:void(0);">&laquo;</a></li>',
        next: '<li class="next"><a href="javascript:void(0);">&raquo;</a></li>',
        last: '<li class="last"><a href="javascript:void(0);">尾页</a></li>',
        page: '<li class="page"><a href="javascript:void(0);">{{page}}</a></li>',
        // 页面修改时当前页面
        onPageChange: function onPageChange(num) {
        }
    });

})