package com.struts2.action;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.interceptor.ServletRequestAware;
import org.omg.CORBA.PUBLIC_MEMBER;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;

import database.DatabaseConnection;
import net.sf.json.JSONObject;

public class Loginin extends ActionSupport implements ServletRequestAware{
	private static final long serialVersionUID = 1L;
	
	private HttpServletRequest request;
	private String result;
	
	public void setServletRequest(HttpServletRequest arg0) {
		this.request = arg0;
	}
	public String getResult() {
		return result;
	}
	public void setResult(String result) {
		this.result = result;
	}
	public String execute() throws Exception {
		Connection conn;	
		Statement stmt;	
		Statement stmt2;	
		ResultSet rs;	
		ResultSet rs2;
		Map<String, Object>session;
		Map<String, Object>ret = new HashMap<String, Object>();
		String Account = request.getParameter("Account");
		String IsTeacher = request.getParameter("IsTeacher");
		String Password = request.getParameter("Password");
		ActionContext context=ActionContext.getContext();
		session=context.getSession();
		
		//教师登陆
		if("1".equals(IsTeacher)) 
		{	
			System.out.println("teacher");
			try {
				 conn=DatabaseConnection.getConnection();	
				 stmt=conn.createStatement();
				 String sql="select *from teacher where TeacherAccount='"+Account+"'";
				 rs=stmt.executeQuery(sql);
				
				if(rs.next())
				 {
					stmt2=conn.createStatement();
					 String sql2="select *from teacher where Password='"+Password+"' ";
					 rs2=stmt2.executeQuery(sql2);
					 if(rs2.next())
					 { 
						 Teacher teacher=new Teacher();
						 teacher.setTeacherAccount(rs.getString("TeacherAccount"));
						 teacher.setTeacherName(rs.getString("TeacherName"));
						 teacher.setCollege(rs.getString("College"));
						 teacher.setPosition(rs.getString("Position"));
						 teacher.setPhone(rs.getString("Phone"));
						 session.put("teacher", teacher);
						 ret.put("login", "Success");
						 
					 }
					 else {
						 ret.put("login", "ErrorPassword");
					 }
					 
				 }else{
					 ret.put("login", "NotFound");
				 }	 
			} catch (Exception e) {
				e.printStackTrace();
			}
			
		}	
		//学生注册
		else if("0".equals(IsTeacher))
		{
			try {
				 conn=DatabaseConnection.getConnection();	
				 stmt=conn.createStatement();
				 String sql="select *from student where StudentAccount='"+Account+"'";
				 rs=stmt.executeQuery(sql);
				if(rs.next())
				 {
					stmt2=conn.createStatement();
					String sql2="select *from student where Password='"+Password+"' ";
					 rs2=stmt2.executeQuery(sql2);
					if(rs2.next())
					{
						 ret.put("login", "Success");
						 Student student=new Student();
						 student.setStudentAccount(rs.getString("StudentAccount"));
						 student.setStudentName(rs.getString("StudentName"));
						 student.setMajor(rs.getString("Major"));
						 student.setCollege(rs.getString("College"));
						 student.setPhone(rs.getString("Phone"));
						 session.put("student", student);
					}else {
						 ret.put("login", "ErrorPassword");
					}
					 
				 }else{
					 ret.put("login", "NotFound");
					 
				 }	 
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		JSONObject jsonObject = JSONObject.fromObject(ret);
		result = jsonObject.toString();
		return SUCCESS;
	}
	
}
