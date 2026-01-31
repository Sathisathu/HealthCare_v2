package com.healthcare.subscription.controller;

import com.healthcare.subscription.entity.SubscriptionPlan;
import com.healthcare.subscription.entity.SubscriptionTransaction;
import com.healthcare.subscription.service.SubscriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/subscriptions")
@CrossOrigin(origins = "http://localhost:4200")
public class SubscriptionController {

    @Autowired
    private SubscriptionService subscriptionService;

    @GetMapping("/plans")
    public List<SubscriptionPlan> getAllPlans() {
        return subscriptionService.getAllPlans();
    }

    @PostMapping("/purchase")
    public SubscriptionTransaction purchaseSubscription(@RequestBody Map<String, Object> request) {
        Long userId = Long.valueOf(request.get("userId").toString());
        Long planId = Long.valueOf(request.get("planId").toString());
        String paymentType = request.get("paymentType").toString();
        return subscriptionService.purchaseSubscription(userId, planId, paymentType);
    }

    @GetMapping("/user/{userId}")
    public com.healthcare.common.entity.Patient getUserSubscription(@PathVariable Long userId) {
        return subscriptionService.getPatientDetails(userId);
    }
}
