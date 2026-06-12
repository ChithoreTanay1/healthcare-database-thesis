package com.healthcare.appointment.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "appointments")
@Data
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String patient;
    private String doctor;
    private String date;
    private String time;
    private String type;

    @Enumerated(EnumType.STRING)
    private Status status;

    public enum Status { CONFIRMED, PENDING, COMPLETED }
}