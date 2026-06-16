package com.healthcare.patient.service;

import com.healthcare.patient.model.Patient;
import com.healthcare.patient.repository.PatientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PatientService {

    private final PatientRepository patientRepository;

    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    public Patient getById(String id) {
        return patientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Patient not found"));
    }

    public Patient create(Patient patient) {
        return patientRepository.save(patient);
    }

    public Patient update(String id, Patient updated) {
        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Patient not found"));
        patient.setName(updated.getName());
        patient.setCondition(updated.getCondition());
        patient.setDepartment(updated.getDepartment());
        return patientRepository.save(patient);
    }

    public void delete(String id) {
        patientRepository.deleteById(id);
    }
}