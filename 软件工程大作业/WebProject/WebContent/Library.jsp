<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@page import="java.util.HashMap"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>图书管理界面</title>
<style>
#search ul {
	list-style-type: none;
	display: block;
	width: 100px;
	height: 33px;
	margin: 0;
	padding: 0;
	border: 0px;
	float: left;
}

#search li {
	border: 0px;
	margin: 0px;
	padding: 0px;
}

#search .selected {
	display: block;
}

#search form {
	margin: 0px;
	padding: 0px;
}

#search input {
	height: 30px;
	width: 400px;
	margin: 0px;
}

#search .button {
	font-size: 17px;
	font-weight: 600;
	color: #002D96;
	height: 30px;
	width: 110px;
	margin-left: 50px;
	background: #e6efc2;
	opacity: 0.8;
	border: #7fb80e 1px solid;
	cursor: pointer;
	-webkit-border-radius: 2px;
	border-radius: 2px;
}

#search_result {
	font-family: STCaiyun;
	color: #002D96;
	font-size: 30px;
}

#list_inf {
	font-family: YouYuan;
	color: #CDB5CD;
	font-size: 25px;
}
#book_inf {
	font-family:KaiTi;
	color: #CDB5CD;
	font-size: 25px;
}
</style>
</head>
<body>
	<div id="search" align="center">
		<div align="center">
			<img src="//chuantu.biz/t6/71/1506674425x3748139419.png" />
		</div>
		<table>
			<tr>
				<td>
					<ul>
						<li style="display: block"><img
							src="//chuantu.biz/t6/88/1507618029x2890202378.png"
							style="width: 100%; height: 100%" /></li>
						<li style="display: none"><img
							src="//chuantu.biz/t6/88/1507618029x2890202378.png"
							style="width: 100%; height: 100%" /></li>
						<li style="display: none"><img
							src="//chuantu.biz/t6/77/1507011456x2890202378.jpg"
							style="width: 100%; height: 100%" /></li>
					</ul>
				</td>
				<td style="padding-left: 10px">
					<form style="display: block" action="searchBook" method="post">
						<input type="hidden" /> <input type="text" name="isbn"
							placeholder="请输入图书ISBN" /> <input class="button" type="submit"
							value="图书搜索" onMouseOver="this.style.opacity='1'"
							onMouseOut="this.style.opacity='0.7'" />
					</form>
					<form style="display: none" action="searchAuthor" method="post">
						<input type="text" name="author" placeholder="请输入作者" /> <input
							class="button" type="submit" value="作者搜索"
							onMouseOver="this.style.opacity='1'"
							onMouseOut="this.style.opacity='0.7'" />
					</form>
				</td>
			</tr>
		</table>
	</div>
	<br>
	<br>
	<br>
	<br>
	<!-- js codes,choose the functions:search book or search author -->
	<script>
		var search = document.getElementById("search");
		var forms = document.getElementsByTagName("form");
		var ul = search.getElementsByTagName("ul")[0];
		var li = ul.getElementsByTagName("li");
		var length = li.length;
		li[0].onclick = function() {
			for (var i = 1; i < length; i++) {
				li[i].style.display = "block";
			}
		}
		var ind = 0;
		for (var i = 1; i < length; i++) {
			li[i].onclick = function(click) {
				return function() {
					li[0].innerHTML = this.innerHTML;
					for (var j = 1; j < length; j++) {
						li[j].style.display = "none";
					}
					forms[ind].style.display = "none";
					forms[click].style.display = "block";
					ind = click;
				}
			}(i - 1);
			li[i].onMouseOver = function() {
				this.style.background = "#f2eada";
			}
			li[i].onMouseOut = function() {
				this.style.backgound = "inherit";
			}
		}
	</script>
	<% 
		Object message = session.getAttribute("message");
	    if(message!=null && !"".equals(message)){
	    	session.setAttribute("message", "");
	 %>
	      <script type="text/javascript">
	          alert("<%=message%>");
	      </script>
   	   <%} %>
	<br>
	<br>
	<br>
	<br>
	<s:if test="#request.NotExist == '1'.toString()">
		<div align="center" id="search_result">您查询的作者不存在</div>
	</s:if>
	<s:elseif
		test="#request.NotExist == '2'.toString()|#request.NotExist == '0'.toString()">
		<div align="center" id="search_result">您查询的作者是      :<s:property value="author" /></div>
		<s:if test="#request.NotExist == '2'.toString()">
			<div align="center" id="search_result">该作者暂无作品</div>
		</s:if>
		<s:else>
			<br><br><div align="center" id="list_inf">作者作品如下：</div>
			<br><br><br><div id="book_inf" align="center">
			    <!-- list all of the books -->
			    <s:iterator value="#request.books" id="ele">
				    <li>
				    <a href="<s:url action="searchBook">  
				     <s:param name="isbn" value="#ele.value"/></s:url>">
						<s:property value="#ele.key" />
			     	</a>
			     	</li>
			    </s:iterator>
			</div>
		</s:else>
	</s:elseif>
</body>
</html>