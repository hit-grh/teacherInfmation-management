package com.struts.action;
import java.sql.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;

import  com.opensymphony.xwork2.ActionSupport;

@SuppressWarnings("serial")
public class Change extends ActionSupport{
	public String execute() throws SQLException{
		HttpServletRequest request = ServletActionContext.getRequest();
		String id = request.getParameter("new_id");
		String publisher = request.getParameter("new_publisher");
		String date = request.getParameter("new_date");
		String price = request.getParameter("new_price");
		if("".equals(id) ||"".equals(date) || "".equals(publisher) || "".equals(price)) {
			request.getSession().setAttribute("message", "change failed! please input the information");
			return SUCCESS;
		}
		Pattern pattern = Pattern.compile("[0-9]+.[0-9]*");
        Matcher isNum = pattern.matcher(price);
        if( !isNum.matches() )
        {
        	request.getSession().setAttribute("message", "change failed! the price must be float");
			return SUCCESS;
        }
        String eL= "^((\\d{2}(([02468][048])|([13579][26]))[\\-\\/\\s]?((((0?[13578])|(1[02]))[\\-\\/\\s]?((0?[1-9])|([1-2][0-9])|(3[01])))|(((0?[469])|(11))[\\-\\/\\s]?((0?[1-9])|([1-2][0-9])|(30)))|(0?2[\\-\\/\\s]?((0?[1-9])|([1-2][0-9])))))|(\\d{2}(([02468][1235679])|([13579][01345789]))[\\-\\/\\s]?((((0?[13578])|(1[02]))[\\-\\/\\s]?((0?[1-9])|([1-2][0-9])|(3[01])))|(((0?[469])|(11))[\\-\\/\\s]?((0?[1-9])|([1-2][0-9])|(30)))|(0?2[\\-\\/\\s]?((0?[1-9])|(1[0-9])|(2[0-8]))))))";        
        pattern = Pattern.compile(eL);
        if(!pattern.matcher(date).matches()) {
        	request.getSession().setAttribute("message", "change failed! the date format is wrong! the format as YYYY-MM-DD");
			return SUCCESS;
        }
		SQLoperation db = new SQLoperation();
		Statement stmt = db.connect().createStatement();
		String choice = request.getParameter("choice");
		System.out.println("change");
		if(choice == null){				  										//return information when the user doesn't choose any function
			request.getSession().setAttribute("message", "please choose the function:change or delete!");
		}
		else if(choice.equals("change")) {										//change function
			System.out.println("in change"); 
			try{
				System.out.println("in try");
				stmt.execute("update book set AuthorId='"+id+"', Publisher='"+publisher+"', PublishDate='"+date+"', Price="+price+" where isbn='"+request.getParameter("old_isbn")+"'");
				request.getSession().setAttribute("message", "change data successed");
			}catch(Exception e) {
				request.getSession().setAttribute("message", "change data failed");
				System.out.println("change db failed");
				e.printStackTrace();
			}
		} 
		else if(choice.equals("delete")){								//delete function
			try{
				System.out.println("in try");
				stmt.execute("delete from book where isbn='"+request.getParameter("old_isbn")+"'");
				request.getSession().setAttribute("message", "delete data successed");
			}catch(Exception e) {
				request.getSession().setAttribute("message", "delete data failed");
				System.out.println("change db failed");
				e.printStackTrace();
			}
		}
	    db.closeConnect();
		return SUCCESS;
	}
}
