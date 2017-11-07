function signOut() {
    window.location.href = '/xaingmu/signOut/';
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
                                <a class="image image-full" href="' + ret["teacherHref1"] + '"
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
                    btn.style.background - color = "pink";
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
    var student = document.getElementById("student");
    var noLogin = document.getElementById("noLogin");
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
            var ret_data = eval("(" + data + ")");
            c.click();
            switch (ret_data["ret"]) {
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
                        student.style.display = "block";
                        noLogin.style.display = "none";
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
    var major = $("input[name=majorUp]").val();
    var tel = $("input[name=telUp]").val();
    var realName = $("input[name=realNameUp]").val();
    if (username.replace(/(^s*)|(s*$)/g, "").length == 0 || password.replace(/(^s*)|(s*$)/g, "").length == 0 || confirmPassword.replace(/(^s*)|(s*$)/g, "").length == 0 || college.replace(/(^s*)|(s*$)/g, "").length == 0 || major.replace(/(^s*)|(s*$)/g, "").length == 0 || tel.replace(/(^s*)|(s*$)/g, "").length == 0 || realName.replace(/(^s*)|(s*$)/g, "").length == 0) {
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
                realName: realName,
                college: college,
                major: major,
                tel: tel
            },
            async: false,
            type: "POST",
            dataType: "json",
            success: function(data) {
                var ret_data = eval("(" + data + ")");
                c.click();
                switch (ret_data["ret"]) {
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
    var teacherName = $("input[name=searchTeacherName]").val();
    var navTeacherInf = document.getElementById("navTeacherInf");
    var teacherInf - document.getElementById("teacherInf"); // add the dom teacher to show the teacher information
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
                    teacherInf.style.display = "block";
                    navTeacherInf.style.display = "block";
                    break;
            }
        }
    })
    return false;
}
function change
function addSchedule(time){

}
function dealOrder(id){

}