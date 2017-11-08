package com.struts2.action;

/**
 * 学生信息类
 */
public class Student {
	
	private String StudentAccount;	//学生账号
	private String Password;		//密码
	private String StudentName;		//姓名
	private String Major;			//专业
	private String College;			//学院
	private String Grade;			//年级
	private String Phone;			//手机
	private String Email;			//邮箱
	private String Picture;      //头像
	
	public String getPicture() {
		return Picture;
	}

	public void setPicture(String picture) {
		Picture = picture;
	}

	public String getStudentAccount() {
		return StudentAccount;
	}
	public void setStudentAccount(String studentAccount) {
		StudentAccount = studentAccount;
	}
	public String getPassword() {
		return Password;
	}
	public void setPassword(String password) {
		Password = password;
	}
	public String getStudentName() {
		return StudentName;
	}
	public void setStudentName(String studentName) {
		StudentName = studentName;
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
	public String getGrade() {
		return Grade;
	}
	public void setGrade(String grade) {
		Grade = grade;
	}
	public String getPhone() {
		return Phone;
	}
	public void setPhone(String phone) {
		Phone = phone;
	}
	public String getEmail() {
		return Email;
	}
	public void setEmail(String email) {
		Email = email;
	}
	
	
	
	
	
	

}
