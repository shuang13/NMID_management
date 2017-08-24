$(document).ready(function () {
    $.ajax({
            type: "POST",
            url: "../json/myblog",
            success: function(data){
                if(typeof data == 'string') {
                    data = JSON.parse(data);
                }

                // 解析表格数据
                parseTable(data.aaData);
                
                // 根据解析的结果，绘制表格
                drawTable(window.formdata);

                window.data = data;

                // 操作
                operate();
            }
        });
    // 解析表格数据
    function parseTable(data) {
        window.formdata = [];
        for(var i = 0; i < data.length; i++) {
            window.formdata.push({
                "classify": data[i][0],
                "tag": data[i][1],
                "title": data[i][2],
                "status": data[i][3],
                "time": data[i][4],
                "modify": data[i][5]
            });
        }
    }
    // 绘制表格
    function drawTable (data, callback) {
        var $frag = $(document.createDocumentFragment());

        var $table = $('table');
        var $ths = $table.find('th');
    
        for(var i = 0; i < data.length; i++) {
            var $tr = $('<tr></tr>');
            for(var j = 0; j < $ths.length - 1; j++) {
                $tr.append('<td>' + data[i][$ths.eq(j).attr('data-name')] + '</td');

            }
            $tr.append( '<td class="operate">' +
                            '<a class="edit" href="##">编辑</a>' +
                            '<a class="delete" href="##">删除</a>' +
                        '</td>');
            $frag.append($tr);
        }
        $table.find('tbody').empty().append($frag);

    };
     // 表格操作
    function operate() {
        $('.edit').on('click',function (event) {
            alert("编辑？" + $(this).parent().parent('tr').index());
            $(this).css("color","red");
            var id = $(this).parent().parent('tr').index() + 1;
            var info = {
                id: id
            };
            // $.ajax({
            //     type: "POST",
            //     url: "../json/project-list",
            //     data: info,
            //     success: function(data){
            //         if(typeof data == 'string') {
            //             data = JSON.parse(data);
            //         }
    
            //         // 解析表格数据
            //         parseTable(data.aaData);
                    
            //         // 根据解析的结果，绘制表格
            //         drawTable(window.formdata);
    
            //         window.data = data;
            //     }
            // });
        });
         $('.delete').on('click',function (event) {
            alert("删除？" + $(this).parent().parent('tr').index());
            $(this).css("color","red");
            var id = $(this).parent().parent('tr').index() + 1;
            var info = {
                id: id
            };
            // $.ajax({
            //     type: "POST",
            //     url: "../json/project-list",
            //     data: info,
            //     success: function(data){
            //         if(typeof data == 'string') {
            //             data = JSON.parse(data);
            //         }
    
            //         // 解析表格数据
            //         parseTable(data.aaData);
                    
            //         // 根据解析的结果，绘制表格
            //         drawTable(window.formdata);
    
            //         window.data = data;
            //     }
            // });
        });
    }
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
});