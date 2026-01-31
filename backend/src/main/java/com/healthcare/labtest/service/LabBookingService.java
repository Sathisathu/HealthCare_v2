package com.healthcare.labtest.service;

import com.healthcare.common.entity.Patient;
import com.healthcare.common.repository.PatientRepository;
import com.healthcare.labtest.entity.LabTestBooking;
import com.healthcare.labtest.entity.LabTestSlot;
import com.healthcare.labtest.repository.LabTestBookingRepository;
import com.healthcare.labtest.repository.LabTestSlotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class LabBookingService {
    @Autowired
    private LabTestBookingRepository bookingRepository;

    @Autowired
    private LabTestSlotRepository slotRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Transactional
    public LabTestBooking bookTest(Long patientId, Long slotId) {
        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new RuntimeException("Patient not found"));

        LabTestSlot slot = slotRepository.findById(slotId)
                .orElseThrow(() -> new RuntimeException("Slot not found"));

        if (slot.isBooked()) {
            throw new RuntimeException("Slot already booked");
        }

        slot.setBooked(true);
        slotRepository.save(slot);

        LabTestBooking booking = new LabTestBooking();
        booking.setPatient(patient);
        booking.setSlot(slot);
        booking.setStatus("BOOKED");

        return bookingRepository.save(booking);
    }

    public List<LabTestBooking> getPatientBookings(Long patientId) {
        return bookingRepository.findByPatientId(patientId);
    }

    public List<LabTestBooking> getAllBookings() {
        return bookingRepository.findAll();
    }

    @Transactional
    public LabTestBooking uploadResult(Long bookingId, String resultData) {
        LabTestBooking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        booking.setTestResultData(resultData);
        booking.setStatus("COMPLETED");

        // Release the slot so others can book this time again if needed

        return bookingRepository.save(booking);
    }

    public LabTestBooking getBooking(Long bookingId) {
        return bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
    }
}
