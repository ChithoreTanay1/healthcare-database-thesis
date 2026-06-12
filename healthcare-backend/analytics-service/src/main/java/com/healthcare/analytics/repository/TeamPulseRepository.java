package com.healthcare.analytics.repository;

import com.healthcare.analytics.model.TeamPulse;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface TeamPulseRepository extends JpaRepository<TeamPulse, String> {
    Optional<TeamPulse> findByTeam(String team);
}