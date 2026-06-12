package com.healthcare.feedback.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "feedbacks")
@Data
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String author;
    private String category;

    @Column(columnDefinition = "TEXT")
    private String content;

    private LocalDateTime timestamp;

    @Enumerated(EnumType.STRING)
    private Status status;

    public enum Status { NEW, REVIEWED, ARCHIVED }

    @PrePersist
    public void prePersist() {
        this.timestamp = LocalDateTime.now();
    }
}