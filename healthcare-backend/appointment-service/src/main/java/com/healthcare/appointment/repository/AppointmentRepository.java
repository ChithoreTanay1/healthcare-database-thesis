package com.healthcare.appointment.repository;

import com.healthcare.appointment.model.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, String> {
    List<Appointment> findByStatus(Appointment.Status status);
    List<Appointment> findByDoctor(String doctor);
    List<Appointment> findByPatient(String patient);
}