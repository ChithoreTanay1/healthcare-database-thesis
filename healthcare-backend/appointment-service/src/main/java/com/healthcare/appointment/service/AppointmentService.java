package com.healthcare.appointment.service;

import com.healthcare.appointment.model.Appointment;
import com.healthcare.appointment.repository.AppointmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final RedisTemplate<String, Object> redisTemplate;

    private static final String CACHE_PREFIX = "appointment:";
    private static final Duration CACHE_TTL = Duration.ofMinutes(15);

    public List<Appointment> getAll() {
        String key = CACHE_PREFIX + "all";
        Object cached = redisTemplate.opsForValue().get(key);
        if (cached != null) return (List<Appointment>) cached;

        List<Appointment> list = appointmentRepository.findAll();
        redisTemplate.opsForValue().set(key, list, CACHE_TTL);
        return list;
    }

    public Appointment getById(String id) {
        String key = CACHE_PREFIX + id;
        Object cached = redisTemplate.opsForValue().get(key);
        if (cached != null) return (Appointment) cached;

        Appointment apt = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));
        redisTemplate.opsForValue().set(key, apt, CACHE_TTL);
        return apt;
    }

    public List<Appointment> getByStatus(String status) {
        return appointmentRepository.findByStatus(
                Appointment.Status.valueOf(status.toUpperCase())
        );
    }

    public Appointment create(Appointment appointment) {
        Appointment saved = appointmentRepository.save(appointment);
        redisTemplate.delete(CACHE_PREFIX + "all");
        return saved;
    }

    public Appointment updateStatus(String id, String status) {
        Appointment apt = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));
        apt.setStatus(Appointment.Status.valueOf(status.toUpperCase()));
        Appointment saved = appointmentRepository.save(apt);
        redisTemplate.delete(CACHE_PREFIX + id);
        redisTemplate.delete(CACHE_PREFIX + "all");
        return saved;
    }

    public void delete(String id) {
        appointmentRepository.deleteById(id);
        redisTemplate.delete(CACHE_PREFIX + id);
        redisTemplate.delete(CACHE_PREFIX + "all");
    }
}