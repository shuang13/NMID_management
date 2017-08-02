$(document).ready(function() {
	var ue = UE.getEditor('container');
    var $title = $('.news-title');
    var $save = $('.btn-save');
    var $submit = $('.btn-submit');

	// 选择文件事件
	$("#upload-pic").change(function() {
		// 显示文件路径
		$("#viewfile").val(this.value);
	})
    // 富文本编辑器和markdown编辑器切换
    var simplemde = new SimpleMDE({ element: document.getElementById("MyID") });
    
    $('.btn-change').on('click', function () {
        if ($('#text-editor').hasClass('view')) {
            $('#text-editor').removeClass('view');
            $('#markdown-editor').addClass('view');
        }
        else {
            $('#text-editor').addClass('view');
            $('#markdown-editor').removeClass('view');
        }
    })

	// 按钮
	// 存为草稿
	$save.on('click', function(event) {
        event.preventDefault();
        $.notice('博客上传提示：', '保存成功！', undefined, 300, 150);
    });

	// 立即上传
    $submit.on('click', function (event) {
            event.preventDefault();
            //获取html内容，返回: 
            var content = ue.getContent();
            var article = {
                title: $title.val(),
                content: content,
            };
            $.each(article,function(index,item) {
                if(article[index] == ''){
                    $.notice('新闻上传提示：', '部分信息未填写！', undefined, 300, 150);  
                }
            });
            $.ajax({
                type: "POST",
                url: "##",
                data: article,
                success: function(data){
                
                $.notice('新闻上传提示：', '发布成功！', undefined, 300, 150);
                
                }
            });
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