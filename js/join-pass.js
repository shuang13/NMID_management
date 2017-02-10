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
            "</div>")
            }
            main.append(frag);
        }
    });

})