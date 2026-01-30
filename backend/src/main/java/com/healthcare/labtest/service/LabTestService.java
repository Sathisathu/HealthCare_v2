package com.healthcare.labtest.service;

import com.healthcare.labtest.entity.LabTest;
import com.healthcare.labtest.entity.LabTestSlot;
import com.healthcare.labtest.repository.LabTestRepository;
import com.healthcare.labtest.repository.LabTestSlotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;
import com.healthcare.labtest.entity.LabTestBooking;
import com.healthcare.labtest.repository.LabTestBookingRepository;

@Service
public class LabTestService {
    @Autowired
    private LabTestRepository labTestRepository;

    @Autowired
    private LabTestSlotRepository slotRepository;

    @Autowired
    private LabTestBookingRepository bookingRepository;

    @Autowired
    private com.healthcare.common.repository.PatientRepository patientRepository;

    public List<LabTest> getAllTests() {
        return labTestRepository.findAll();
    }

    public List<LabTestSlot> getSlots(String testName, LocalDate date) {
        // Generate virtual slots for the day
        List<String> times = java.util.Arrays.asList("08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
                "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM");
        List<LabTestSlot> virtualSlots = new java.util.ArrayList<>();

        // Fetch existing booked slots for this test and date
        List<LabTestSlot> bookedSlots = slotRepository.findByTestNameAndDate(testName, date);

        long dummyId = 1;
        for (String time : times) {
            LabTestSlot slot = new LabTestSlot();
            slot.setId(dummyId++); // Assign dummy ID for frontend selection logic
            slot.setTestName(testName);
            slot.setDate(date);
            slot.setTime(time);

            // Check if this time matches any booked slot
            boolean isBooked = bookedSlots.stream().anyMatch(bs -> bs.getTime().equalsIgnoreCase(time));
            slot.setBooked(isBooked);

            virtualSlots.add(slot);
        }
        return virtualSlots;
    }

    @org.springframework.transaction.annotation.Transactional
    public LabTestBooking bookTest(Long patientId, String testName, LocalDate date, String time) {
        // 1. Atomic Check if slot is already booked to prevent double booking
        if (slotRepository.existsByTestNameAndDateAndTime(testName, date, time)) {
            throw new RuntimeException("This slot is already booked. Please choose another time.");
        }

        // 2. Create and Save Slot (Persist the booking record)
        LabTestSlot slot = new LabTestSlot();
        slot.setTestName(testName);
        slot.setDate(date);
        slot.setTime(time);
        slot.setBooked(true);
        LabTestSlot savedSlot = slotRepository.save(slot);

        // 3. Create and Save Booking
        LabTestBooking booking = new LabTestBooking();
        booking.setPatient(
                patientRepository.findById(patientId).orElseThrow(() -> new RuntimeException("Patient not found")));
        booking.setSlot(savedSlot);
        booking.setStatus("BOOKED");

        return bookingRepository.save(booking);
    }
}
