package com.healthcare.consultation.config;

import com.healthcare.consultation.entity.Doctor;
import com.healthcare.consultation.entity.DoctorAvailability;
import com.healthcare.consultation.repository.DoctorAvailabilityRepository;
import com.healthcare.consultation.repository.DoctorRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

@Configuration
public class ConsultationDataInitializer {

    @Bean
    CommandLineRunner initConsultationData(DoctorRepository doctorRepository,
            DoctorAvailabilityRepository availabilityRepository,
            org.springframework.security.crypto.password.PasswordEncoder passwordEncoder) {
        return args -> {
            if (doctorRepository.count() == 0) {
                String defaultPassword = passwordEncoder.encode("password");
                // Seed Doctors
                Doctor d1 = new Doctor("Dr. John Smith", "Cardiologist", "12 Years", 500.0,
                        "https://via.placeholder.com/150", "+1 123 456 7890", "Basement", "Room B102",
                        "doctor1@hc.com", defaultPassword);
                Doctor d2 = new Doctor("Dr. Sarah Doe", "Dermatologist", "8 Years", 400.0,
                        "https://via.placeholder.com/150", "+1 987 654 3210", "1st Floor", "Room 105",
                        "doctor2@hc.com", defaultPassword);
                Doctor d3 = new Doctor("Dr. Emily White", "Pediatrician", "5 Years", 300.0,
                        "https://via.placeholder.com/150", "+1 555 123 4444", "2nd Floor", "Room 210",
                        "doctor3@hc.com", defaultPassword);

                List<Doctor> savedDoctors = doctorRepository.saveAll(Arrays.asList(d1, d2, d3));
                System.out.println("Doctors Seeded Successfully!");

                // Seed Availability for next 7 days
                String[] timeSlots = {
                        "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
                        "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM",
                        "06:00 PM", "07:00 PM"
                };

                for (Doctor doc : savedDoctors) {
                    for (int i = 0; i < 7; i++) {
                        LocalDate date = LocalDate.now().plusDays(i);
                        for (String slotTime : timeSlots) {
                            DoctorAvailability av = new DoctorAvailability();
                            av.setDoctorId(doc.getId());
                            av.setDate(date);
                            av.setSlotTime(slotTime);
                            av.setAvailable(true);
                            av.setBooked(false);
                            availabilityRepository.save(av);
                        }
                    }
                }
                System.out.println("Doctor Availability (10 slots per day) Seeded for 7 Days!");
            }

            // Sync all doctors with hospital location info (Always run in Development)
            List<Doctor> doctors = doctorRepository.findAll();
            boolean updated = false;
            for (Doctor doc : doctors) {
                if (doc.getFloor() == null || doc.getRoomNumber() == null || doc.getFloor().equals("TBD")) {
                    String name = doc.getName().toLowerCase();
                    if (name.contains("john") || name.contains("smith")) {
                        doc.setFloor("Basement");
                        doc.setRoomNumber("Room B102");
                    } else if (name.contains("sarah") || name.contains("doe")) {
                        doc.setFloor("1st Floor");
                        doc.setRoomNumber("Room 105");
                    } else if (name.contains("emily") || name.contains("white")) {
                        doc.setFloor("2nd Floor");
                        doc.setRoomNumber("Room 210");
                    } else {
                        doc.setFloor("3rd Floor");
                        doc.setRoomNumber("Ward 3A");
                    }
                    updated = true;
                }
            }
            if (updated) {
                doctorRepository.saveAll(doctors);
                System.out.println("Doctor hospital locations synchronized!");
            }
        };
    }
}
