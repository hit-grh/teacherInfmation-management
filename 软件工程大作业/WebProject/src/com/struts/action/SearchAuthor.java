package com.struts.action;

import java.sql.*;
import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;

import  com.opensymphony.xwork2.ActionSupport;

@SuppressWarnings("serial")
public class SearchAuthor extends ActionSupport{
	private String author;
	
	public void setAuthor(String author) {
		this.author = author;
	}
	
	public String getAuthor() {
		return author;
	}
	
	public String execute() throws SQLException {
		HttpServletRequest request = ServletActionContext.getRequest();
		String ret = SUCCESS;
		SQLoperation db = new SQLoperation();                         
		Statement stmt = db.connect().createStatement();                                   //connect mysql db
		System.out.println(author);
		ResultSet rs = stmt.executeQuery("select * from author where name='"+author+"'"); 
		if (rs.next()) { 
			String author_id = rs.getString(1);
			System.out.println(author_id);
			rs.close();	
			rs = stmt.executeQuery("select * from book where authorId='"+author_id+"'");
			if(rs.next()) {
				HashMap<String,String> books = new HashMap<String,String>();
				do{
					books.put(rs.getString(2),rs.getString(1));
				}while(rs.next());
				request.setAttribute("NotExist", "0");								    //pass the books to jsp
				request.setAttribute("books", books);
			}
			else {
				request.setAttribute("NotExist", "2");									//add information when the author doesn't have books
			}
		} 
		else {																			//add information when the author doesn't exist
			request.setAttribute("NotExist", "1");
		}
		db.closeConnect();
		return ret;
	}
}
