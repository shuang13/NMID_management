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
            "order-number": ((i + ((current-1)*16)) + 1),
            "name": data[i].name,
            "system": data[i].support,
            "authors": members.join('、'),
            "version": data[i].version,
            "update-time": utils.getdate(data[i].time),
            "status": '已审核',
            "operation": '<a href="../visit/page.html?id=' + 
                        data[i].id + '">查看</a>' +" | " +
                        '<a href="../edit/page.html?id=' + 
                        data[i].id + '">更新</a>' + 
                        '<button class="add-member" >添加项目组成员</button>' 

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
                        window.current = current;
                        
                        console.log(aaData);
                    
                        // 数据解析
                        var new_data = parseData(aaData);
                                        
                        // 根据解析的结果，绘制表格
                        utils.drawTable(new_data);
                        $('.add-member').on('click', addMember);
                    }
                }
            });
        }
    });
}
var drawList = function (data, text) {
        var $frag = $(document.createDocumentFragment());
        var table = 
                    '<table cellspacing="0" class="add-member-table">' +
                        '<thead >' +
                            '<tr>' +
                                '<th data-name="order-number"></th>' +
                                '<th data-name="name"></th>' +
                                '<th data-name="operation"></th>' +
                            '</tr>' +
                        '</thead>' +
                        '<tbody></tbody>' +
                        '<div class="member-submit">' +
                            '确认' +
                        '</div>' +
                    '</table>';

        $.notice(text + '：', table, function () {
            // body...
        });           
        $('.jq-notice-container .jq-notice-content').css('top', '10%');

        var $context = $('.jq-notice-context');
        var $ths = $context.find('th');
    
        for(var i = 0; i < data.length; i++) {
            var $tr = $('<tr data-id="' + data[i].id + '"></tr>');
            for(var j = 0; j < $ths.length; j++) {
                $tr.append('<td>' + data[i][$ths.eq(j).attr('data-name')] + '</td');
            }
            $frag.append($tr);
        }
        $context.find('tbody').empty().append($frag);
    }
// 解析表格数据
var parseList = function (data) {
    var formdata = [];
    for(var i = 0; i < data.length; i++) {
        formdata.push({
            "id": data[i].id,
            "order-number": i + 1,
            "name": data[i].name,
            "operation": '<input type="checkbox" name="member" value="' + data[i].id + '">' 
        }); 
    }
    return formdata;

}
function addMember(event) {
    var p_id = $(this).closest('tr').attr('data-id');
    log(p_id)
    var ajaxArgs = {
        page_size: 100
    }
    $.ajax({
        type: "GET",
        url: utils.URLHead + "/users",
        data: ajaxArgs,
        success: function (data) {
            // 获取原始数据
            var aaData = data.body.list;
            // 数据解析
            var new_data = parseList(aaData);
            // 根据解析的结果，绘制表格
            drawList(new_data, '添加成员');

            $('.member-submit').on('click', function () {
                $.closeNotice();
                var text = $("input:checkbox[name='member']:checked");
                var authors = [];
                for (var i = 0; i < text.length; i++) {
                    authors.push({
                        name: "authors",
                        value: text[i].value
                    }
                    );
                }
               
                var memberArgs = {
                    authors: authors
                }

                $.ajax({
                    type: "POST",
                    url: utils.URLHead + "/works/" + p_id + "/authors",
                    data: authors,
                    beforeSend: $.notice('提示！', '正在提交...', function () {
                            utils.loading($('.jq-notice-context'));
                        }),
                    success: function (data) {
                        // 获取原始数据
                        var aaData = data.body.list;
                        log(data)
                        var status = data.code;
                        // 数据解析
                        if (status == 201) {
                            $('.jq-notice-context').html('提交成功!');
                            setTimeout("location.reload()",1000); 
                        }
                        
                    }
                });
            })
        }
    });
}

$(document).ready(function () {
    utils.loginTesting();
    

    $.ajax({
        type: "GET",
        beforeSend: utils.loading($('tbody')),
        url: utils.URLHead + "/works",
        success: function(data){
            if(typeof data == 'string') {
                data = JSON.parse(data);
            }
            var status = data.code;
            if (status == 200) {
                // 获取原始数据
                var aaData = data.body.list;
                var pageNum = Math.ceil(data.body.num / data.body.list.length);
                window.current = 1;
                // 数据解析
                var new_data = parseData(aaData);
                                
                // 根据解析的结果，绘制表格
                utils.drawTable(new_data);
                
                pagination(pageNum);
                $('.add-member').on('click', addMember);
                for (var i = 0; i < $('tr').length; i++) {
                    if ($('tr').eq(i + 1).find('td').eq(2).html() !== '') {
                        log(i)
                        $('tr').eq(i + 1).find('.add-member').remove();

                    }

                }
            }
        }
    });
})