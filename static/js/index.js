/**
 * some arguments
 */
//0:none 1:一等奖 2:二等奖 3:三等奖 4:纪念奖,5:所有剩余奖项
var _AwardLevel = 4; //初始化纪念奖
//0:准备开奖 1:正在开奖 2:开奖完成
var _AwardStatus = 0;
var _IntervalID = 0;

$(document).ready(function(){
    $("#divAwardTitle").hide();
    $("#divAwardTrophy").hide();
    $("#divAward123").hide();

    //$("#btnThird").hide();
    //$("#btnSecond").hide();
    //$("#btnChampion").hide();
    //$("#btnTrophyLast").hide();
    $("#btnStartAward").show();
    $("#btnStopAward").hide();
})

//开始抽奖
function StartAward(){
    //选择不同的奖项
    ChooseAward ();

    //刷新数据
    GetAwardInterval();
}

//抽奖停止
function StopAward(){
    window.clearInterval(_IntervalID);

    $("#btnStartAward").show();
    $("#btnStopAward").hide();
    switch(_AwardLevel){
        case 4:
            _AwardLevel = 3;
            break;
        case 3:
            _AwardLevel = 2;
            break;
        case 2:
            _AwardLevel = 1;
            break;
        case 1://剩下的人
            _AwardLevel = 5;
    }
    var award_students =  $(".btn-award");
    var students_ids = new Array();
    for(var i=0;i<award_students.length;i++){
        students_ids.push(award_students[i].id);
    }
    json_obj = {"student_ids":students_ids};
    var json_str = JSON.stringify(json_obj)
    console.log(json_str);

     $.ajax({
            type: "post",
            url: "/api/record_selected_students/",
            data: json_str,
            dataType: "json",
            success: function (data) {
               //alert("获奖者人数："+data.UnselectedCount);
            }
     });
}


//选择不同级别的奖项
function ChooseAward (){
    $("#divAwardTitle").show();
    $("#btnStartAward").hide();
    $("#btnStopAward").show();

    switch(_AwardLevel){
        case 1: //一等奖
            _AwardLevel = 1;
            $("#divAwardTitle")[0].innerHTML = "一等奖";
            $("#divAwardTrophy").hide();
            $("#divAward123").show();
            break;
        case 2: //二等奖
            _AwardLevel = 2;
            $("#divAwardTitle")[0].innerHTML = "二等奖";
            $("#divAwardTrophy").hide();
            $("#divAward123").show();
            break;
        case 3: //三等奖
            _AwardLevel = 3;
            $("#divAwardTitle")[0].innerHTML = "三等奖";
            $("#divAwardTrophy").hide();
            $("#divAward123").show();
            break;
        case 4: //纪念奖
            _AwardLevel = 4;
            $("#divAwardTitle")[0].innerHTML = "纪念奖";
            $("#divAwardTrophy").show();
            $("#divAward123").hide();
            break;
        case 5: //纪念奖:最后
            _AwardLevel = 5;
            $("#divAwardTitle")[0].innerHTML = "纪念奖";
            $("#divAwardTrophy").show();
            $("#divAward123").hide();
            break;
    }

    //$("#btnAwardLevel")[0].innerHTML = _AwardLevel;
}

//获取开奖信息
function GetAwardInterval(){
    _IntervalID = setInterval(function(){
        $.ajax({
            type: "get",
            url: "/api/get_awards/",
            data: {"level":_AwardLevel},
            dataType: "json",
            success: function (data) {
               console.log(data);
                switch(_AwardLevel){
                    case 5: //剩下所有的人
                        $("#divAwardTrophy").empty();
                        students = data.students;
                        for(var i=0;i<students.length;i++){
                            var _award = "<button id='"+students[i][0]+"' class='btn btn-danger btn-lg btn-award'>"+students[i][1]+"</button>";
                            $("#divAwardTrophy").append(_award);
                        }
                        break;
                    case 4: //纪念奖
                        $("#divAwardTrophy").empty();
                        students = data.students;
                        for(var i=0;i<students.length;i++){
                            var _award = "<button id='"+students[i][0]+"' class='btn btn-danger btn-lg btn-award'>"+students[i][1]+"</button>";
                            $("#divAwardTrophy").append(_award);
                        }
                        break;
                    default://1,2,3等奖
                        $("#divAward123").empty();
                        students = data.students;
                        for(var i=0;i<students.length;i++){
                            var _award = "<button id='"+students[i][0]+"' class='btn btn-danger btn-lg btn-award'>"+students[i][1]+"</button>";
                            $("#divAward123").append(_award);
                        }
                        break;
                }
            }
        });
    },50);
}


//init db
function InitDB(){
     $.ajax({
            type: "get",
            url: "/api/init_db/",
            data: {"level":_AwardLevel},
            dataType: "json",
            success: function (data) {
               console.log(data);
            }
     });
}

function Reset(){
     $.ajax({
            type: "get",
            url: "/api/reset/",
            data: {"level":_AwardLevel},
            dataType: "json",
            success: function (data) {
               alert("Reset successfully")
            }
     });
}