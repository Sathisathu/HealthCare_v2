package com.healthcare.common.config;

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
            if (adminRepository.count() == 0) {
                String commonPassword = passwordEncoder.encode("password");

                // (Default Patient Seed Removed)

                // Default Super Admin
                Admin admin = new Admin();
                admin.setName("Admin User");
                admin.setEmail("admin@hc.com");
                admin.setPassword(commonPassword);
                admin.setRole("ADMIN");
                adminRepository.save(admin);

                System.out.println("Default Admin Seeded Successfully!");
                System.out.println("Doctor accounts are seeded via ConsultationDataInitializer.");
            }
        };
    }
}
