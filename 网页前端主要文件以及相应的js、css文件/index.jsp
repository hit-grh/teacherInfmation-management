<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@page import="java.util.HashMap"%>
<!DOCTYPE HTML>
<html>
    <head>
        <title>
            教师信息管理系统
        </title>
        <meta content="text/html; charset=utf-8" http-equiv="content-type"/>
        <meta content="教师信息管理系统" name="description"/>
        <meta content="教师, 信息, 管理" name="keywords"/>
        <link href="css/normalize.css" rel="stylesheet" type="text/css"/>
        <link href="css/login_demo.css" rel="stylesheet" type="text/css"/>
        <link href="css/component.css" rel="stylesheet" type="text/css"/>
        <link href="css/content.css" rel="stylesheet" type="text/css"/>
        <link href="http://fonts.googleapis.com/css?family=Open+Sans:300,600,700" rel="stylesheet"/>
        <link href="../favicon.ico" rel="shortcut icon"/>
        <link href="css/demo.css" rel="stylesheet" type="text/css"/>
        <link href="css/elastislide.css" rel="stylesheet" type="text/css"/>
        <link href="css/custom.css" rel="stylesheet" type="text/css"/>
        <link href="css/ns-default.css" rel="stylesheet" type="text/css"/>
        <link href="css/ns-style-attached.css" rel="stylesheet" type="text/css"/>
        <link href="css/simpleAlert.css" rel="stylesheet">
            <script src="js/simpleAlert.js">
            </script>
            <script src="js/modernizr.custom.js">
            </script>
            <script src="js/jquery.min.js">
            </script>
            <script src="js/config.js">
            </script>
            <script src="js/skel.min.js">
            </script>
            <script src="js/modernizr.custom.17475.js">
            </script>
            <script src="js/function.js">
            </script>
        </link>
    </head>
    <body>
        <script>
            $(document).ready(function(){
            var isLogin="<%=session.getAttribute("isLogin")%>";
            var student = document.getElementById("student");
            var noLogin = document.getElementById("noLogin");
            if(isLogin){
                student.style.display = "block";
                noLogin.style.display = "none";
            }
        })
        </script>
        <!-- Nav -->
        <nav id="nav">
            <ul>
                <li>
                    <a href="#">
                        用戶首頁
                    </a>
                </li>
                <li id="navTeacherInf" style="display:none">
                    <a href="#articleTeacherInf">
                        查询教师信息
                    </a>
                </li>
                <li>
                    <a href="#display">
                        校園风采展示
                    </a>
                </li>
                <li>
                    <a href="#portfolio">
                        今日教师推荐
                    </a>
                </li>
                <li>
                    <a href="#contact">
                        联系我们
                    </a>
                </li>
            </ul>
        </nav>
        <% Object teacher = session.getAttribute("teacher");
           Object student = session.getAttribute("student");
           Object scheduleList = session.getAttribute("schedule");
           Object orderList = session.getAttribute("orderList");
        %>
        <div class="wrapper wrapper-style1 wrapper-first" id="teacher" style="display:none">
            <article class="container" id="top">
                <div class="row">
                    <!--个人图片-->
                    <div class="4u">
                        <span class="me image image-full">
                            <img onmousedown="changeImg()" src="images/me.jpg"/>
                        </span>
                    </div>
                    <!--个人信息-->
                    <div class="8u">
                        <form method="POST">
                            <div class="row first-child">
                                <div class="6u">
                                    <label for="teacherName">
                                        姓名
                                    </label>
                                    <input id="teacherName" name="name" placeholder="姓名" value=<%=teacher.name%> style="background-color:#EEE" type="text"/>
                                </div>
                                <div class="6u">
                                    <label for="teacherCollege">
                                        學院
                                    </label>
                                    <input id="teacherCollege" name="teacherCollege" placeholder="学院" value=<%=teacher.college%> style="background-color:#EEE" type="text"/>
                                </div>
                            </div>
                            <div class="row half">
                                <div class="6u">
                                    <label for="teacherPosition">
                                        职称
                                    </label>
                                    <input id="teacherPosition" name="teacherPositon" placeholder="职称" value=<%=teacher.position%> style="background-color:#EEE" type="text"/>
                                </div>
                                <div class="6u">
                                    <label for="teacherTel">
                                        联系方式
                                    </label>
                                    <input id="teacherTel" name="teacherTel" value=<%=teacher.tel%>placeholder="联系方式" style="background-color:#EEE" type="text"/>
                                </div>
                            </div>
                            <div class="row half">
                                <div class="6u">
                                    <button style="text-align: center；background-color:#02FCEC；border-radius: 8px;" type="submit" value=<%teacher.username%> onclick="changeTeacherInf()"/>更改信息</button>
                                </div>
                            </div>
                        </form>
                        <div class="8u" style="padding-top:2em">
                            <p>
                                Hi!
                                <strong>
                                    <%=teacher.name%>
                                </strong>
                                。 您的日程如下
                            </p>
                        </div>
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>
                                时间
                            </th>
                            <th>
                                星期一
                            </th>
                            <th>
                                星期二
                            </th>
                            <th>
                                星期三
                            </th>
                            <th>
                                星期四
                            </th>
                            <th>
                                星期五
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <%
                           for(schedule in scheduleList){%>
                        <tr>
                            <% for(ele in schedule){
                                       if(ele.value == "none"){%>
                            <td>
                            <div class="morph-button morph-button-modal morph-button-modal-3 morph-button-fixed">
                                <button type="button">
                                    增加日程
                                </button>
                                <div class="morph-content" style="overflow-y:scroll;">
                                    <div>
                                        <div class="content-style-form content-style-form-2">
                                            <span class="icon icon-close">
                                                Close the dialog
                                            </span>
                                            <form method="POST">
                                                <p>
                                                    <label>
                                                        内容
                                                    </label>
                                                    <input name=<%=ele.id%> type="text">
                                                        />
                                                        <p>
                                                            <button  onclick="addSchedule($(this).val())" type="submit" value=<%=ele.id%>
                                                                增加
                                                            </button>
                                                        </p>
                                                    </input>
                                                </p>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </td>
                            <%}else{%>
                            <td>
                                <% =ele.value %>
                            </td>
                            <%}
                        }%>
                        </tr>
                        <%}%>
                    </tbody>
                </table>
            </article>
        </div>
        <div class="wrapper wrapper-style1 wrapper-first" id="student" style="display:none">
            <article class="container" id="top">
                <div class="row">
                    <!--个人图片-->
                    <div class="4u">
                        <span class="me image image-full">
                            <img onmousedown="signInCheck()" src="images/me.jpg"/>
                        </span>
                    </div>
                    <!--个人信息-->
                    <div class="8u">
                        <form method="POST">
                            <div class="row first-child">
                                <div class="6u">
                                    <label for="studentName">
                                        姓名
                                    </label>
                                    <input id="studentName" name="studentName" value=<%=student.name%> placeholder="姓名" style="background-color:#EEE" type="text"/>
                                </div>
                                <div class="6u">
                                    <label for="studentCollege">
                                        學院
                                    </label>
                                    <input id="studentCollege" name="studentCollege" value=<%=student.college%>  placeholder="学院" style="background-color:#EEE" type="text"/>
                                </div>
                            </div>
                            <div class="row half">
                                <div class="6u">
                                    <label for="studentMajor">
                                        專業
                                    </label>
                                    <input id="studentMajor" name="studentMajor" value=<%=student.major%> placeholder="专业" style="background-color:#EEE" type="text"/>
                                </div>
                                <div class="6u">
                                    <label for="studentTel">
                                        联系方式
                                    </label>
                                    <input id="studentTel" name="studentTel" value=<%=student.tel%> placeholder="联系方式" style="background-color:#EEE" type="text"/>
                                </div>
                            </div>
                            <div class="row half">
                                <div class="6u">
                                    <button style="text-align: center；background-color:#02FCEC；border-radius: 8px;" type="submit" value=<%student.username%> onclick="changeStudentInf($(this).val())"/>更改信息</button>
                                </div>
                            </div>
                        </form>
                        <div class="8u" style="padding-top:2em">
                            <p>
                                Hi!
                                <strong>

                                </strong>
                                。 您的预约如下
                            </p>
                        </div>
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>
                                预约编号
                            </th>
                            <th>
                                预约时间
                            </th>
                            <th>
                                教师
                            </th>
                            <th>
                                地点
                            </th>
                            <th>
                                审核状态
                            </th>
                            <th>
                                取消
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <%for(order in orderList){%>
                        <tr>
                            <td>
                                <%=order.number%>
                            </td>
                            <td>
                                <%=order.time%>
                            </td>
                            <td>
                                <%=order.teacher%>
                            </td>
                            <td>
                                <%=order.place%>
                            </td>
                            <td>
                                <%=order.status%>
                            </td>
                            <td>
                                <button onclick="cancelOrder($this.val())" style="height:100%;width:100%;border:0;background-color:white;" value=<%=order.id%>
                                    取消
                                </button>
                            </td>
                        </tr>
                        <%}%>
                    </tbody>
                </table>
            </article>
        </div>
        <!-- Home -->
        <div id="noLogin" style="display:block">
            <div class="wrapper wrapper-style1 wrapper-first">
                <article class="container" id="top">
                    <div class="row">
                        <div class="4u">
                            <span class="me image image-full">
                                <img alt="" src="images/girl.jpg"/>
                            </span>
                        </div>
                        <div class="8u" style="padding-top:4em">
                            <header>
                                <h1>
                                    Hi~欢迎
                                    <strong>
                                        请先登录
                                    </strong>
                                    .
                                </h1>
                            </header>
                            <p>
                                这里是
                                <strong>
                                    教师信息管理系统
                                </strong>
                                可在本系统进行浏览教师信息，登录后进行个人信息管理
                            </p>
                        </div>
                    </div>
                </article>
            </div>
            <div class="mockup-content" style="background-color:white; padding-bottom: 4em;">
                <div class="morph-button morph-button-modal morph-button-modal-2 morph-button-fixed">
                    <button class="button button-big" type="button">
                        Login.
                    </button>
                    <div class="morph-content" style="overflow-y:scroll">
                        <div>
                            <div class="content-style-form content-style-form-1">
                                <span class="icon icon-close" id="closeSignIn">
                                    Close the dialog
                                </span>
                                <h2 style="color: skyblue">
                                    <input name="isTeacherIn" type="radio" value="1">
                                        教师
                                        <input name="isTeacherIn" type="radio" value="0">
                                            学生
                                </h2>
                                <form method="POST">
                                    <p>
                                    <label>
                                        用户名
                                    </label>
                                    <input autofocus="autofocus" name="accountIn" required type="text">
                                    </p>
                                        <p>
                                            <label>
                                                密码
                                            </label>
                                            <input name="passwordIn" required="" type="password">
                                            </input>
                                        </p>
                                        <p>
                                            <button onclick="signInCheck()" type="submit">
                                                Login
                                            </button>
                                        </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- morph-button -->
                <strong class="joiner">
                    or
                </strong>
                <div class="morph-button morph-button-modal morph-button-modal-3 morph-button-fixed">
                    <button class="button button-big" type="button">
                        Signup
                    </button>
                    <div class="morph-content" style="overflow-y:scroll;">
                        <div>
                            <div class="content-style-form content-style-form-2">
                                <span class="icon icon-close" id="closeSignUp">
                                    Close the dialog
                                </span>
                                <h2 style="color: skyblue">
                                    <input name="isTeacherUp" type="radio" value="1">
                                        教师
                                    <input name="isTeacherUp" type="radio" value="0">
                                            学生
                                </h2>
                                <form method="POST">
                                    <p>
                                        <label>
                                            用户名
                                        </label>
                                        <input autofocus="autofocus" name="accountUp" required="" type="text"/>
                                    </p>
                                    <p>
                                        <label>
                                            密码
                                        </label>
                                        <input name="passwordUp" required="" type="password"/>
                                    </p>
                                    <p>
                                        <label>
                                            确认密码
                                        </label>
                                        <input name="passwordConfirm" required="" type="password"/>
                                    </p>
                                    <p>
                                        <label>
                                            真实姓名
                                        </label>
                                        <input name="realNameUp" required="" type="text"/>
                                    </p>
                                    <p>
                                        <label>
                                            学院
                                        </label>
                                        <input name="collegeUp" required="" type="text"/>
                                    </p>
                                    <p>
                                        <label>
                                            专业
                                        </label>
                                        <input name="majorUp" required="" type="text"/>
                                    </p>
                                    <p>
                                        <label>
                                            联系方式
                                        </label>
                                        <input name="telUp" required="" type="text"/>
                                    </p>
                                    <p>
                                        <button "="" onclick="signUpCheck()" type="submit">
                                            Sign Up
                                        </button>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- morph-button -->
            </div>
        </div>
        <div class="container demo-1">
            <article id="display">
                <div class="main">
                    <header class="clearfix">
                        <h1>
                            风采展示
                            <span style="padding-top:1em">
                                規格嚴格      功夫到家
                            </span>
                        </h1>
                    </header>
                    <!-- Elastislide Carousel -->
                    <ul class="elastislide-list" id="carousel">
                        <li>
                            <a href="http://news.hit.edu.cn/d1/2a/c1510a184618/page.htm">
                                <img alt="image01" src="images/display/1.jpg"/>
                            </a>
                        </li>
                        <li>
                            <a href="http://news.hit.edu.cn/ce/7d/c1510a183933/page.htm">
                                <img alt="image02" src="images/display/2.jpg"/>
                            </a>
                        </li>
                        <li>
                            <a href="http://news.hit.edu.cn/ce/ff/c1510a184063/page.htm">
                                <img alt="image03" src="images/display/3.jpg"/>
                            </a>
                        </li>
                        <li>
                            <a href="http://news.hit.edu.cn/d6/d5/c1510a186069/page.htm">
                                <img alt="image04" src="images/display/4.jpg"/>
                            </a>
                        </li>
                    </ul>
                    <script src="js/jquerypp.custom.js" type="text/javascript">
                    </script>
                    <script src="js/jquery.elastislide.js" type="text/javascript">
                    </script>
                    <script type="text/javascript">
                        $( '#carousel' ).elastislide();
                    </script>
                    <div class="row" style="padding-top:6em">
                        <div class="12u">
                            <form method="POST">
                                <div>
                                    <div class="row half">
                                        <div class="12u">
                                            <input name="searchTearcherName" placeholder="请输入搜索教师的名字" style="background-color:white" type="text"/>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="12u" style="text-align:center">
                                            <a class="button form-button-submit" onclick="search()">
                                                搜索
                                            </a>
                                            <a class="button button-alt form-button-reset">
                                                清空
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </article>
        </div>
        <!-- Portfolio -->
        <div class="wrapper wrapper-style3">
            <article id="portfolio">
                <header>
                    <h2 style="font-size: 4em ">
                        今日推荐教师
                    </h2>
                    <span>
                        师者， 所以传道授业解惑也
                    </span>
                </header>
                <div class="container">
                    <div class="row">
                        <div class="12u">
                        </div>
                    </div>
                    <div class="row">
                        <div class="4u" name="t1">
                            <article class="box box-style2">
                                <a class="image image-full" name="image">
                                    <img alt="" src="images/me.jpg"/>
                                </a>
                                <h3>
                                    <a>
                                        张永顺
                                    </a>
                                </h3>
                                <p>
                                    计算机学院 学委
                                </p>
                            </article>
                        </div>
                        <div class="4u" name="t2">
                            <article class="box box-style2">
                                <a class="image image-full">
                                    <img alt="" src="images/me.jpg"/>
                                </a>
                                <h3>
                                    <a>
                                        张永顺
                                    </a>
                                </h3>
                                <p>
                                    计算机学院 学委
                                </p>
                            </article>
                        </div>
                        <div class="4u" name="t3">
                            <article class="box box-style2">
                                <a class="image image-full">
                                    <img alt="" src="images/me.jpg"/>
                                </a>
                                <h3>
                                    <a>
                                        张永顺
                                    </a>
                                </h3>
                                <p>
                                    计算机学院 学委
                                </p>
                            </article>
                        </div>
                    </div>
                </div>
                <footer>
                    <button class="button button-big" onclick="chooseTeacher()">
                        换一批
                    </button>
                </footer>
            </article>
        </div>
        <!-- Contact -->
        <div class="wrapper wrapper-style4">
            <article id="contact">
                <header>
                    <h2>
                        請留下您的寶貴意見~
                    </h2>
                </header>
                <div>
                    <div class="row">
                        <div class="12u">
                            <form action="#" method="post">
                                <div>
                                    <div class="row half">
                                        <div class="6u">
                                            <input id="name" name="name" placeholder="Name" type="text"/>
                                        </div>
                                        <div class="6u">
                                            <input id="email" name="email" placeholder="Email" type="text"/>
                                        </div>
                                    </div>
                                    <div class="row half">
                                        <div class="12u">
                                            <input id="subject" name="subject" placeholder="Subject" type="text"/>
                                        </div>
                                    </div>
                                    <div class="row half">
                                        <div class="12u">
                                            <textarea id="message" name="message" placeholder="Message">
                                            </textarea>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="12u">
                                            <a class="button form-button-submit" href="#">
                                                提交
                                            </a>
                                            <a class="button button-alt form-button-reset" href="#">
                                                清空
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <footer>
                    <p id="copyright">
                        © Copyright © 2013.Company name All rights reserved.
                    </p>
                </footer>
            </article>
        </div>
        <script src="js/classie.js">
        </script>
        <script src="js/uiMorphingButton_fixed.js">
        </script>
        <script>
            (function() {
                var docElem = window.document.documentElement, didScroll, scrollPosition;

                // trick to prevent scrolling when opening/closing button
                function noScrollFn() {
                    window.scrollTo( scrollPosition ? scrollPosition.x : 0, scrollPosition ? scrollPosition.y : 0 );
                }

                function noScroll() {
                    window.removeEventListener( 'scroll', scrollHandler );
                    window.addEventListener( 'scroll', noScrollFn );
                }

                function scrollFn() {
                    window.addEventListener( 'scroll', scrollHandler );
                }

                function canScroll() {
                    window.removeEventListener( 'scroll', noScrollFn );
                    scrollFn();
                }

                function scrollHandler() {
                    if( !didScroll ) {
                        didScroll = true;
                        setTimeout( function() { scrollPage(); }, 60 );
                    }
                };

                function scrollPage() {
                    scrollPosition = { x : window.pageXOffset || docElem.scrollLeft, y : window.pageYOffset || docElem.scrollTop };
                    didScroll = false;
                };

                scrollFn();

                [].slice.call( document.querySelectorAll( '.morph-button' ) ).forEach( function( bttn ) {
                    new UIMorphingButton( bttn, {
                        closeEl : '.icon-close',
                        onBeforeOpen : function() {
                            // don't allow to scroll
                            noScroll();
                        },
                        onAfterOpen : function() {
                            // can scroll again
                            canScroll();
                        },
                        onBeforeClose : function() {
                            // don't allow to scroll
                            noScroll();
                        },
                        onAfterClose : function() {
                            // can scroll again
                            canScroll();
                        }
                    } );
                } );

                // for demo purposes only
                [].slice.call( document.querySelectorAll( 'form button' ) ).forEach( function( bttn ) {
                    bttn.addEventListener( 'click', function( ev ) { ev.preventDefault(); } );
                } );
            })();
        </script>
        <div style="display:none">
            <script charset="gb2312" language="JavaScript" src="http://v7.cnzz.com/stat.php?id=155540&web_id=155540">
            </script>
        </div>
    </body>
</html>
