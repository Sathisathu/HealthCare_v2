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

                // Helper to read image bytes
                try {
                    // Seed Doctors
                    List<Doctor> doctors = Arrays.asList(
                            createDoctor("Dr. Ananya Mehta", "Cardiologist", "8 Years", 1200.0,
                                    "static/images/doctors/Doctor_1.png", "+91 9876543101", "1st Floor", "Room 101",
                                    "ananya.mehta@hc.com", defaultPassword),
                            createDoctor("Dr. Priya Sharma", "Pediatrician", "5 Years", 900.0,
                                    "static/images/doctors/Doctor_2.png", "+91 9876543102", "2nd Floor", "Room 203",
                                    "priya.sharma@hc.com", defaultPassword),
                            createDoctor("Dr. Neha Reddy", "Dermatologist", "6 Years", 750.0,
                                    "static/images/doctors/Doctor_3.png", "+91 9876543103", "3rd Floor", "Room 305",
                                    "neha.reddy@hc.com", defaultPassword),
                            createDoctor("Dr. Kavya Iyer", "Gynecologist", "10 Years", 1500.0,
                                    "static/images/doctors/Doctor_4.png", "+91 9876543104", "4th Floor", "Room 402",
                                    "kavya.iyer@hc.com", defaultPassword),
                            createDoctor("Dr. Ritu Kulkarni", "Psychiatrist", "7 Years", 1100.0,
                                    "static/images/doctors/Doctor_5.png", "+91 9876543105", "5th Floor", "Room 504",
                                    "ritu.kulkarni@hc.com", defaultPassword),
                            createDoctor("Dr. Rajesh Gupta", "Orthopedic Surgeon", "12 Years", 1600.0,
                                    "static/images/doctors/Doctor_6.png", "+91 9876543106", "1st Floor", "Room 103",
                                    "rajesh.gupta@hc.com", defaultPassword),
                            createDoctor("Dr. Amit Verma", "General Physician", "4 Years", 600.0,
                                    "static/images/doctors/Doctor_7.png", "+91 9876543107", "2nd Floor", "Room 207",
                                    "amit.verma@hc.com", defaultPassword),
                            createDoctor("Dr. Suresh Menon", "Neurologist", "9 Years", 1700.0,
                                    "static/images/doctors/Doctor_8.png", "+91 9876543108", "3rd Floor", "Room 309",
                                    "suresh.menon@hc.com", defaultPassword),
                            createDoctor("Dr. Vikram Singh", "Pulmonologist", "6 Years", 1300.0,
                                    "static/images/doctors/Doctor_9.png", "+91 9876543109", "4th Floor", "Room 408",
                                    "vikram.singh@hc.com", defaultPassword),
                            createDoctor("Dr. Aditya Joshi", "Gastroenterologist", "11 Years", 1550.0,
                                    "static/images/doctors/Doctor_10.png", "+91 9876543110", "5th Floor", "Room 506",
                                    "aditya.joshi@hc.com", defaultPassword),
                            createDoctor("Dr. Manish Patel", "Oncologist", "13 Years", 1900.0,
                                    "static/images/doctors/Doctor_11.png", "+91 9876543111", "6th Floor", "Room 602",
                                    "manish.patel@hc.com", defaultPassword));

                    List<Doctor> savedDoctors = doctorRepository.saveAll(doctors);
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
                    System.out.println("Doctor Availability Seeded for 7 Days!");
                } catch (Exception e) {
                    System.err.println("Failed to seed doctors: " + e.getMessage());
                    e.printStackTrace();
                }
            }
        };
    }

    private Doctor createDoctor(String name, String specialization, String experience, Double fee, String imagePath,
            String phone, String floor, String room, String email, String password) throws java.io.IOException {

        byte[] imageBytes = null;
        String imageType = "image/png"; // Assuming png based on file extensions
        try {
            org.springframework.core.io.Resource resource = new org.springframework.core.io.ClassPathResource(
                    imagePath);
            if (resource.exists()) {
                imageBytes = resource.getContentAsByteArray();
            } else {
                System.out.println("Image not found: " + imagePath);
            }
        } catch (Exception e) {
            System.out.println("Error reading image: " + imagePath);
        }

        return new Doctor(name, specialization, experience, fee, imageBytes, imageType, phone, floor, room, email,
                password);
    }
}
