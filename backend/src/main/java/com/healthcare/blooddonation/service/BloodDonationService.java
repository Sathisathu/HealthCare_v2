package com.healthcare.blooddonation.service;

import com.healthcare.blooddonation.entity.BloodDonationVolunteer;
import com.healthcare.blooddonation.repository.BloodDonationRepository;
import com.healthcare.common.entity.Patient;
import com.healthcare.common.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.util.List;

@Service
public class BloodDonationService {
    @Autowired
    private BloodDonationRepository donationRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Transactional
    public BloodDonationVolunteer volunteer(Long userId, LocalDate date) {
        Patient user = patientRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Patient not found"));

        BloodDonationVolunteer volunteer = new BloodDonationVolunteer();
        volunteer.setPatient(user);
        volunteer.setDonationDate(date);
        volunteer.setStatus("VOLUNTEERED");
        volunteer.setPointsAwarded(false);

        return donationRepository.save(volunteer);
    }

    public List<BloodDonationVolunteer> getAllVolunteers() {
        return donationRepository.findAll();
    }

    public List<BloodDonationVolunteer> getPatientDonations(Long userId) {
        return donationRepository.findByPatientId(userId);
    }

    @Transactional
    public BloodDonationVolunteer updateStatus(Long id, String status, String remarks) {
        BloodDonationVolunteer donation = donationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Donation record not found"));

        donation.setStatus(status);
        donation.setRemarks(remarks);

        if ("DONATED".equalsIgnoreCase(status) && !donation.isPointsAwarded()) {
            Patient user = donation.getPatient();
            Double currentBalance = user.getWalletBalance() != null ? user.getWalletBalance() : 0.0;
            user.setWalletBalance(currentBalance + 3000.0);
            patientRepository.save(user);
            donation.setPointsAwarded(true);
        }

        return donationRepository.save(donation);
    }
}
