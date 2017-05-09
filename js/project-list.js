$(document).ready(function () {
    $.ajax({
            type: "POST",
            url: "../json/project-list",
            success: function(data){
                if(typeof data == 'string') {
                    data = JSON.parse(data);
                }

                // 解析表格数据
                parseTable(data.aaData);
                
                // 根据解析的结果，绘制表格
                drawTable(window.formdata);

                window.data = data;
            }
        });
    // 解析表格数据
    function parseTable(data) {
        window.formdata = [];
        for(var i = 0; i < data.length; i++) {
            window.formdata.push({
                "order-number": data[i][0],
                "name": data[i][1],
                "member": data[i][2],
                "system": data[i][3],
                "type": data[i][4],
                "version": data[i][5],
                "update-time": data[i][6],
                "status": data[i][7]
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
                            '<a href="project-update.html?id=' + 
                            data[i]['order-number'] + '">查看</a>' +
                            '<a href="project-update.html?id=' + 
                            data[i]['order-number'] + '">更新</a>' +
                        '</td>');
            $frag.append($tr);
        }
        $table.find('tbody').empty().append($frag);

    };
});