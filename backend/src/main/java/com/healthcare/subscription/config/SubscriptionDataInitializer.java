package com.healthcare.subscription.config;

import com.healthcare.subscription.entity.SubscriptionPlan;
import com.healthcare.subscription.repository.SubscriptionPlanRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SubscriptionDataInitializer {

    @Bean
    CommandLineRunner initSubscriptionPlans(SubscriptionPlanRepository planRepository) {
        return args -> {
            if (planRepository.count() == 0) {
                SubscriptionPlan silver = new SubscriptionPlan("Silver", 5000.0, 2000.0, 5);
                SubscriptionPlan golden = new SubscriptionPlan("Golden", 10000.0, 3000.0, 10);
                planRepository.save(silver);
                planRepository.save(golden);
                System.out.println("Subscription Plans Seeded: Silver & Golden");
            }
        };
    }
}
