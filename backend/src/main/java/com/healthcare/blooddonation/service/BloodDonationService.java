package com.healthcare.blooddonation.service;

import com.healthcare.blooddonation.entity.BloodDonationVolunteer;
import com.healthcare.blooddonation.repository.BloodDonationRepository;
import com.healthcare.common.entity.Patient;
import com.healthcare.common.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;
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

        BloodDonationVolunteer pendingRequest = donationRepository
                .findTopByPatientIdAndStatusOrderByDonationDateDesc(userId, "VOLUNTEERED");
        if (pendingRequest != null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "You already volunteered");
        }

        BloodDonationVolunteer lastDonation = donationRepository
                .findTopByPatientIdAndStatusOrderByDonationDateDesc(userId, "DONATED");
        if (lastDonation != null) {
            LocalDate lastDate = lastDonation.getDonationDate();
            if (date.isBefore(lastDate.plusMonths(6))) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                        "You cannot donate. Your last donation was on " + lastDate + ". You must wait 6 months.");
            }
        }

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
