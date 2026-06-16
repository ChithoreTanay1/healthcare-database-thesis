package com.healthcare.feedback.service;

import com.healthcare.feedback.model.Feedback;
import com.healthcare.feedback.repository.FeedbackRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FeedbackService {

    private final FeedbackRepository feedbackRepository;

    public List<Feedback> getAll() {
        return feedbackRepository.findByOrderByTimestampDesc();
    }

    public List<Feedback> getByCategory(String category) {
        return feedbackRepository.findByCategory(category);
    }

    public List<Feedback> getByStatus(String status) {
        return feedbackRepository.findByStatus(
                Feedback.Status.valueOf(status.toUpperCase())
        );
    }

    public Feedback create(Feedback feedback) {
        return feedbackRepository.save(feedback);
    }

    public Feedback updateStatus(String id, String status) {
        Feedback feedback = feedbackRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Feedback not found"));
        feedback.setStatus(Feedback.Status.valueOf(status.toUpperCase()));
        return feedbackRepository.save(feedback);
    }

    public void delete(String id) {
        feedbackRepository.deleteById(id);
    }
}