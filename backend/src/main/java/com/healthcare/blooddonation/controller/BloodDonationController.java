package com.healthcare.blooddonation.controller;

import com.healthcare.blooddonation.entity.BloodDonationVolunteer;
import com.healthcare.blooddonation.service.BloodDonationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/blood-donation")
@CrossOrigin(origins = "*")
public class BloodDonationController {
    @Autowired
    private BloodDonationService donationService;

    @PostMapping("/volunteer")
    public BloodDonationVolunteer volunteer(@RequestBody Map<String, Object> request) {
        Long userId = Long.valueOf(request.get("userId").toString());
        LocalDate date = LocalDate.parse(request.get("date").toString());
        return donationService.volunteer(userId, date);
    }

    @GetMapping("/patient/{userId}")
    public List<BloodDonationVolunteer> getPatientDonations(@PathVariable Long userId) {
        return donationService.getPatientDonations(userId);
    }

    @GetMapping("/admin/list")
    public List<BloodDonationVolunteer> getAllVolunteers() {
        return donationService.getAllVolunteers();
    }

    @PutMapping("/admin/status/{id}")
    public BloodDonationVolunteer updateStatus(@PathVariable Long id, @RequestBody Map<String, String> request) {
        return donationService.updateStatus(id, request.get("status"), request.get("remarks"));
    }
}
