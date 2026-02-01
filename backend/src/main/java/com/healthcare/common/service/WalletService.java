package com.healthcare.common.service;

import com.healthcare.common.entity.Patient;
import com.healthcare.common.entity.WalletTransaction;
import com.healthcare.common.repository.PatientRepository;
import com.healthcare.common.repository.WalletTransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class WalletService {

    @Autowired
    private WalletTransactionRepository walletRepository;

    @Autowired
    private PatientRepository patientRepository;

    public WalletTransaction requestTopUp(Long userId, Double amount) {
        Patient user = patientRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        WalletTransaction tx = new WalletTransaction();
        tx.setUser(user);
        tx.setAmount(amount);
        tx.setTransactionDate(LocalDateTime.now());
        tx.setStatus("PENDING");

        return walletRepository.save(tx);
    }

    @Transactional
    public WalletTransaction approveTopUp(Long transactionId) {
        WalletTransaction tx = walletRepository.findById(transactionId)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));

        if (!"PENDING".equalsIgnoreCase(tx.getStatus())) {
            throw new RuntimeException("Transaction is not PENDING");
        }

        // Add Balance
        Patient user = tx.getUser();
        user.setWalletBalance(user.getWalletBalance() + tx.getAmount());
        patientRepository.save(user);

        tx.setStatus("APPROVED");
        return walletRepository.save(tx);
    }

    public List<WalletTransaction> getPendingTransactions() {
        return walletRepository.findByStatus("PENDING");
    }
}
