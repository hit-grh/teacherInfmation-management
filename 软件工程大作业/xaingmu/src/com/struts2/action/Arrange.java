package com.struts2.action;


/**
 * 学生预约信息
 * @author dudu
 *
 */
public class Arrange {
	
	private String TeacherAccount;	//教师账号
	private String StudentAccount;	//学生的账号
	private String ArrangeTime;		//预约时间
	private String ArrangeReason;	//事由
	private String SuccessFail;		//预约状态
	public String getTeacherAccount() {
		return TeacherAccount;
	}
	public void setTeacherAccount(String teacherAccount) {
		TeacherAccount = teacherAccount;
	}
	public String getStudentAccount() {
		return StudentAccount;
	}
	public void setStudentAccount(String studentAccount) {
		StudentAccount = studentAccount;
	}
	public String getArrangeTime() {
		return ArrangeTime;
	}
	public void setArrangeTime(String arrangeTime) {
		ArrangeTime = arrangeTime;
	}
	public String getArrangeReason() {
		return ArrangeReason;
	}
	public void setArrangeReason(String arrangeReason) {
		ArrangeReason = arrangeReason;
	}
	public String getSuccessFail() {
		return SuccessFail;
	}
	public void setSuccessFail(String successFail) {
		SuccessFail = successFail;
	}
	
	

}
