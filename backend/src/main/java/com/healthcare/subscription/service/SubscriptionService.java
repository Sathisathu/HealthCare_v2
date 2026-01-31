package com.healthcare.subscription.service;

import com.healthcare.common.entity.Patient;
import com.healthcare.common.repository.PatientRepository;
import com.healthcare.subscription.entity.SubscriptionPlan;
import com.healthcare.subscription.entity.SubscriptionTransaction;
import com.healthcare.subscription.repository.SubscriptionPlanRepository;
import com.healthcare.subscription.repository.SubscriptionTransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class SubscriptionService {

    @Autowired
    private SubscriptionPlanRepository planRepository;

    @Autowired
    private SubscriptionTransactionRepository transactionRepository;

    @Autowired
    private PatientRepository patientRepository;

    public List<SubscriptionPlan> getAllPlans() {
        return planRepository.findAll();
    }

    @Transactional
    public SubscriptionTransaction purchaseSubscription(Long userId, Long planId, String paymentType) {
        // Validation
        Patient user = patientRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        SubscriptionPlan plan = planRepository.findById(planId)
                .orElseThrow(() -> new RuntimeException("Plan not found"));

        if (!"NONE".equalsIgnoreCase(user.getSubscriptionType()) &&
                user.getSubscriptionExpiryDate() != null &&
                user.getSubscriptionExpiryDate().isAfter(java.time.LocalDate.now())) {

            // Check for Upgrade
            SubscriptionPlan currentPlan = planRepository.findByName(user.getSubscriptionType());

            if (currentPlan != null && plan.getPrice() <= currentPlan.getPrice()) {
                throw new RuntimeException(
                        "Downgrading or re-subscribing to the same plan is not allowed while active.");
            }
        }

        // Mock Payment Check (Assume paymentType="ONLINE" is valid)
        // In real app, integrate payment gateway here.

        // Update User
        user.setSubscriptionType(plan.getName().toUpperCase());
        user.setPharmacyCreditBalance(plan.getPharmacyCreditLimit());
        user.setRemainingConsultations(plan.getConsultationLimit());
        user.setSubscriptionExpiryDate(java.time.LocalDate.now().plusMonths(2));
        patientRepository.save(user);

        // Record Transaction
        SubscriptionTransaction transaction = new SubscriptionTransaction();
        transaction.setUser(user);
        transaction.setPlanName(plan.getName());
        transaction.setAmount(plan.getPrice());
        transaction.setPurchaseDate(LocalDateTime.now());
        transaction.setExpiryDate(LocalDateTime.now().plusMonths(2));
        transaction.setStatus("ACTIVE");

        return transactionRepository.save(transaction);
    }

    // Helper to get transaction details (optional)
    public SubscriptionTransaction getLatestSubscription(Long userId) {
        // Logic to find latest active...
        List<SubscriptionTransaction> list = transactionRepository.findByUserId(userId);
        return list.isEmpty() ? null : list.get(list.size() - 1);
    }

    public Patient getPatientDetails(Long userId) {
        return patientRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
    }
}
