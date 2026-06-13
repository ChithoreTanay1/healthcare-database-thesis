package com.healthcare.feedback.controller;

import com.healthcare.feedback.model.Feedback;
import com.healthcare.feedback.service.FeedbackService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/feedback")
@RequiredArgsConstructor
public class FeedbackController {

    private final FeedbackService feedbackService;

    @GetMapping
    public ResponseEntity<List<Feedback>> getAll() {
        return ResponseEntity.ok(feedbackService.getAll());
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<Feedback>> getByCategory(@PathVariable String category) {
        return ResponseEntity.ok(feedbackService.getByCategory(category));
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<Feedback>> getByStatus(@PathVariable String status) {
        return ResponseEntity.ok(feedbackService.getByStatus(status));
    }

    @PostMapping
    public ResponseEntity<Feedback> create(@RequestBody Feedback feedback) {
        return ResponseEntity.status(201).body(feedbackService.create(feedback));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Feedback> updateStatus(
            @PathVariable String id,
            @RequestParam String status
    ) {
        return ResponseEntity.ok(feedbackService.updateStatus(id, status));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        feedbackService.delete(id);
        return ResponseEntity.noContent().build();
    }
}