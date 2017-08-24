$(document).ready(function() {
	var $job = $("#job");
	var $skill = $("#skill");
	var $project = $("#project");
	var $practice = $("#practice");
	var $honor = $("#honor");
	
	$('.setting-resume .btn-submit a').on('click', function(event) {
		var info = {
			job: $job.val(),
			skill: $skill.val(),
			project: $project.val(),
			practice: $practice.val(),
			honor: $honor.val()
		};
		console.log(info);
		event.preventDefault();
		// 检测信息是否为空
        $.each(info, function(index, item) {
            if (info[index] == '') {
                $.notice('项目更新提示：', '部分信息未填写！', undefined, 300, 150);  
                return;
            } else {
            	$.ajax({
		            type: 'POST',
		            url: '',
		            data: info,
		            success: function (data) {
		                if(typeof data == 'string') {
		                    data = JSON.parse(data);
		                }
		            }
		        });
            }
        })
		
	});
})