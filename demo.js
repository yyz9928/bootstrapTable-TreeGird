$(function(){
	
	//初始化Table
    var columns = [
        {title:'议题名称', field:'title', align:'left',valign: 'middle'},
        {title:'议题ID', field:'id', sortable:true, visible:false},
        {title:'议题上级ID', field:'higher.id', sortable:true, visible:false},
        {title:'状 态', field:'topicStatus', width:80, align:'center', sortable:true, formatter : function (value, row, index){
                if(value == 0){
                    return '<span class="label label-primary"> 正 常 </span>';
                }else if(value == 1){
                    return '<span class="label label-success"> 进行中 ... </span>';
                }else if(value ==2){
                    return '<span class="label label-danger"> 结 束 </span>';
                }
            }}
    ];

    var obj = {
        stageId : meetingId,
        sortOrder : 1,
        sortFieldName :'seqNo,beginDate'
    }
    $('#myTable').bootstrapTable({
        url : '', //请求后台的URL（*）
        method : 'post', //请求方式（*）
        contentType: "application/json",
        toolbar : '#toolbar', //工具按钮用哪个容器
        striped : true, //是否显示行间隔色
        cache : true, //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination : false, //是否显示分页（*）
        sortable : false, //是否启用排序
        showFooter: false, //是否显示页尾
        sidePagination : "server", //分页方式：client客户端分页client客户端分页，server服务端分页（*）
        queryParams:obj,//请求服务器时所传的参数
        columns:columns,
        treeShowField: 'title',//分级下拉所要展示的字段
        parentIdField: 'pid',//分级下拉的上级id
        responseHandler:function(res){
            //在ajax获取到数据，渲染表格之前，修改数据源
            var datas = {};
            //请求成功处理，和本地回调完全一样
            if(isContainsError(res)){
                datas.total=0;
                return datas;
            };
            datas.rows =res.data;
            //console.log(datas.rows)
            return datas;
        },
        onLoadSuccess: function(data) {
            $('#myTable').treegrid({
                initialState: 'expanded',//收缩：collapsed  展开：expanded
                treeColumn: 0,//指明第几列数据改为树形
                expanderExpandedClass: 'fa fa-angle-double-down',
                expanderCollapsedClass: 'fa fa-angle-double-right',
                onChange: function() {
                    $('#myTable').bootstrapTable('resetWidth');
                }
            });
        }
    });
    
)}