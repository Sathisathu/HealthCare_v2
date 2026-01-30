package com.healthcare.labtest.entity;

import com.healthcare.common.entity.Patient;
import jakarta.persistence.*;

@Entity
@Table(name = "lab_test_bookings")
public class LabTestBooking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "patient_id")
    private Patient patient;

    @OneToOne
    @JoinColumn(name = "slot_id")
    private LabTestSlot slot;

    private String status; // BOOKED, COMPLETED

    @Column(columnDefinition = "TEXT")
    private String testResultData; // JSON string of results

    public LabTestBooking() {
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

    public LabTestSlot getSlot() {
        return slot;
    }

    public void setSlot(LabTestSlot slot) {
        this.slot = slot;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getTestResultData() {
        return testResultData;
    }

    public void setTestResultData(String testResultData) {
        this.testResultData = testResultData;
    }
}
