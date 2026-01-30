package com.healthcare.blooddonation.entity;

import com.healthcare.common.entity.Patient;
import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "blood_donation_volunteers")
public class BloodDonationVolunteer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Patient patient;

    private LocalDate donationDate;

    private String status; // VOLUNTEERED, DONATED, NOT_ELIGIBLE, NOT_VISITED
    private String remarks; // e.g., low hemoglobin
    private boolean pointsAwarded;

    public BloodDonationVolunteer() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    public LocalDate getDonationDate() {
        return donationDate;
    }

    public void setDonationDate(LocalDate donationDate) {
        this.donationDate = donationDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public boolean isPointsAwarded() {
        return pointsAwarded;
    }

    public void setPointsAwarded(boolean pointsAwarded) {
        this.pointsAwarded = pointsAwarded;
    }
}
