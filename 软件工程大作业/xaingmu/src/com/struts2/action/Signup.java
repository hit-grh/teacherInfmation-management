package com.struts2.action;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.Map;

import com.mysql.jdbc.PreparedStatement;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;

import database.DatabaseConnection;

/**
 * 注册类
 * @author dudu
 *
 */
public class Signup extends ActionSupport {

	private static final long serialVersionUID = 1L;
	
	/*IsTeacher--0-是学生；IsTeacher--1-是教师*/
	private int IsTeacher;
	private String Account;//用户名或账号
	private String Name;//姓名
	private String Password;//密码
	private String Major;//专业
	private String College;//学院
	private String Phone;//电话
	
	
	public int getIsTeacher() {
		return IsTeacher;
	}
	public void setIsTeacher(int isTeacher) {
		IsTeacher = isTeacher;
	}
	public String getAccount() {
		return Account;
	}
	public void setAccount(String account) {
		Account = account;
	}
	public String getName() {
		return Name;
	}
	public void setName(String name) {
		Name = name;
	}
	
	public String getPassword() {
		return Password;
	}
	public void setPassword(String password) {
		Password = password;
	}
	public String getMajor() {
		return Major;
	}
	public void setMajor(String major) {
		Major = major;
	}
	public String getCollege() {
		return College;
	}
	public void setCollege(String college) {
		College = college;
	}
	public String getPhone() {
		return Phone;
	}
	public void setPhone(String phone) {
		Phone = phone;
	}
	

	Map<String, Object>session;
	
	public String execute() throws Exception {
		Connection conn;	
		Statement stmt;	
		ResultSet rs;		
		 ActionContext context=ActionContext.getContext();
		 session=context.getSession();
		 
		//教师注册
		if(IsTeacher==1)
		{			
			try {
				 conn=DatabaseConnection.getConnection();	
				 stmt=conn.createStatement();
				 String sql="select *from teacher where TeacherAccount='"+Account+"'";
				 rs=stmt.executeQuery(sql);
				if(rs.next())
				 {
					 session.put("sign", "AlreadyRegistered");
					 System.out.println("账号已经存在");
				 }else{
					 conn=DatabaseConnection.getConnection();
					 String sql1="insert into teacher(TeacherAccount,Password,TeacherName,Position,College,Phone)values(?,?,?,?,?,?)";
					 PreparedStatement ps=(PreparedStatement) conn.prepareStatement(sql1);
					 ps.setString(1, Account);
					 ps.setString(2, Password);
					 ps.setString(3, Name);
					 ps.setString(4, Major);
					 ps.setString(5, College);
					 ps.setString(6, Phone);
					 ps.executeUpdate();
					 conn.close();
					 ps.close();
					 session.put("sign", "Successed");
				 }	 
			} catch (Exception e) {
				e.printStackTrace();
			}
			
		}	
		
		//学生注册
		else if(IsTeacher==0)
		{
			try {
				 conn=DatabaseConnection.getConnection();	
				 stmt=conn.createStatement();
				 String sql="select *from student where StudentAccount='"+Account+"'";
				 rs=stmt.executeQuery(sql);
				if(rs.next())
				 {
					 session.put("sign", "AlreadyRegistered");
					 System.out.println("账号已经存在");
				 }else{
					 conn=DatabaseConnection.getConnection();
					 String sql1="insert into student(StudentAccount,Password,StudentName,Major,College,Phone)values(?,?,?,?,?,?)";
					 PreparedStatement ps=(PreparedStatement) conn.prepareStatement(sql1);
					 ps.setString(1, Account);
					 ps.setString(2, Password);
					 ps.setString(3, Name);
					 ps.setString(4, Major);
					 ps.setString(5, College);
					 ps.setString(6, Phone);
					 ps.executeUpdate();
					 conn.close();
					 ps.close();
					 session.put("sign", "Successed");
				 }	 
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		
		return "success";
	}
	
	
}
