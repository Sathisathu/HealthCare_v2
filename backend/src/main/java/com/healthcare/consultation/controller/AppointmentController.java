package com.healthcare.consultation.controller;

import com.healthcare.consultation.entity.Appointment;
import com.healthcare.consultation.entity.ConsultationType;
import com.healthcare.consultation.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin(origins = "*")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @PostMapping
    public Appointment bookAppointment(@RequestBody Map<String, Object> request) {
        Long userId = Long.valueOf(request.get("userId").toString());
        Long doctorId = Long.valueOf(request.get("doctorId").toString());
        LocalDate date = LocalDate.parse(request.get("date").toString());
        String slotTime = request.get("slotTime").toString();
        ConsultationType type = ConsultationType.valueOf(request.get("type").toString());

        return appointmentService.bookAppointment(userId, doctorId, date, slotTime, type);
    }

    @GetMapping("/user/{userId}")
    public List<Appointment> getPatientAppointments(@PathVariable Long userId) {
        return appointmentService.getPatientAppointments(userId);
    }

    @GetMapping("/doctor/{doctorId}")
    public List<Appointment> getDoctorAppointments(@PathVariable Long doctorId) {
        return appointmentService.getDoctorAppointments(doctorId);
    }

    @GetMapping("/{id}")
    public Appointment getAppointmentById(@PathVariable Long id) {
        return appointmentService.getAppointmentById(id);
    }

    @PutMapping("/{id}/payment")
    public org.springframework.http.ResponseEntity<?> updatePaymentStatus(@PathVariable Long id,
            @RequestBody Map<String, String> request) {
        try {
            String status = request.get("status");
            Appointment appointment = appointmentService.updatePaymentStatus(id, status);
            return org.springframework.http.ResponseEntity.ok(appointment);
        } catch (RuntimeException e) {
            return org.springframework.http.ResponseEntity.badRequest()
                    .body(java.util.Collections.singletonMap("message", e.getMessage()));
        }
    }
}
