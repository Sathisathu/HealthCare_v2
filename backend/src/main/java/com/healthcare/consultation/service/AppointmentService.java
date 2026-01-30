package com.healthcare.consultation.service;

import com.healthcare.common.entity.Patient;
import com.healthcare.common.repository.PatientRepository;
import com.healthcare.consultation.entity.*;
import com.healthcare.consultation.repository.AppointmentRepository;
import com.healthcare.consultation.repository.DoctorAvailabilityRepository;
import com.healthcare.consultation.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private DoctorAvailabilityRepository availabilityRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Transactional
    public Appointment bookAppointment(Long userId, Long doctorId, LocalDate date, String slotTime,
            ConsultationType type) {
        Patient patient = patientRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Patient not found"));
        Doctor doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));

        // Check availability
        List<DoctorAvailability> slots = availabilityRepository.findByDoctorIdAndDate(doctorId, date);
        DoctorAvailability selectedSlot = slots.stream()
                .filter(s -> s.getSlotTime().equalsIgnoreCase(slotTime))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Slot not found for this doctor and date"));

        if (!selectedSlot.isAvailable()) {
            throw new RuntimeException("Slot is not available for booking");
        }

        // Create Appointment
        Appointment appointment = new Appointment();
        appointment.setPatient(patient);
        appointment.setDoctor(doctor);
        appointment.setDate(date);
        appointment.setSlotTime(slotTime);
        appointment.setConsultationType(type);
        appointment.setStatus(AppointmentStatus.CONFIRMED);
        appointment.setPaymentStatus("PAID");
        appointment.setReceiptUrl("APP-" + System.currentTimeMillis() + ".pdf");

        // Mark slot as unavailable and booked
        selectedSlot.setAvailable(false);
        selectedSlot.setBooked(true);
        availabilityRepository.save(selectedSlot);

        return appointmentRepository.save(appointment);
    }

    public List<Appointment> getPatientAppointments(Long userId) {
        return appointmentRepository.findByPatientId(userId);
    }

    public List<Appointment> getDoctorAppointments(Long doctorId) {
        return appointmentRepository.findByDoctorId(doctorId);
    }
}
