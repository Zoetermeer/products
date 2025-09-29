package com.example.demo;

import org.flywaydb.core.Flyway;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;

import javax.sql.DataSource;

@SpringBootApplication
public class ProductServerApp {
	public static void main(String[] args) {
		System.out.println(">>> Starting ProductServerApp");
        SpringApplication.run(ProductServerApp.class, args);
	}
}
