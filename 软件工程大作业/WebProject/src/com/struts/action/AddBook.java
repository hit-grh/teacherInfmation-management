package com.struts.action;

import java.io.IOException;
import java.sql.ResultSet;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;

import com.opensymphony.xwork2.ActionSupport;

@SuppressWarnings("serial")
public class AddBook extends ActionSupport{
	public String execute() throws IOException, ParseException{
		HttpServletRequest request = ServletActionContext.getRequest();
		String authorid = request.getParameter("id");
		String isbn = (String)request.getSession().getAttribute("isbn");
		System.out.println(isbn);
		String title = request.getParameter("title");
		String publisher = request.getParameter("publisher");
		String dateString = request.getParameter("date");
		String price = request.getParameter("price");
		String ret = SUCCESS;
		if("".equals(authorid) || "".equals(isbn) || "".equals(title) || "".equals(publisher) || "".equals(dateString) || "".equals(price)) {
			request.getSession().setAttribute("message", "please input the information");
			return "Error";
		}
		Pattern pattern = Pattern.compile("[0-9]+.[0-9]*");
        Matcher isNum = pattern.matcher(price);
        if( !isNum.matches() )
        {
        	request.getSession().setAttribute("message", "the price must be float");
			return "Error";
        }
        String eL= "^((\\d{2}(([02468][048])|([13579][26]))[\\-\\/\\s]?((((0?[13578])|(1[02]))[\\-\\/\\s]?((0?[1-9])|([1-2][0-9])|(3[01])))|(((0?[469])|(11))[\\-\\/\\s]?((0?[1-9])|([1-2][0-9])|(30)))|(0?2[\\-\\/\\s]?((0?[1-9])|([1-2][0-9])))))|(\\d{2}(([02468][1235679])|([13579][01345789]))[\\-\\/\\s]?((((0?[13578])|(1[02]))[\\-\\/\\s]?((0?[1-9])|([1-2][0-9])|(3[01])))|(((0?[469])|(11))[\\-\\/\\s]?((0?[1-9])|([1-2][0-9])|(30)))|(0?2[\\-\\/\\s]?((0?[1-9])|(1[0-9])|(2[0-8]))))))";        
        pattern = Pattern.compile(eL);
        if(!pattern.matcher(dateString).matches()) {
        	request.getSession().setAttribute("message", "the date format is wrong! the format as YYYY-MM-DD");
			return "Error";
        }
		System.out.println(dateString);
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");								//change the format fo date in order to insert to mysql
		java.util.Date date = sdf.parse(dateString);
		Date sd = new Date(date.getTime());
		Book book = new Book(isbn, title, publisher, sd, Float.parseFloat(price), authorid);
		SQLoperation db = new SQLoperation();
		Connection cnt = db.connect();
		try {
			ResultSet rs = cnt.createStatement().executeQuery("select * from author where AuthorId='" + authorid + "'");
			if (rs.next()) {                                                               //insert the book into db when the author exists
				PreparedStatement preStmt = db.connect().prepareStatement("insert into book(ISBN, Title, Publisher, PublishDate, Price, AuthorId) values(?, ?, ?, ?, ?, ?)");
				preStmt.setString(1, book.getISBN());
				preStmt.setString(2, book.getTitle());
				preStmt.setString(3, book.getPublisher());
				preStmt.setDate(4, book.getPublishDate());
				preStmt.setFloat(5, book.getPrice());
				preStmt.setString(6, book.getAuthorId());
				preStmt.executeUpdate();
				request.getSession().setAttribute("message", "Add book successed");
			} else {
				ret = "FAIL";																// return the book information and authorid when the author doesn't exist
				request.setAttribute("book", book);
				request.setAttribute("authorid", authorid);
			}
		} catch (Exception e) {
			System.out.println("attach db faild");
			e.printStackTrace();
		}
		db.closeConnect();	
		return ret;
	}
}
