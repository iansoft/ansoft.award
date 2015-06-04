/**
 * Created by shouanxx on 6/4/2015.
 */
function SendPostData(){
    student_ids = new Array();
    for(var i=0;i<10;i++){
        student_ids.push(i);
    }

    str_student_ids = JSON.stringify({"student_ids":student_ids});
    console.log(str_student_ids);

    $.ajax({
            type: "post",
            url: "/lab/post/",
            data: str_student_ids,
            dataType: "json",
            success: function (data) {
                $("#divPostReturn")[0].innerHTML = data.students;
            }
     });
}