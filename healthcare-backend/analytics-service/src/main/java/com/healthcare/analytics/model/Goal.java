package com.healthcare.analytics.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "goals")
@Data
public class Goal {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String team;
    private String title;
    private Integer progress;

    @Enumerated(EnumType.STRING)
    private Status status;

    public enum Status { ACTIVE, COMPLETED }
}