package com.struts.action;

import java.sql.*;

public class SQLoperation{ 
	private static Connection connect;
	public Connection connect() { 
		try { 
			Class.forName("com.mysql.jdbc.Driver");
			System.out.println("Success loading Mysql Driver!"); 
		}catch (Exception e) { 
			System.out.print("Error loading Mysql Driver!"); 
			e.printStackTrace(); 
		} 
		try{ 
			connect = DriverManager.getConnection( "jdbc:mysql://w.rdc.sae.sina.com.cn:3307/app_wutong","o3kwzy2425","45i35hk5jxy3mkxwxxk2mlihk1zjz3zmlmylywlw"); 
			//connect = DriverManager.getConnection( "jdbc:mysql://localhost:3306/bookdb","root","tongtong"); 
			System.out.println("Success connect Mysql server!"); 
		}catch(Exception e) { 
			System.out.print("get data error!"); 
			e.printStackTrace(); 
		} 
		return connect;
	} 
	public void closeConnect() {
		try{
			connect.close();
		}catch(Exception e) {
			System.out.print("Error close connection!"); 
			e.printStackTrace(); 
		}
	}
}
