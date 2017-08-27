var utils = new Utils();

// 解析表格数据
var parseData = function (data) {
    var formdata = [{
        "id": data.id,
        "name": data.name,
        "mail": data.email,
        "role": data.role,
        "platform": data.platform,
        "job": data.job,
        "last-login": data.last_login_time
    }]
    return formdata;

}

$(document).ready(function () {
    utils.loginTesting();
    $.ajax({
        type: "GET",
        beforeSend: utils.loading($('tbody')),
        url: utils.URLHead + "/users/" + utils.my_id,
        success: function(data){
            if(typeof data == 'string') {
                data = JSON.parse(data);
            }
            var status = data.code;
            if (status == 200) {
                // 获取原始数据
                var aaData = data.body;
                // 数据解析
                var new_data = parseData(aaData);
                // 根据解析的结果，绘制表格
                utils.drawTable(new_data);
            }
        }
    });
})