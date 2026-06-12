package com.healthcare.patient.repository;

import com.healthcare.patient.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PatientRepository extends JpaRepository<Patient, String> {
    List<Patient> findByDepartment(String department);
}