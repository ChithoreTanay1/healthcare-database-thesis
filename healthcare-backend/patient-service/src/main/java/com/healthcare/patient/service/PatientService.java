package com.healthcare.patient.service;

import com.healthcare.patient.model.Patient;
import com.healthcare.patient.repository.PatientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PatientService {

    private final PatientRepository patientRepository;
    private final RedisTemplate<String, Object> redisTemplate;

    private static final String CACHE_PREFIX = "patient:";
    private static final Duration CACHE_TTL = Duration.ofMinutes(30);

    public List<Patient> getAllPatients() {
        String key = CACHE_PREFIX + "all";
        Object cached = redisTemplate.opsForValue().get(key);
        if (cached != null) return (List<Patient>) cached;

        List<Patient> patients = patientRepository.findAll();
        redisTemplate.opsForValue().set(key, patients, CACHE_TTL);
        return patients;
    }

    public Patient getById(String id) {
        String key = CACHE_PREFIX + id;
        Object cached = redisTemplate.opsForValue().get(key);
        if (cached != null) return (Patient) cached;

        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Patient not found"));
        redisTemplate.opsForValue().set(key, patient, CACHE_TTL);
        return patient;
    }

    public Patient create(Patient patient) {
        Patient saved = patientRepository.save(patient);
        redisTemplate.delete(CACHE_PREFIX + "all");
        return saved;
    }

    public Patient update(String id, Patient updated) {
        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Patient not found"));
        patient.setName(updated.getName());
        patient.setCondition(updated.getCondition());
        patient.setDepartment(updated.getDepartment());
        Patient saved = patientRepository.save(patient);
        redisTemplate.delete(CACHE_PREFIX + id);
        redisTemplate.delete(CACHE_PREFIX + "all");
        return saved;
    }

    public void delete(String id) {
        patientRepository.deleteById(id);
        redisTemplate.delete(CACHE_PREFIX + id);
        redisTemplate.delete(CACHE_PREFIX + "all");
    }
}