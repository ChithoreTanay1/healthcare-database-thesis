package com.healthcare.analytics.service;

import com.healthcare.analytics.model.TeamPulse;
import com.healthcare.analytics.repository.TeamPulseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TeamPulseService {

    private final TeamPulseRepository teamPulseRepository;
    private final RedisTemplate<String, Object> redisTemplate;

    private static final String CACHE_PREFIX = "teampulse:";
    private static final Duration CACHE_TTL = Duration.ofMinutes(30);

    public List<TeamPulse> getAll() {
        String key = CACHE_PREFIX + "all";
        Object cached = redisTemplate.opsForValue().get(key);
        if (cached != null) return (List<TeamPulse>) cached;

        List<TeamPulse> list = teamPulseRepository.findAll();
        redisTemplate.opsForValue().set(key, list, CACHE_TTL);
        return list;
    }

    public TeamPulse getByTeam(String team) {
        String key = CACHE_PREFIX + team;
        Object cached = redisTemplate.opsForValue().get(key);
        if (cached != null) return (TeamPulse) cached;

        TeamPulse pulse = teamPulseRepository.findByTeam(team)
                .orElseThrow(() -> new RuntimeException("Team not found"));
        redisTemplate.opsForValue().set(key, pulse, CACHE_TTL);
        return pulse;
    }

    public TeamPulse save(TeamPulse pulse) {
        TeamPulse saved = teamPulseRepository.save(pulse);
        redisTemplate.delete(CACHE_PREFIX + "all");
        redisTemplate.delete(CACHE_PREFIX + saved.getTeam());
        return saved;
    }
}