package com.healthcare.analytics.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "team_pulses")
@Data
public class TeamPulse {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(unique = true)
    private String team;

    private Double overall;
    private Double collaboration;
    private Double communication;
    private Double development;
    private Double impact;
    private Double innovation;
    private Double inclusivity;
    private Double workBalance;
}