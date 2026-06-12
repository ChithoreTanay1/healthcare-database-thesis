package com.healthcare.analytics.controller;

import com.healthcare.analytics.model.Goal;
import com.healthcare.analytics.model.TeamPulse;
import com.healthcare.analytics.service.GoalService;
import com.healthcare.analytics.service.TeamPulseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/analytics")
@RequiredArgsConstructor
public class AnalyticsController {

    private final TeamPulseService teamPulseService;
    private final GoalService goalService;

    public AnalyticsController(TeamPulseService teamPulseService, GoalService goalService) {
        this.teamPulseService = teamPulseService;
        this.goalService = goalService;
    }

    @GetMapping("/team-pulse")
    public ResponseEntity<List<TeamPulse>> getAllPulses() {
        return ResponseEntity.ok(teamPulseService.getAll());
    }

    @GetMapping("/team-pulse/{team}")
    public ResponseEntity<TeamPulse> getPulseByTeam(@PathVariable String team) {
        return ResponseEntity.ok(teamPulseService.getByTeam(team));
    }

    @PostMapping("/team-pulse")
    public ResponseEntity<TeamPulse> savePulse(@RequestBody TeamPulse pulse) {
        return ResponseEntity.status(201).body(teamPulseService.save(pulse));
    }

    @GetMapping("/goals")
    public ResponseEntity<List<Goal>> getAllGoals() {
        return ResponseEntity.ok(goalService.getAll());
    }

    @PostMapping("/goals")
    public ResponseEntity<Goal> createGoal(@RequestBody Goal goal) {
        return ResponseEntity.status(201).body(goalService.create(goal));
    }

    @PatchMapping("/goals/{id}/progress")
    public ResponseEntity<Goal> updateProgress(
            @PathVariable String id,
            @RequestParam int progress
    ) {
        return ResponseEntity.ok(goalService.updateProgress(id, progress));
    }

    @DeleteMapping("/goals/{id}")
    public ResponseEntity<Void> deleteGoal(@PathVariable String id) {
        goalService.delete(id);
        return ResponseEntity.noContent().build();
    }
}