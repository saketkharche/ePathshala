package com.ePathshala.entity;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;
@Entity
@Table(name = "Assignments")
@Data
public class Assignment {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer assignmentId;

    private String title;
    private String description;
    private String filePath;
    private LocalDate dueDate;

    @ManyToOne @JoinColumn(name = "teacherId")
    private Teacher teacher;

    @ManyToOne @JoinColumn(name = "classId")
    private ClassEntity classEntity;

    @ManyToOne @JoinColumn(name = "subjectId")
    private Subject subject;
}