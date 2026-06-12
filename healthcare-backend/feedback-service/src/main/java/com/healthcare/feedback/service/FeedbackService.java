package com.healthcare.feedback.service;

import com.healthcare.feedback.model.Feedback;
import com.healthcare.feedback.repository.FeedbackRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FeedbackService {

    private final FeedbackRepository feedbackRepository;
    private final RedisTemplate<String, Object> redisTemplate;

    private static final String CACHE_PREFIX = "feedback:";
    private static final Duration CACHE_TTL = Duration.ofMinutes(10);

    public List<Feedback> getAll() {
        String key = CACHE_PREFIX + "all";
        Object cached = redisTemplate.opsForValue().get(key);
        if (cached != null) return (List<Feedback>) cached;

        List<Feedback> list = feedbackRepository.findByOrderByTimestampDesc();
        redisTemplate.opsForValue().set(key, list, CACHE_TTL);
        return list;
    }

    public List<Feedback> getByCategory(String category) {
        String key = CACHE_PREFIX + "category:" + category;
        Object cached = redisTemplate.opsForValue().get(key);
        if (cached != null) return (List<Feedback>) cached;

        List<Feedback> list = feedbackRepository.findByCategory(category);
        redisTemplate.opsForValue().set(key, list, CACHE_TTL);
        return list;
    }

    public List<Feedback> getByStatus(String status) {
        return feedbackRepository.findByStatus(
                Feedback.Status.valueOf(status.toUpperCase())
        );
    }

    public Feedback create(Feedback feedback) {
        Feedback saved = feedbackRepository.save(feedback);
        evictAllCaches();
        return saved;
    }

    public Feedback updateStatus(String id, String status) {
        Feedback feedback = feedbackRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Feedback not found"));
        feedback.setStatus(Feedback.Status.valueOf(status.toUpperCase()));
        Feedback saved = feedbackRepository.save(feedback);
        evictAllCaches();
        return saved;
    }

    public void delete(String id) {
        feedbackRepository.deleteById(id);
        evictAllCaches();
    }

    private void evictAllCaches() {
        redisTemplate.delete(CACHE_PREFIX + "all");
    }
}