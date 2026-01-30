package com.healthcare.common.controller;

import com.healthcare.common.dto.LoginRequest;
import com.healthcare.common.dto.RegisterRequest;
import com.healthcare.common.entity.Patient;
import com.healthcare.common.entity.Admin;
import com.healthcare.consultation.entity.Doctor;
import com.healthcare.common.repository.PatientRepository;
import com.healthcare.common.repository.AdminRepository;
import com.healthcare.consultation.repository.DoctorRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        if (patientRepository.findByEmail(request.getEmail()).isPresent() ||
                doctorRepository.findByEmail(request.getEmail()).isPresent() ||
                adminRepository.findByEmail(request.getEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email already exists");
        }

        Patient patient = new Patient();
        patient.setName(request.getName());
        patient.setEmail(request.getEmail());
        patient.setPassword(passwordEncoder.encode(request.getPassword()));
        patient.setWalletBalance(1000.0);

        patientRepository.save(patient);
        Map<String, String> responseMap = new HashMap<>();
        responseMap.put("message", "Patient registered successfully");
        return ResponseEntity.ok(responseMap);
    }

    @Autowired
    private org.springframework.security.web.context.SecurityContextRepository securityContextRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest, HttpServletRequest request,
            jakarta.servlet.http.HttpServletResponse response) {
        System.out.println("Login attempt for: " + loginRequest.getEmail());
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        SecurityContext sc = SecurityContextHolder.getContext();
        sc.setAuthentication(authentication);
        HttpSession session = request.getSession(true);
        System.out.println("Login Successful. Session ID: " + session.getId());

        securityContextRepository.saveContext(sc, request, response);

        return findUserByEmail(loginRequest.getEmail())
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED).build());
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        System.out.println("Check /me. Session present: " + (session != null));
        if (session != null) {
            System.out.println("Session ID: " + session.getId());
        }

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        System.out.println("Auth in context: " + (auth != null ? auth.getName() : "NULL"));

        if (auth == null || !auth.isAuthenticated() || auth.getPrincipal().equals("anonymousUser")) {
            System.out.println("User not authenticated in /me");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        return findUserByEmail(auth.getName())
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED).build());
    }

    private Optional<Map<String, Object>> findUserByEmail(String email) {
        // Search Admin
        Optional<Admin> admin = adminRepository.findByEmail(email);
        if (admin.isPresent()) {
            Map<String, Object> resp = new HashMap<>();
            resp.put("id", admin.get().getId());
            resp.put("name", admin.get().getName());
            resp.put("email", admin.get().getEmail());
            resp.put("role", admin.get().getRole());
            return Optional.of(resp);
        }

        // Search Doctor
        Optional<Doctor> doctor = doctorRepository.findByEmail(email);
        if (doctor.isPresent()) {
            Map<String, Object> resp = new HashMap<>();
            resp.put("id", doctor.get().getId());
            resp.put("name", doctor.get().getName());
            resp.put("email", doctor.get().getEmail());
            resp.put("role", "DOCTOR");
            return Optional.of(resp);
        }

        // Search Patient
        Optional<Patient> patient = patientRepository.findByEmail(email);
        if (patient.isPresent()) {
            Map<String, Object> resp = new HashMap<>();
            resp.put("id", patient.get().getId());
            resp.put("name", patient.get().getName());
            resp.put("email", patient.get().getEmail());
            resp.put("role", "PATIENT");
            resp.put("walletBalance", patient.get().getWalletBalance());
            return Optional.of(resp);
        }

        return Optional.empty();
    }
}
