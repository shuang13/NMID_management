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

})