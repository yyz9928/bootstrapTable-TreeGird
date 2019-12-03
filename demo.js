$(function(){
	
	//��ʼ��Table
    var columns = [
        {title:'��������', field:'title', align:'left',valign: 'middle'},
        {title:'����ID', field:'id', sortable:true, visible:false},
        {title:'�����ϼ�ID', field:'higher.id', sortable:true, visible:false},
        {title:'״ ̬', field:'topicStatus', width:80, align:'center', sortable:true, formatter : function (value, row, index){
                if(value == 0){
                    return '<span class="label label-primary"> �� �� </span>';
                }else if(value == 1){
                    return '<span class="label label-success"> ������ ... </span>';
                }else if(value ==2){
                    return '<span class="label label-danger"> �� �� </span>';
                }
            }}
    ];

    var obj = {
        stageId : meetingId,
        sortOrder : 1,
        sortFieldName :'seqNo,beginDate'
    }
    $('#myTable').bootstrapTable({
        url : '', //�����̨��URL��*��
        method : 'post', //����ʽ��*��
        contentType: "application/json",
        toolbar : '#toolbar', //���߰�ť���ĸ�����
        striped : true, //�Ƿ���ʾ�м��ɫ
        cache : true, //�Ƿ�ʹ�û��棬Ĭ��Ϊtrue������һ���������Ҫ����һ��������ԣ�*��
        pagination : false, //�Ƿ���ʾ��ҳ��*��
        sortable : false, //�Ƿ���������
        showFooter: false, //�Ƿ���ʾҳβ
        sidePagination : "server", //��ҳ��ʽ��client�ͻ��˷�ҳclient�ͻ��˷�ҳ��server����˷�ҳ��*��
        queryParams:obj,//���������ʱ�����Ĳ���
        columns:columns,
        treeShowField: 'title',//�ּ�������Ҫչʾ���ֶ�
        parentIdField: 'pid',//�ּ��������ϼ�id
        responseHandler:function(res){
            //��ajax��ȡ�����ݣ���Ⱦ���֮ǰ���޸�����Դ
            var datas = {};
            //����ɹ������ͱ��ػص���ȫһ��
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
                initialState: 'expanded',//������collapsed  չ����expanded
                treeColumn: 0,//ָ���ڼ������ݸ�Ϊ����
                expanderExpandedClass: 'fa fa-angle-double-down',
                expanderCollapsedClass: 'fa fa-angle-double-right',
                onChange: function() {
                    $('#myTable').bootstrapTable('resetWidth');
                }
            });
        }
    });
    
)}