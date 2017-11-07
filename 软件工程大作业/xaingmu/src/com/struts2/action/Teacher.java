package com.struts2.action;

import java.sql.Blob;

/**
 * 
 * 教师类,教师所有信息
 * @author dudu
 *
 */

public class Teacher{
	
	private String TeacherAccount;	//教师账号
	private String Password;		//密码
	private String TeacherName;		//教师真是姓名
	private Blob Picture;
	private String College;			//学院
	private String Position;		//职位
	private String ResearchDirection;	//研究方向
	private String Record;			//履历
	private String FSRA;			//基金和科研成就
	private String Phone;			//电话
	private String Email;			//邮箱
	
	
	public String getTeacherAccount() {
		return TeacherAccount;
	}
	public void setTeacherAccount(String teacherAccount) {
		TeacherAccount = teacherAccount;
	}
	public String getPassword() {
		return Password;
	}
	public void setPassword(String password) {
		Password = password;
	}
	public String getTeacherName() {
		return TeacherName;
	}
	public void setTeacherName(String teacherName) {
		TeacherName = teacherName;
	}
	public String getCollege() {
		return College;
	}
	public void setCollege(String college) {
		College = college;
	}
	
	public Blob getPicture() {
		return Picture;
	}
	public void setPicture(Blob picture) {
		Picture = picture;
	}
	public String getPosition() {
		return Position;
	}
	public void setPosition(String position) {
		Position = position;
	}
	public String getResearchDirection() {
		return ResearchDirection;
	}
	public void setResearchDirection(String researchDirection) {
		ResearchDirection = researchDirection;
	}
	public String getRecord() {
		return Record;
	}
	public void setRecord(String record) {
		Record = record;
	}
	public String getFSRA() {
		return FSRA;
	}
	public void setFSRA(String fSRA) {
		FSRA = fSRA;
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
