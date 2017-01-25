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
});