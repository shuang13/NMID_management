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
})