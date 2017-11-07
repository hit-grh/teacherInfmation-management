package com.struts.action;

import java.sql.Date;

public class Book {
	private String isbn;
	private String title; 
	private String authorId;
	private String publisher;
	private Date publishDate;
	private Float price;
	
	Book(){}
	Book(String isbn, String title,  String publisher, Date publishDate, Float price, String authorId) {
		this.isbn = isbn;
		this.title = title;
		this.authorId = authorId;
		this.publisher = publisher;
		this.publishDate = publishDate;
		this.price = price;
	}
	
	public String getISBN() {
		return isbn;
	}
	public String getTitle() {
		return title;
	}
	public String getAuthorId() {
		return authorId;
	}
	public String getPublisher() {
		return publisher;
	}
	public Date getPublishDate() {
		return publishDate;
	}
	public Float getPrice() {
		return price;
	}
	
	public void setISBN(String isbn) {
		this.isbn = isbn;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public void setAuthorId(String authorId) {
		this.authorId = authorId;
	}
	public void setPublisher(String publisher) {
		this.publisher = publisher;
	}
	public void setPublishDate(Date publishDate) {
		this.publishDate = publishDate;
	}
	public void setPrice(Float price) {
		this.price = price;
	}
	
}
