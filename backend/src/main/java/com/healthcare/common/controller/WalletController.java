package com.healthcare.common.controller;

import com.healthcare.common.entity.WalletTransaction;
import com.healthcare.common.service.WalletService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/wallet")
@CrossOrigin(origins = "http://localhost:4200")
public class WalletController {

    @Autowired
    private WalletService walletService;

    @PostMapping("/topup")
    public WalletTransaction requestTopUp(@RequestBody Map<String, Object> request) {
        Long userId = Long.valueOf(request.get("userId").toString());
        Double amount = Double.valueOf(request.get("amount").toString());
        return walletService.requestTopUp(userId, amount);
    }

    @GetMapping("/pending")
    public List<WalletTransaction> getPendingTransactions() {
        return walletService.getPendingTransactions();
    }

    @PostMapping("/approve/{id}")
    public WalletTransaction approveTopUp(@PathVariable Long id) {
        return walletService.approveTopUp(id);
    }
}
