package com.struts.action;

import java.sql.*;
import javax.servlet.http.*;
import org.apache.struts2.ServletActionContext;
import com.opensymphony.xwork2.ActionSupport;


@SuppressWarnings("serial")
public class SearchBook extends ActionSupport{
	private String isbn;

	public void setIsbn(String isbn) {
		this.isbn = isbn;
	}

	public String getIsbn() {
		return isbn;
	}

	public String execute() throws SQLException {
		HttpServletRequest request = ServletActionContext.getRequest();
		String ret = SUCCESS;
		SQLoperation db = new SQLoperation();
		Statement stmt = db.connect().createStatement();
		ResultSet rs = stmt.executeQuery("select * from book where ISBN='" + isbn + "'");         //search book by isbn
		if (rs.next()) {
			Book bookinf = new Book(rs.getString(1), rs.getString(2), rs.getString(3), rs.getDate(4), rs.getFloat(5), rs.getString(6));
			request.setAttribute("NotExist", "0");
			request.setAttribute("book", bookinf);
			System.out.println(bookinf.getAuthorId());
			ResultSet authordb = stmt.executeQuery("select * from author where authorId='" + bookinf.getAuthorId() + "'");
			if (authordb.next()) {																
				Author authorinf = new Author(authordb.getString(1), authordb.getString(2), authordb.getInt(3), authordb.getString(4));
				request.setAttribute("author", authorinf);
			} else {
				request.setAttribute("NotExist", "2");
			}
		} else {										//return "NotExist" when the book doesn't exist
			request.setAttribute("s_isbn", isbn);
			ret = "NotExist";
		}
		db.closeConnect();
		return ret;
	}

}
