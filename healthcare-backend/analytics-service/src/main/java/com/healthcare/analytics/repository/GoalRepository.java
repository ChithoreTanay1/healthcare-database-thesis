package com.healthcare.analytics.repository;

import com.healthcare.analytics.model.Goal;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface GoalRepository extends JpaRepository<Goal, String> {
    List<Goal> findByTeam(String team);
    List<Goal> findByStatus(Goal.Status status);
}