function signOut() {
    window.location.href = '/xaingmu/SignOut/';
}

function choooseTeacher() {
    var chooseTeacher = document.getElementById("chooseTeacher");
    var code = "";
    $.ajax({
        url: "/xaingmu/chooseTeacher/",
        async: false,
        type: 'POST',
        dataType: 'json',
        success: function(data) {
            var ret = eval("(" + data + ")");
            switch (ret['ret']) {
                case "Success":
                    code = code + ' <div class="4u" name="t1">\
                            <article class="box box-style2">\
                                <a class="image image-full" href="' + ret["teacherHref1"] + '"\
                                    <img alt="" src="' + ret["teacherImage1"] + '"/>\
                                </a>\
                                <h3>\
                                    <a>' +
                                        ret["teacherName1"] +
                                    '</a>\
                                </h3>\
                                <p>'+
                                    ret["teacherInf1"] +
                                '</p>\
                            </article>\
                        </div>\
                        <div class="4u" name="t2">\
                            <article class="box box-style2">\
                                <a class="image image-full" href="' + ret["teacherHref2"] +'">\
                                    <img alt="" src="' + ret["teacherImage2"] +'"/>\
                                </a>\
                                <h3>\
                                    <a>'+
                                        ret["teacherName2"] +
                                    '</a>\
                                </h3>\
                                <p>'+
                                    ret["teacherInf2"] +
                                '</p>\
                            </article>\
                        </div>\
                        <div class="4u" name="t3">\
                            <article class="box box-style2">\
                                <a class="image image-full" href="' + ret["teacherHref3"] + '">\
                                    <img alt="" src="' + ret["teacherImage3"] + '"/>\
                                </a>\
                                <h3>\
                                    <a>'+
                                        ret["teacherName3"] +
                                    '</a>\
                                </h3>\
                                <p>'+
                                    ret["teacherInf3"] +
                                '</p>\
                            </article>\
                        </div>';
                    chooseTeacher.innerHTML = code;
                    break;
                case "Fail":
                    var onlyChoseAlert = simpleAlert({
                        "content": "获取teacher信息失败",
                        "buttons": {
                            "确定": function() {
                                onlyChoseAlert.close();
                            }
                        }
                    })
                    break;
                default:
                    var onlyChoseAlert = simpleAlert({
                        "content": "未知错误",
                        "buttons": {
                            "确定": function() {
                                onlyChoseAlert.close();
                            }
                        }
                    })
            }
        }
    });
}

function cancelOrder(id) {
    $.ajax({
        url: "/xaingmu/cancelOrder/",
        data: {
            id: id,
        },
        async: false,
        type: 'POST',
        dataType: 'json',
        success: function(data) {
            var ret_data = eval("(" + data + ")");
            switch (ret_data['ret']) {
                case "Success":
                    var onlyChoseAlert = simpleAlert({
                        "content": "取消成功",
                        "buttons": {
                            "确定": function() {
                                onlyChoseAlert.close();
                            }
                        }
                    })
                    var btn = document.getElementsByName(id);
                    btn.innerHtml = "已取消";
                    btn.style.background = "pink";
                    btn.disable = true;
                    break;
                case "Fail":
                    var onlyChoseAlert = simpleAlert({
                        "content": "取消失败,请稍后重试",
                        "buttons": {
                            "确定": function() {
                                onlyChoseAlert.close();
                            }
                        }
                    })
                    break;
                default:
                    var onlyChoseAlert = simpleAlert({
                        "content": "未知错误",
                        "buttons": {
                            "确定": function() {
                                onlyChoseAlert.close();
                            }
                        }
                    })
            }
        }
    });
}

