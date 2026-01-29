package com.healthcare.consultation.service;

import com.healthcare.consultation.entity.Doctor;
import com.healthcare.consultation.entity.DoctorAvailability;
import com.healthcare.consultation.repository.DoctorAvailabilityRepository;
import com.healthcare.consultation.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class ConsultationService {

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private DoctorAvailabilityRepository availabilityRepository;

    public List<Doctor> searchDoctors(String query) {
        if (query == null || query.trim().isEmpty()) {
            return doctorRepository.findAll();
        }
        return doctorRepository.searchDoctors(query);
    }

    public Optional<Doctor> getDoctorById(Long id) {
        return doctorRepository.findById(id);
    }

    public List<DoctorAvailability> getSlotsByDoctorAndDate(Long doctorId, LocalDate date) {
        List<DoctorAvailability> slots = availabilityRepository.findByDoctorIdAndDate(doctorId, date);
        // If no slots exist for this date, they should ideally be initialized by a
        // background task or on first request.
        // For simplicity, we assume they are seeded.
        return slots;
    }

    public DoctorAvailability updateSlotAvailability(Long slotId, boolean isAvailable) {
        DoctorAvailability slot = availabilityRepository.findById(slotId)
                .orElseThrow(() -> new RuntimeException("Slot not found"));

        if (slot.isBooked()) {
            throw new RuntimeException("Cannot change availability of a booked slot");
        }

        slot.setAvailable(isAvailable);
        return availabilityRepository.save(slot);
    }
}
