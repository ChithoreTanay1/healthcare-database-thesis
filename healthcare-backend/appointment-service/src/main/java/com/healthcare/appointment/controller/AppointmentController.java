package com.healthcare.appointment.controller;

import com.medihub.appointment.model.Appointment;
import com.medihub.appointment.service.AppointmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
@RequiredArgsConstructor
public class AppointmentController {

    private final AppointmentService appointmentService;

    @GetMapping
    public ResponseEntity<List<Appointment>> getAll() {
        return ResponseEntity.ok(appointmentService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Appointment> getById(@PathVariable String id) {
        return ResponseEntity.ok(appointmentService.getById(id));
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<Appointment>> getByStatus(@PathVariable String status) {
        return ResponseEntity.ok(appointmentService.getByStatus(status));
    }

    @PostMapping
    public ResponseEntity<Appointment> create(@RequestBody Appointment appointment) {
        return ResponseEntity.status(201).body(appointmentService.create(appointment));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Appointment> updateStatus(
            @PathVariable String id,
            @RequestParam String status
    ) {
        return ResponseEntity.ok(appointmentService.updateStatus(id, status));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        appointmentService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