function signInCheck() {
    var username = $("input[name=accountIn]").val();
    var password = $("input[name=passwordIn]").val();
    var checkTeacher = document.getElementsByName("isTeacherIn");
    var Login = document.getElementById("Login");
    var code = "";
    var isTeacher;
    if (checkTeacher[1].checked) {
        isTeacher = checkTeacher[1].value;
    } else {
        isTeacher = checkTeacher[0].value;
    }
    if (username.replace(/(^s*)|(s*$)/g, "").length == 0 || password.replace(/(^s*)|(s*$)/g, "").length == 0 || isTeacher.replace(/(^s*)|(s*$)/g, "").length == 0) {
        var onlyChoseAlert = simpleAlert({
            "content": "请输入参数",
            "buttons": {
                "确定": function() {
                    onlyChoseAlert.close();
                }
            }
        })
        return false;
    }
    var c = document.getElementById('closeSignIn');
    c.click();
    $.ajax({
        url: "/xaingmu/LoginIn",
        data: {
            Account: username,
            Password: password,
            IsTeacher: isTeacher
        },
        async: false,
        type: "POST",
        dataType: "json",
        success: function(data) {
            var ret = eval("(" + data + ")");
            switch (ret["ret"]) {
                case "NoPara":
                    var onlyChoseAlert = simpleAlert({
                        "content": "请输入参数",
                        "buttons": {
                            "确定": function() {
                                onlyChoseAlert.close();
                            }
                        }
                    })
                    break;
                case "NotFound":
                	
                    var onlyChoseAlert = simpleAlert({
                        "content": "用户名不存在",
                        "buttons": {
                            "确定": function() {
                                onlyChoseAlert.close();
                            }
                        }
                    })
                    
                    break;
                case "ErrorPassword":
                    var onlyChoseAlert = simpleAlert({
                        "content": "密码错误，请重新输入",
                        "buttons": {
                            "确定": function() {
                                onlyChoseAlert.close();
                            }
                        }
                    })
                    break;
                case "Success":
                    setTimeout(function() {
                    	code = code + '<div class="wrapper wrapper-style1 wrapper-first"><article class="container" id="top"><div class="row">\
                    <div class="4u">\
                        <span class="me image image-full">\
                            <img onmousedown="signInCheck()" src="' + ret["picture"] + '"/>\
                        </span>\
                    </div>\
                    <div class="8u">\
                        <form method="POST">\
                            <div class="row first-child">\
                                <div class="6u">\
                                    <label for="loginName">\
                                        姓名\
                                    </label>\
                                    <input id="loginName" name="loginName" value="' +ret["loginName"]+ '" placeholder="姓名" style="background-color:#EEE" type="text"/>\
                                </div>\
                                <div class="6u">\
                                    <label for="loginCollege">\
                                        學院\
                                    </label>\
                                    <input id="loginCollege" name="loginCollege" value="' +ret["loginCollege"]+ '"  placeholder="学院" style="background-color:#EEE" type="text"/>\
                                </div>\
                            </div>\
                            <div class="row half">\
                            	<div class="6u">\
                                    <label for="loginPhone">\
                                        联系方式\
                                    </label>\
                                    <input id="loginPhone" name="loginPhone" value="' +ret["loginPhone"]+ '" placeholder="联系方式" style="background-color:#EEE" type="text"/>\
                                </div>';
                    	if(ret["isTeacher"] == "false"){
                    		code = code + '<div class="6u">\
                            <label for="loginMajor">\
                            專業\
                        </label>\
                        <input id="loginMajor" name="loginMajor" value="' +ret["loginMajor"]+ '" placeholder="专业" style="background-color:#EEE" type="text"/>\
                    </div>\
                </div>\
                <div class="row half">\
                    <div class="6u">\
                        <button style="text-align: center；background-color:#02FCEC；border-radius: 8px;" type="submit"  onclick="changeStudentInf()">更改信息</button>\
                    </div>\
                </div>\
                <div class="6u">\
                <button style="text-align: center；background-color:#02FCEC；border-radius: 8px;" onclick="signOut()">退出登录</button>\
            </div>\
            </form>\
            <div class="8u" style="padding-top:2em">\
                <p>\
                    Hi!\
                    <strong>'
						+ret["loginName"]+
                    '</strong>\
                    。 您的预约如下\
                </p>\
            </div>\
        </div>\
    </div>\
    <table>\
        <thead>\
            <tr>\
                <th>\
                    预约编号\
                </th>\
                <th>\
                    预约时间\
                </th>\
                <th>\
                    教师\
                </th>\
                <th>\
                    地点\
                </th>\
                <th>\
                    审核状态\
                </th>\
                <th>\
                    取消\
                </th>\
            </tr>\
        </thead>\
        <tbody>\
        <tr>\
                <td>\
                    <button onclick="cancelOrder($this.val())" style="height:100%;width:100%;border:0;background-color:white;">\
                        取消\
                    </button>\
                </td>\
            </tr>\
           \
        </tbody>\
    </table>';
                    	}else{
                    		code = code + '<div class="6u">\
                            <label for="loginPosition">\
                            职称\
                        </label>\
                        <input id="loginPosition" name="loginPosition" placeholder="职称" value="' + ret["loginPosition"]+ '" style="background-color:#EEE" type="text"/>\
                    </div>\
                </div>\
                <div class="row half">\
                    <div class="6u">\
                        <button style="text-align: center；background-color:#02FCEC；border-radius: 8px;" type="submit"  onclick="changeTeacherInf()">更改信息</button>\
                    </div>\
                    <div class="6u">\
                    <button style="text-align: center；background-color:#02FCEC；border-radius: 8px;" onclick="signOut()">退出登录</button>\
                </div>\
                </div>\
            </form>\
            <div class="8u" style="padding-top:2em">\
                <p>\
                    Hi!\
                    <strong>'
                       + ret["loginName"] +
                    '</strong>\
                    。 您的日程如下\
                </p>\
            </div>\
        </div>\
    </div>\
    <table>\
        <thead>\
            <tr>\
                <th>\
                    时间\
                </th>\
                <th>\
                    星期一\
                </th>\
                <th>\
                    星期二\
                </th>\
                <th>\
                    星期三\
                </th>\
                <th>\
                    星期四\
                </th>\
                <th>\
                    星期五\
                </th>\
            </tr>\
        </thead>\
        <tbody>\
            <tr>\
                <td>\
                	上午\
                </td>';
                if(ret["MonAm"] == "none"){
                	code = code + '<td>\
                <div class="morph-button morph-button-modal morph-button-modal-3 morph-button-fixed">\
                    <button type="button">\
                        增加日程\
                    </button>\
                    <div class="morph-content" style="overflow-y:scroll;">\
                        <div>\
                            <div class="content-style-form content-style-form-2">\
                                <span class="icon icon-close">\
                                    Close the dialog\
                                </span>\
                                <form method="POST">\
                                    <p>\
                                        <label>\
                                            内容\
                                        </label>\
                                        <input name="MonAm" type="text">\
                                        </p>\
                                            <p>\
                                                <button  onclick="addSchedule($(this).val())" type="submit" value="MonAm">\
                                                    增加\
                                                </button>\
                                            </p>\
                                </form>\
                            </div>\
                        </div>\
                    </div>\
                </div>\
                </td>';
                }else{
                	code = code + '<td>' + ret["MonAm"] + '</td>';
                }
                if(ret["TueAm"] == "none"){
                	code = code + '<td>\
                <div class="morph-button morph-button-modal morph-button-modal-3 morph-button-fixed">\
                    <button type="button">\
                        增加日程\
                    </button>\
                    <div class="morph-content" style="overflow-y:scroll;">\
                        <div>\
                            <div class="content-style-form content-style-form-2">\
                                <span class="icon icon-close">\
                                    Close the dialog\
                                </span>\
                                <form method="POST">\
                                    <p>\
                                        <label>\
                                            内容\
                                        </label>\
                                        <input name="TueAm" type="text">\
                                        </p>\
                                            <p>\
                                                <button  onclick="addSchedule($(this).val())" type="submit" value="TueAm">\
                                                    增加\
                                                </button>\
                                            </p>\
                                </form>\
                            </div>\
                        </div>\
                    </div>\
                </div>\
                </td>';
                }else{
                	code = code + '<td>' + ret["TueAm"] + '</td>';
                }
                if(ret["WedAm"] == "none"){
                	code = code + '<td>\
                <div class="morph-button morph-button-modal morph-button-modal-3 morph-button-fixed">\
                    <button type="button">\
                        增加日程\
                    </button>\
                    <div class="morph-content" style="overflow-y:scroll;">\
                        <div>\
                            <div class="content-style-form content-style-form-2">\
                                <span class="icon icon-close">\
                                    Close the dialog\
                                </span>\
                                <form method="POST">\
                                    <p>\
                                        <label>\
                                            内容\
                                        </label>\
                                        <input name="WedAm" type="text">\
                                        </p>\
                                            <p>\
                                                <button  onclick="addSchedule($(this).val())" type="submit" value="WedAm">\
                                                    增加\
                                                </button>\
                                            </p>\
                                </form>\
                            </div>\
                        </div>\
                    </div>\
                </div>\
                </td>';
                }else{
                	code = code + '<td>' + ret["WedAm"] + '</td>';
                }
                if(ret["ThuAm"] == "none"){
                	code = code + '<td>\
                <div class="morph-button morph-button-modal morph-button-modal-3 morph-button-fixed">\
                    <button type="button">\
                        增加日程\
                    </button>\
                    <div class="morph-content" style="overflow-y:scroll;">\
                        <div>\
                            <div class="content-style-form content-style-form-2">\
                                <span class="icon icon-close">\
                                    Close the dialog\
                                </span>\
                                <form method="POST">\
                                    <p>\
                                        <label>\
                                            内容\
                                        </label>\
                                        <input name="ThuAm" type="text">\
                                        </p>\
                                            <p>\
                                                <button  onclick="addSchedule($(this).val())" type="submit" value="ThuAm">\
                                                    增加\
                                                </button>\
                                            </p>\
                                </form>\
                            </div>\
                        </div>\
                    </div>\
                </div>\
                </td>';
                }else{
                	code = code + '<td>' + ret["ThuAm"] + '</td>';
                }
                if(ret["FriAm"] == "none"){
                	code = code + '<td>\
                <div class="morph-button morph-button-modal morph-button-modal-3 morph-button-fixed">\
                    <button type="button">\
                        增加日程\
                    </button>\
                    <div class="morph-content" style="overflow-y:scroll;">\
                        <div>\
                            <div class="content-style-form content-style-form-2">\
                                <span class="icon icon-close">\
                                    Close the dialog\
                                </span>\
                                <form method="POST">\
                                    <p>\
                                        <label>\
                                            内容\
                                        </label>\
                                        <input name="FriAm" type="text">\
                                        </p>\
                                            <p>\
                                                <button  onclick="addSchedule($(this).val())" type="submit" value="FriAm">\
                                                    增加\
                                                </button>\
                                            </p>\
                                </form>\
                            </div>\
                        </div>\
                    </div>\
                </div>\
                </td>';
                }else{
                	code = code + '<td>' + ret["FriAm"] + '</td>';
                }
            code = code + '</tr>\
            <tr>\
                <td>\
                	下午\
                </td>';
            if(ret["MonPm"] == "none"){
            	code = code + '<td>\
            <div class="morph-button morph-button-modal morph-button-modal-3 morph-button-fixed">\
                <button type="button">\
                    增加日程\
                </button>\
                <div class="morph-content" style="overflow-y:scroll;">\
                    <div>\
                        <div class="content-style-form content-style-form-2">\
                            <span class="icon icon-close">\
                                Close the dialog\
                            </span>\
                            <form method="POST">\
                                <p>\
                                    <label>\
                                        内容\
                                    </label>\
                                    <input name="MonPm" type="text">\
                                    </p>\
                                        <p>\
                                            <button  onclick="addSchedule($(this).val())" type="submit" value="MonPm">\
                                                增加\
                                            </button>\
                                        </p>\
                            </form>\
                        </div>\
                    </div>\
                </div>\
            </div>\
            </td>';
            }else{
            	code = code + '<td>' + ret["MonPm"] + '</td>';
            }
            if(ret["TuePm"] == "none"){
            	code = code + '<td>\
            <div class="morph-button morph-button-modal morph-button-modal-3 morph-button-fixed">\
                <button type="button">\
                    增加日程\
                </button>\
                <div class="morph-content" style="overflow-y:scroll;">\
                    <div>\
                        <div class="content-style-form content-style-form-2">\
                            <span class="icon icon-close">\
                                Close the dialog\
                            </span>\
                            <form method="POST">\
                                <p>\
                                    <label>\
                                        内容\
                                    </label>\
                                    <input name="TuePm" type="text">\
                                    </p>\
                                        <p>\
                                            <button  onclick="addSchedule($(this).val())" type="submit" value="TuePm">\
                                                增加\
                                            </button>\
                                        </p>\
                            </form>\
                        </div>\
                    </div>\
                </div>\
            </div>\
            </td>';
            }else{
            	code = code + '<td>' + ret["TuePm"] + '</td>';
            }
            if(ret["WedPm"] == "none"){
            	code = code + '<td>\
            <div class="morph-button morph-button-modal morph-button-modal-3 morph-button-fixed">\
                <button type="button">\
                    增加日程\
                </button>\
                <div class="morph-content" style="overflow-y:scroll;">\
                    <div>\
                        <div class="content-style-form content-style-form-2">\
                            <span class="icon icon-close">\
                                Close the dialog\
                            </span>\
                            <form method="POST">\
                                <p>\
                                    <label>\
                                        内容\
                                    </label>\
                                    <input name="WedPm" type="text">\
                                    </p>\
                                        <p>\
                                            <button  onclick="addSchedule($(this).val())" type="submit" value="WedPm">\
                                                增加\
                                            </button>\
                                        </p>\
                            </form>\
                        </div>\
                    </div>\
                </div>\
            </div>\
            </td>';
            }else{
            	code = code + '<td>' + ret["WedPm"] + '</td>';
            }
            if(ret["ThuPm"] == "none"){
            	code = code + '<td>\
            <div class="morph-button morph-button-modal morph-button-modal-3 morph-button-fixed">\
                <button type="button">\
                    增加日程\
                </button>\
                <div class="morph-content" style="overflow-y:scroll;">\
                    <div>\
                        <div class="content-style-form content-style-form-2">\
                            <span class="icon icon-close">\
                                Close the dialog\
                            </span>\
                            <form method="POST">\
                                <p>\
                                    <label>\
                                        内容\
                                    </label>\
                                    <input name="ThuPm" type="text">\
                                    </p>\
                                        <p>\
                                            <button  onclick="addSchedule($(this).val())" type="submit" value="ThuPm">\
                                                增加\
                                            </button>\
                                        </p>\
                            </form>\
                        </div>\
                    </div>\
                </div>\
            </div>\
            </td>';
            }else{
            	code = code + '<td>' + ret["ThuPm"] + '</td>';
            }
            if(ret["FriPm"] == "none"){
            	code = code + '<td>\
            <div class="morph-button morph-button-modal morph-button-modal-3 morph-button-fixed">\
                <button type="button">\
                    增加日程\
                </button>\
                <div class="morph-content" style="overflow-y:scroll;">\
                    <div>\
                        <div class="content-style-form content-style-form-2">\
                            <span class="icon icon-close">\
                                Close the dialog\
                            </span>\
                            <form method="POST">\
                                <p>\
                                    <label>\
                                        内容\
                                    </label>\
                                    <input name="FriPm" type="text">\
                                    </p>\
                                        <p>\
                                            <button  onclick="addSchedule($(this).val())" type="submit" value="FriPm">\
                                                增加\
                                            </button>\
                                        </p>\
                            </form>\
                        </div>\
                    </div>\
                </div>\
            </div>\
            </td>';
            }else{
            	code = code + '<td>' + ret["FriPm"] + '</td>';
            }
            code = code + '</tr>\
        </tbody>\
    </table>';
                    	}
            Login.innerHTML = code + '</article></div>';
                    }, 1000);
                    break;
                
            }
        }
    });
    return false;
}

