package com.struts.action;

public class Author {
	private String authorId;
	private String name;
	private int age;
	private String country;
	
	Author(){}
	Author(String authorId, String name, int age, String country){
		this.authorId = authorId;
		this.name = name;
		this.age = age;
		this.country = country;
	}
	public String getAuthorId() {
		return authorId; 
	}
	public String getName() {
		return name;
	}
	public int getAge() {
		return age;
	}
	public String getCountry() {
		return country;
	}
	
	public void setAuthorId(String authorId) {
		this.authorId = authorId;
	}
	public void setName(String name) {
		this.name = name;
	}
	public void setAge(int age) {
		this.age = age;
	}
	public void setCountry(String country) {
		this.country = country;
	}
}
