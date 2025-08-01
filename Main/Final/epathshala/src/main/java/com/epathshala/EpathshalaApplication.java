package com.epathshala;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class EpathshalaApplication {

    public static void main(String[] args) {
        SpringApplication.run(EpathshalaApplication.class, args);
    }
}