function signUpCheck() {
    var username = $("input[name=accountUp]").val();
    var password = $("input[name=passwordUp]").val();
    var confirmPassword = $("input[name=passwordConfirm]").val();
    var college = $("input[name=collegeUp]").val();
    var majorOrPosition;
    var phone = $("input[name=telUp]").val();
    var realName = $("input[name=realNameUp]").val();
    var checkTeacher = document.getElementsByName("isTeacherUp");
    var isTeacher;
    if (checkTeacher[1].checked) {
        isTeacher = checkTeacher[1].value;
        majorOrPosition = $("input[name=majorUp]").val();
    } else {
    	majorOrPosition = $("input[name=positionUp]").val();
        isTeacher = checkTeacher[0].value;
    }
    if (username.replace(/(^s*)|(s*$)/g, "").length == 0 || password.replace(/(^s*)|(s*$)/g, "").length == 0 || confirmPassword.replace(/(^s*)|(s*$)/g, "").length == 0 || college.replace(/(^s*)|(s*$)/g, "").length == 0 || majorOrPosition.replace(/(^s*)|(s*$)/g, "").length == 0 || phone.replace(/(^s*)|(s*$)/g, "").length == 0 || realName.replace(/(^s*)|(s*$)/g, "").length == 0) {
        var onlyChoseAlert = simpleAlert({
            "content": "请输入参数",
            "buttons": {
                "确定": function() {
                    onlyChoseAlert.close();
                }
            }
        })
        return false;
    }
    if (password != confirmPassword) {
        var onlyChoseAlert = simpleAlert({
            "content": "密码不一致",
            "buttons": {
                "确定": function() {
                    onlyChoseAlert.close();
                }
            }
        })
    } else {
        var c = document.getElementById('closeSignUp');
        $.ajax({
            url: "/xaingmu/SignUp",
            data: {
                Account: username,
                Password: password,
                IsTeacher: isTeacher,
                realName: realName,
                college: college,
                majorOrPosition: majorOrPosition,
                phone: phone
            },
            async: false,
            type: "POST",
            dataType: "json",
            success: function(data) {
                var ret_data = eval("(" + data + ")");
                c.click();
                switch (ret_data["ret"]) {
                    
                    case "Exist":
                        var onlyChoseAlert = simpleAlert({
                            "content": "用户已存在",
                            "buttons": {
                                "确定": function() {
                                    onlyChoseAlert.close();
                                }
                            }
                        })
                        break;
                    case "Success":
                        var onlyChoseAlert = simpleAlert({
                            "content": "注册成功，请登录",
                            "buttons": {
                                "确定": function() {
                                    onlyChoseAlert.close();
                                }
                            }
                        })
                        break;
                }
            }
        });
        return false;
    }
}

