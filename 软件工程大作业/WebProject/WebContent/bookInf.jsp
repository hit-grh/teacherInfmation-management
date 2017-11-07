<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@page import="com.struts.action.*" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Detailed Information</title>
<style>
#title {
	list-style-type: none;
	display: block;
	margin: 0;
	padding: 0;
	border: 0px;
	float: center;
	font-size: 40px;
	font-family:STCaiyun;
	color: #002D96;
}

#inf table{
	background-size: 100% 100%;
	}
#inf form {
	margin: 0px;
	padding: 0px;
}

#inf input {
	margin: 0px;
}

#inf .button {
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
</style>
</head>
<body>
	<div id="inf">
		<form method="post" action="change">
		<s:if test="#request.NotExist == '2'.toString()">
			<div id="title"><h3 align="center">The Author Doesn't Exist!</h3></div>
		</s:if>
		<s:else>
			<div id="title">
				<h3 align="center">Information of author</h3>
			</div>
			<table border="2" align='center' background="//chuantu.biz/t6/77/1507010114x3688494623.png">
				<tr>
					<th align="center">AuthorID</th>
					<th align="center">Name</th>
					<th align="center">Age</th>
					<th align="center">Country</th>
				</tr>
				<tr>
					<td align="center">
						<input type="text" readonly
						value=<%="'"+((Author)request.getAttribute("author")).getAuthorId()+"'"%>/>
					</td>
					<td align="center">
						<input type="text" readonly
						value=<%="'"+((Author)request.getAttribute("author")).getName()+"'"%>/>
					</td>
					<td align="center">
						<input type="text" readonly
						value=<%="'"+((Author)request.getAttribute("author")).getAge()+"'"%>/>
					</td>
					<td align="center">
						<input type="text" readonly
						value=<%="'"+((Author)request.getAttribute("author")).getCountry()+"'"%>/>
					</td>
				</tr>
			</table>
		</s:else>
			<br /> <br /> <br />
			<div id="title">
				<h3 align="center">Information of book</h3>
			</div>
			<table align="center" background="//chuantu.biz/t6/77/1507010114x3688494623.png">
				<tr>
					<th align="center">ISBN</th>
					<th align="center">Title</th>
					<th align="center">Publisher</th>
					<th align="center">PublishDate</th>
					<th align="center">Price</th>
					<th align="center">AuthorId</th>
				</tr>
				<tr>
					<td align="center"><input type="text" readonly
						value=<%="'"+((Book)request.getAttribute("book")).getISBN()+"'"%>
						name="old_isbn"></td>
					<td align="center"><input type="text" readonly
						value=<%="'"+((Book)request.getAttribute("book")).getTitle()+"'"%>
					    ></td>

					<td align="center"><input type="text"
						value=<%="'"+((Book)request.getAttribute("book")).getPublisher()+"'"%>
						name="new_publisher"></td>
					<td align="center"><input type="text"
						value=<%="'"+((Book)request.getAttribute("book")).getPublishDate()+"'"%>
						name="new_date"></td>
					<td align="center"><input type="text"
						value=<%="'"+((Book)request.getAttribute("book")).getPrice()+"'"%>
						name="new_price"></td>
					<td align="center"><input type="text"
						value=<%="'"+((Book)request.getAttribute("book")).getAuthorId()+"'"%>
						name="new_id"></td>
				</tr>
				<tr>
					<th align="center">==============</th>
					<th align="center">==============</th>
					<th align="center">==============</th>
					<th align="center">==============</th>
					<th align="center">==============</th>
					<th align="center">==============</th>
				</tr>
				<tr>
					<td></td>
					<td></td>
					<td align="center"><label for="change">Change</label> <input
						type="radio" id="change" name="choice" value="change"/> <label for="delete">Delete</label>
						<input type="radio" id="delete" name="choice" value="delete"/></td>
					<td align="center"><input class="button" type="submit"
						value="POST" onMouseOver="this.style.opacity='1'"
						onMouseOut="this.style.opacity='0.7'" /></td>
				</tr>
			</table>
		</form>
		<br>
		<br>
		<br>
		<br>
		<br> <br> <br> <br> <br>
		<div align="center">
			<a href="/Library.jsp"><input class="button" type="BUTTON"
				value="RETURN" onMouseOver="this.style.opacity='1'"
				onMouseOut="this.style.opacity='0.7'" /> </a>
		</div>
	</div>
</body>
</html>