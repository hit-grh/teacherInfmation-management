package com.struts.action;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;

import com.opensymphony.xwork2.ActionSupport;

@SuppressWarnings("serial")
public class AddAuthor extends ActionSupport{ 
	public String execute() throws IOException{
		HttpServletRequest request = ServletActionContext.getRequest();
		String authorid = (String) request.getSession().getAttribute("new_authorid");
		String name = request.getParameter("name").toString();
		String country = request.getParameter("country").toString();
		Book book = (Book)request.getSession().getAttribute("new_book");
		String age = request.getParameter("age");
		if("".equals(name) || "".equals(age) || "".equals(country)) {
			request.getSession().setAttribute("message", "please input the information");
			return "Error"; 
		}
		Pattern pattern = Pattern.compile("[0-9]+");
        Matcher isNum = pattern.matcher(age);
        if( !isNum.matches() )
        {
        	request.getSession().setAttribute("message", "the age must be int");
			return "Error";
        }
		Author author = new Author(authorid, name, Integer.parseInt(age), country);
		
		SQLoperation db = new SQLoperation();
		Connection cnt = db.connect();
		System.out.println(book.getISBN()); 
		try {															//insert the author and book information into mysql
			cnt.createStatement().execute("insert into author(AuthorId, Name, Age, Country) values('"+author.getAuthorId()+"', '"+author.getName()+"', "+author.getAge()+", '"+author.getCountry()+"')");
			PreparedStatement preStmt = db.connect().prepareStatement("insert into book(ISBN, Title, Publisher, PublishDate, Price, AuthorId) values(?, ?, ?, ?, ?, ?)");
			preStmt.setString(1, book.getISBN());
			preStmt.setString(2, book.getTitle());
			preStmt.setString(3, book.getPublisher());
			preStmt.setDate(4, book.getPublishDate());
			preStmt.setFloat(5, book.getPrice());
			preStmt.setString(6, book.getAuthorId());
			preStmt.executeUpdate();
			request.getSession().setAttribute("message", "Add book successed");
		} catch (Exception e) {
			System.out.println("attach db faild");
			e.printStackTrace();
		}
		db.closeConnect();
		return SUCCESS;
	}
}
