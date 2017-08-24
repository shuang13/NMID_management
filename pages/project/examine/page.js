var utils = new Utils();

// 解析表格数据
var parseData = function (data) {
    var formdata = [];
    for(var i = 0; i < data.length; i++) {
        var members = [];
        for (let j = 0; j < data[i].authors.length; j++) {        
            members.push(data[i].authors[j].name);
        }
        formdata.push({
            "id": data[i].id,
            "name": data[i].name,
            "system": data[i].support,
            "authors": members.join('、'),
            "version": data[i].version,
            "update-time": utils.getdate(data[i].time),
            "status": '未审核', 
            "operation": '<a href="project-update.html?id=' + 
                        data[i].id + '">通过</a>' +" | " +
                        '<a href="project-update.html?id=' + 
                        data[i].id + '">不通过</a>' 
        }); 
    }
    return formdata;

}
// 分页
var pagination = function (totalPage) {
    $("#pagination").pagination({
        currentPage: 1,
        totalPage: totalPage,
        callback: function(current) {
            var ajaxArgs = {
                page: current,
            };
            $.ajax({
                type: "GET",
                // beforeSend: user.loading($('tbody')),
                url: utils.URLHead + "/works",
                data: ajaxArgs,
                success: function (data) {
                    if(typeof data == 'string') {
                        data = JSON.parse(data);
                    }
                    var status = data.code;//状态码
                    if (status == 200) {
                        // 获取原始数据
                        var aaData = data.body.list;
                        var pageNum = data.body.num;
                        
                        console.log(aaData);
                    
                        // 数据解析
                        var new_data = parseData(aaData);
                                        
                        // 根据解析的结果，绘制表格
                        utils.drawTable(new_data, '../edit/page.html');
                    }
                }
            });
        }
    });
}
$(document).ready(function () {

    $.ajax({
        type: "GET",
        beforeSend: utils.loading($('tbody')),
        url: utils.URLHead + "/works/unpass",
        success: function(data){
            if(typeof data == 'string') {
                data = JSON.parse(data);
            }
            var status = data.code;
            if (status == 200) {
                // 获取原始数据
                var aaData = data.body.list;
                var pageNum = Math.ceil(data.body.num / data.body.list.length);

                // 数据解析
                var new_data = parseData(aaData);
                                
                // 根据解析的结果，绘制表格
                utils.drawTable(new_data, '../edit/page.html');
                pagination(pageNum);
            }
        }
    });
})