function signOut() {
    window.location.href = '/signOut/';
}

function toStudentCenter() {
    window.location.href = '/studentCenter/'
}
function toTeacherCenter() {
    window.location.href = '/studentCenter/'
}

function cancelOrder(id) {
   $.ajax({
        url:"/cancelOrder/",
        data:{
            id:id,
        },
        async:false,
        type:'POST',
        dataType:'json',
        success:function(data){
            switch (data['isSuccess']) {
                case 0:
                    alert("取消失敗");
                    break;
                case 1:
                    alert("取消成功");
                    toAdminCenter();
                    break;
                default:
                    alert("adminCenter error");
            }
        }
   });
}
function signInCheck() {
    var username = $("input[name=account]").val();
    var password = $("input[name=password]").val();
    var checkTeacher = document.getElementsByName("isTeacher");
    var isTeacher;
    if(checkTeacher[1].checked){
    	isTeacher = checkTeacher[1].value;
    }
    else{
    	isTeacher = checkTeacher[0].value;
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
        	var ret_data = eval("("+data+")");
        	c.click();
            switch (ret_data["login"]) {
                case "NoPara":
                    alert("NoPara");
                    break;
                case "NotFound":
                    alert("NotFound");
                    break;
                case "ErrorPassword":
                    alert("Error");
                    break;
                case "Success":
                    alert("Success");
                    //setTimeout(function() {
                      //  window.location.href = '/admin/user/adminCenter/';
                    //}, 3000);
                    break;
            }
        }
    });
    return false;
}

function signUpCheck() {
    var username = $("#inputAccount").val();
    var password = $("#inputPassword").val();
    var confirmPassword = $("#confirmPassword").val();
    var realname = $("#realname").val();
    var nickname = $("#nickname").val();
    var phone = $("#phone").val();
    if (password != confirmPassword) {
        alert("确认密码不一致");
        //$("#confirmPassword").parent("div").addClass("has-error");
    } else {
        $.ajax({
            url: '/admin/user/signUp/',
            data: {
                username: username,
                password: password,
                realname: realname,
                nickname: nickname,
                phone: phone
            },
            async: false,
            type: 'POST',
            dataType: 'json',
            success: function (data) {
                switch (data['msgCode']) {
                    case 1000:
                        alert("需要参数");
                        break;
                    case 1001:
                        $("div#errorDisplay").show();
                        $("div#errorDisplay").text("此账号已经被注册");
                        $("#account").focus().end();
                        break;
                    case 0:
                        $("div#errorDisplay").removeClass("alert-danger");
                        $("div#errorDisplay").addClass("alert-success");
                        $("div#errorDisplay").show();

                        $("div#errorDisplay").text("注册成功！为您跳转登录页面");
                        setTimeout(function() {
                            window.location.href = '/admin/user/signIn/';
                        }, 1000);
                        break;
                    default:
                        alert("默认界面");
                }
            }
        })
    }
    return false;
}


