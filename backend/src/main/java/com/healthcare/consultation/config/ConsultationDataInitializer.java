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
            DoctorAvailabilityRepository availabilityRepository) {
        return args -> {
            if (doctorRepository.count() == 0) {
                // Seed Doctors
                Doctor d1 = new Doctor("Dr. John Smith", "Cardiologist", "12 Years", 500.0,
                        "https://via.placeholder.com/150", "+1 123 456 7890", "123 Heart St, NY");
                Doctor d2 = new Doctor("Dr. Sarah Doe", "Dermatologist", "8 Years", 400.0,
                        "https://via.placeholder.com/150", "+1 987 654 3210", "456 Skin Ave, LA");
                Doctor d3 = new Doctor("Dr. Emily White", "Pediatrician", "5 Years", 300.0,
                        "https://via.placeholder.com/150", "+1 555 123 4444", "789 Kids Rd, TX");

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
        };
    }
}
