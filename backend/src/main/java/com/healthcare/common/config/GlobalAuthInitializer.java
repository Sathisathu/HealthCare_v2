package com.healthcare.common.config;

import com.healthcare.common.entity.Patient;
import com.healthcare.common.entity.Admin;
import com.healthcare.common.repository.PatientRepository;
import com.healthcare.common.repository.AdminRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class GlobalAuthInitializer {

    @Bean
    CommandLineRunner initUsers(PatientRepository patientRepository,
            AdminRepository adminRepository,
            PasswordEncoder passwordEncoder) {
        return args -> {
            if (patientRepository.count() == 0 && adminRepository.count() == 0) {
                String commonPassword = passwordEncoder.encode("password");

                // Default Patient
                Patient patient = new Patient();
                patient.setName("Test Patient");
                patient.setEmail("patient@hc.com");
                patient.setPassword(commonPassword);
                patient.setWalletBalance(1000.0);
                patientRepository.save(patient);

                // Default Lab Admin
                Admin labAdmin = new Admin();
                labAdmin.setName("Lab Technician");
                labAdmin.setEmail("lab@hc.com");
                labAdmin.setPassword(commonPassword);
                labAdmin.setRole("LAB_ADMIN");
                adminRepository.save(labAdmin);

                // Default Blood Bank Admin
                Admin bloodAdmin = new Admin();
                bloodAdmin.setName("Blood Bank Manager");
                bloodAdmin.setEmail("blood@hc.com");
                bloodAdmin.setPassword(commonPassword);
                bloodAdmin.setRole("BLOOD_BANK_ADMIN");
                adminRepository.save(bloodAdmin);

                // Default Super Admin
                Admin admin = new Admin();
                admin.setName("Admin User");
                admin.setEmail("admin@hc.com");
                admin.setPassword(commonPassword);
                admin.setRole("ADMIN");
                adminRepository.save(admin);

                System.out.println("Default Patients and Admins Seeded Successfully!");
                System.out.println("Doctor accounts are seeded via ConsultationDataInitializer.");
            }
        };
    }
}
