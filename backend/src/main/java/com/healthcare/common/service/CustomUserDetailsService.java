package com.healthcare.common.service;

import com.healthcare.common.entity.Patient;
import com.healthcare.common.entity.Admin;
import com.healthcare.consultation.entity.Doctor;
import com.healthcare.common.repository.PatientRepository;
import com.healthcare.common.repository.AdminRepository;
import com.healthcare.consultation.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Optional;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private AdminRepository adminRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        System.out.println("Loading user by email: " + email);
        // 1. Check Admin Table
        Optional<Admin> admin = adminRepository.findByEmail(email);
        if (admin.isPresent()) {
            System.out.println("Found Admin: " + email);
            return new org.springframework.security.core.userdetails.User(
                    admin.get().getEmail(),
                    admin.get().getPassword(),
                    Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + admin.get().getRole())));
        }

        // 2. Check Doctor Table
        Optional<Doctor> doctor = doctorRepository.findByEmail(email);
        if (doctor.isPresent()) {
            System.out.println("Found Doctor: " + email);
            return new org.springframework.security.core.userdetails.User(
                    doctor.get().getEmail(),
                    doctor.get().getPassword(),
                    Collections.singletonList(new SimpleGrantedAuthority("ROLE_DOCTOR")));
        }

        // 3. Check Patient Table
        Optional<Patient> patient = patientRepository.findByEmail(email);
        if (patient.isPresent()) {
            System.out.println("Found Patient: " + email);
            return new org.springframework.security.core.userdetails.User(
                    patient.get().getEmail(),
                    patient.get().getPassword(),
                    Collections.singletonList(new SimpleGrantedAuthority("ROLE_PATIENT")));
        }

        System.out.println("User NOT found: " + email);
        throw new UsernameNotFoundException("User not found with email: " + email);
    }
}
