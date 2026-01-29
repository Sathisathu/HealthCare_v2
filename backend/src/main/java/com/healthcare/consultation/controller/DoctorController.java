package com.healthcare.consultation.controller;

import com.healthcare.consultation.entity.Doctor;
import com.healthcare.consultation.entity.DoctorAvailability;
import com.healthcare.consultation.service.ConsultationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/doctors")
@CrossOrigin(origins = "*")
public class DoctorController {

    @Autowired
    private ConsultationService consultationService;

    @GetMapping
    public List<Doctor> searchDoctors(@RequestParam(required = false) String query) {
        return consultationService.searchDoctors(query);
    }

    @GetMapping("/{id}")
    public Doctor getDoctorById(@PathVariable Long id) {
        return consultationService.getDoctorById(id)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));
    }

    @GetMapping("/{id}/slots")
    public List<DoctorAvailability> getSlots(@PathVariable Long id, @RequestParam String date) {
        return consultationService.getSlotsByDoctorAndDate(id, LocalDate.parse(date));
    }

    @PutMapping("/slots/{slotId}")
    public DoctorAvailability updateSlot(@PathVariable Long slotId, @RequestParam boolean available) {
        return consultationService.updateSlotAvailability(slotId, available);
    }
}