function search() {
    var teacherName = $("input[name=teacherName]").val();
    var navTeacherInf = document.getElementById("navTeacherInf");
   // var teacherInf - document.getElementById("teacherInf"); // add the dom teacher to show the teacher information
    if (teacherName.replace(/(^s*)|(s*$)/g, "").length == 0) {
        var onlyChoseAlert = simpleAlert({
            "content": "教师姓名不能为空",
            "buttons": {
                "确定": function() {
                    onlyChoseAlert.close();
                }
            }
        })
        return false;
    }
    $.ajax({
        url: "/xaingmu/searchTeacher",
        data: {
            teacherName: teacherName
        },
        async: false,
        type: "POST",
        dataType: "json",
        success: function(data) {
            var ret_data = eval("(" + data + ")");
            switch (ret_data["isSuccess"]) {
                case "NotFound":
                    var onlyChoseAlert = simpleAlert({
                        "content": "教师不存在",
                        "buttons": {
                            "确定": function() {
                                onlyChoseAlert.close();
                            }
                        }
                    })
                    break;
                case "Fail":
                    var onlyChoseAlert = simpleAlert({
                        "content": "查询失败",
                        "buttons": {
                            "确定": function() {
                                onlyChoseAlert.close();
                            }
                        }
                    })
                    break;
                case "Success":
                //    teacherInf.style.display = "block";
                    navTeacherInf.style.display = "block";
                    break;
            }
        }
    })
    return false;
}
function addSchedule(time){

}
function dealOrder(id){

}
function changeInf(){
	
}
function changeTeacherInf(){
	
}
function changeStudentInf(){
	
}