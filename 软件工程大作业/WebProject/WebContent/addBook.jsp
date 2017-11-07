<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>添加图书</title>
<style>
#inf .button, #addbook .button {
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
	<div id="inf" style="display: block">
		<h2 align="center" id="message">The Book you search doen't exist!</h2>
		<br> <br> <br>
		<div align="center">
			<span><input id="button" class="button" type="submit"
				value="AddBook" onMouseOver="this.style.opacity='1'"
				onMouseOut="this.style.opacity='0.7'" /></span> <span><a
				href="/Library.jsp"><input class="button"
					type="BUTTON" value="RETURN" onMouseOver="this.style.opacity='1'"
					onMouseOut="this.style.opacity='0.7'" /> </a></span>
		</div>
	</div>
	<%
		String isbn = (String) request.getAttribute("s_isbn");
	    session.setAttribute("isbn", isbn);
	%>
	<div id="searchauthor" style="display: none"></div>
	<div id="addbook" style="display: none">
		<div id="message">
			<h3 align="center">Add the information of book</h3>
		</div>
		<form action="addBook" method="post">
			<table align="center"
				background="//chuantu.biz/t6/77/1507010114x3688494623.png">
				<tr>
					<th align="center">ISBN</th>
					<th align="center">Title</th>
					<th align="center">Publisher</th>
					<th align="center">PublishDate</th>
					<th align="center">Price</th>
					<th align="center">AuthorId</th>
				</tr>
				<tr>
					<td align="center"><%out.println(isbn); %></td>
					<td align="center"><input type="text" name="title"></td>
					<td align="center"><input type="text" name="publisher"></td>
					<td align="center"><input type="text" name="date"></td>
					<td align="center"><input type="text" name="price"></td>
					<td align="center"><input type="text" name="id" id="author"></td>
					<td align="center"><input class="button" type="submit"
						value="AddBook" onMouseOver="this.style.opacity='1'"
						onMouseOut="this.style.opacity='0.7'" /></td>
				</tr>
			</table>
		</form>
	</div>
	<script>
		var choice = document.getElementById("inf");
		var table = document.getElementById("addbook");
		var button = document.getElementById("button");
		button.onclick = function() {
			choice.style.display = "none";
			table.style.display = "block";
		}
	</script>
	
</body>
</html>