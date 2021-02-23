//jq上传文件
$("#uploadBtn").click(function () {
    var file=$("#uploadInput")[0].files[0];
    //FormDara对象
    var form=new FormData();
    //填充数据 (name,object)
    form.append("file",file);
    $.ajax({
        type:"POST",
        url:"/admin/upload/common",
        contentType:false,//传输文件必须
        processData:false,//不转化格式
        data:form,
        success:function (res) {
            //上传成功
            if (res.errno==0){
                $(".perview img").attr("src",res.data[0]);
            }else{
                alert(res.msg);
            }
        }
    })
})
// //js上传文件
// var fileInput=document.getElementById("uploadInput");
// var uploadBtn=document.getElementById("uploadBtn");
// var oImg=document.querySelector(".perview img");
// uploadBtn.onclick=function () {
//     //获取file对象
//     var file=fileInput.files[0];
//     //FormDara对象
//     var form=new FormData();
//     //填充数据 (name,object)
//     form.append("file",file);
//     //原生ajax发送
//     var ajax=new XMLHttpRequest();
//     ajax.open("POST","/admin/upload/common",true);
//     ajax.send(form);
//     //响应回调函数
//     ajax.onreadystatechange=function () {
//         if (ajax.readyState==4){
//             var res=JSON.parse(ajax.responseText);
//             上传成功
//             if (res.errno==0){
//                 oImg.setAttribute("src",res.data[0])
//             }else{
//                 alert(res.msg);
//             }
//         }
//     }
// }