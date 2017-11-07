<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="com.struts.action.*"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<style>
#button {
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

#message {
	font-family: STCaiyun;
	color: #002D96;
	font-size: 30px;
}
</style>
</head>
<body>
    <% 
		Object message = session.getAttribute("message");
	    if(message!=null && !"".equals(message)){
	    	session.setAttribute("message", "");
	 %>
	      <script type="text/javascript">
	          alert("<%=message%>");
	      </script>
   	   <%} %>
    <% 
        Book book = (Book)request.getAttribute("book"); 
        String authorid = (String)request.getAttribute("authorid");
        session.setAttribute("new_book", book);
        session.setAttribute("new_authorid", authorid);
    %>
	
	<form action="addAuthor"  method="post" id="form">
		<div align="center">
			<div id="message">
				<h3 align="center">Auhtor deosn't exist!Add the author's
					information</h3>
			</div>
			<table align='center'
				background="//chuantu.biz/t6/77/1507010114x3688494623.png">
				<tr>
					<th align="center">Name</th>
					<th align="center">Age</th>
					<th align="center">Country</th>
				</tr>
				<tr>
					<td align="center"><input type="text" name="name" id="name"></td>
					<td align="center"><input type="text" name="age" id="age"></td>
					<td align="center"><input type="text" name="country" id="country"></td>
					<td align="center"><input id="button" class="button"
						type="submit" value="AddAuthor" onMouseOver="this.style.opacity='1'"
						onMouseOut="this.style.opacity='0.7'"/></td>
					<td align="center"><a href="/Library.jsp"><input
							id="button" class="button" type="BUTTON" value="RETURN"
							onMouseOver="this.style.opacity='1'"
							onMouseOut="this.style.opacity='0.7'" /> </a></td>
				</tr>
			</table>
		</div>
	</form>
</body>
</html>