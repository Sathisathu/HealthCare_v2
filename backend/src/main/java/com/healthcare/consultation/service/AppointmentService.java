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

                // Subscription Check
                if (!"NONE".equalsIgnoreCase(patient.getSubscriptionType()) &&
                                patient.getSubscriptionExpiryDate() != null &&
                                patient.getSubscriptionExpiryDate().isAfter(java.time.LocalDate.now()) &&
                                patient.getRemainingConsultations() > 0) {

                        patient.setRemainingConsultations(patient.getRemainingConsultations() - 1);
                        patientRepository.save(patient);
                        appointment.setPaymentStatus("PAID");
                        System.out.println("DEBUG: Subscription used. Remaining consultations: "
                                        + patient.getRemainingConsultations());
                } else {
                        appointment.setPaymentStatus("PENDING");
                }

                appointment.setReceiptUrl("APP-" + System.currentTimeMillis() + ".pdf");

                System.out.println(
                                "DEBUG: Booking Appointment. ID will be generated. Status set to: "
                                                + appointment.getPaymentStatus());

                // Mark slot as unavailable and booked
                selectedSlot.setAvailable(false);
                selectedSlot.setBooked(true);
                availabilityRepository.save(selectedSlot);

                return appointmentRepository.save(appointment);
        }

        public List<Appointment> getPatientAppointments(Long userId) {
                return appointmentRepository.findByPatientId(userId);
        }

        @Transactional
        public Appointment updatePaymentStatus(Long apptId, String status) {
                Appointment appt = appointmentRepository.findById(apptId)
                                .orElseThrow(() -> new RuntimeException("Appointment not found"));

                System.out.println(
                                "DEBUG: updatePaymentStatus called for Appt ID: " + apptId + " with status: " + status);

                if ("PAID".equalsIgnoreCase(status) && !"PAID".equalsIgnoreCase(appt.getPaymentStatus())) {
                        // Fetch fresh patient to avoid proxy/stale balance issues
                        Patient patient = patientRepository.findById(appt.getPatient().getId())
                                        .orElseThrow(() -> new RuntimeException("Patient record not found"));

                        double amount = appt.getDoctor().getConsultationFee();
                        double coinsNeeded = amount;

                        if (patient.getWalletBalance() == null) {
                                patient.setWalletBalance(0.0);
                        }

                        System.out.println("DEBUG: Payment for Appt " + apptId + ". Patient: " + patient.getName()
                                        + ", Current Balance: " + patient.getWalletBalance() + ", Needed: "
                                        + coinsNeeded);

                        if (patient.getWalletBalance() < coinsNeeded) {
                                throw new RuntimeException("Insufficient wallet balance. Needed: " + coinsNeeded
                                                + " coins. You have: "
                                                + patient.getWalletBalance());
                        }

                        patient.setWalletBalance(patient.getWalletBalance() - coinsNeeded);
                        patientRepository.saveAndFlush(patient);

                        System.out.println("DEBUG: Wallet deducted successfully for Patient " + patient.getId()
                                        + ". New Balance: "
                                        + patient.getWalletBalance());
                }

                appt.setPaymentStatus(status);
                return appointmentRepository.save(appt);
        }

        public List<Appointment> getDoctorAppointments(Long doctorId) {
                return appointmentRepository.findByDoctorId(doctorId);
        }
}
