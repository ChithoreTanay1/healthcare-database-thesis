package com.healthcare.analytics.service;

import com.healthcare.analytics.model.Goal;
import com.healthcare.analytics.repository.GoalRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GoalService {

    private final GoalRepository goalRepository;
    private final RedisTemplate<String, Object> redisTemplate;

    private static final String CACHE_PREFIX = "goal:";
    private static final Duration CACHE_TTL = Duration.ofMinutes(30);

    public List<Goal> getAll() {
        String key = CACHE_PREFIX + "all";
        Object cached = redisTemplate.opsForValue().get(key);
        if (cached != null) return (List<Goal>) cached;

        List<Goal> list = goalRepository.findAll();
        redisTemplate.opsForValue().set(key, list, CACHE_TTL);
        return list;
    }

    public Goal updateProgress(String id, int progress) {
        Goal goal = goalRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Goal not found"));
        goal.setProgress(progress);
        if (progress >= 100) {
            goal.setStatus(Goal.Status.COMPLETED);
        }
        Goal saved = goalRepository.save(goal);
        redisTemplate.delete(CACHE_PREFIX + "all");
        redisTemplate.delete(CACHE_PREFIX + id);
        return saved;
    }

    public Goal create(Goal goal) {
        Goal saved = goalRepository.save(goal);
        redisTemplate.delete(CACHE_PREFIX + "all");
        return saved;
    }

    public void delete(String id) {
        goalRepository.deleteById(id);
        redisTemplate.delete(CACHE_PREFIX + id);
        redisTemplate.delete(CACHE_PREFIX + "all");
    }
}