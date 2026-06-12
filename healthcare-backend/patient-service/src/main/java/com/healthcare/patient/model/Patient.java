package com.healthcare.patient.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Table(name = "patients")
@Data
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String name;
    private Integer age;
    private String email;
    private String phone;
    private LocalDate lastVisit;
    private String condition;
    private String department;
}
