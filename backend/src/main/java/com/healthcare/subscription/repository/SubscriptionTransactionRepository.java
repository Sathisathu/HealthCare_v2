package com.healthcare.subscription.repository;

import com.healthcare.subscription.entity.SubscriptionTransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface SubscriptionTransactionRepository extends JpaRepository<SubscriptionTransaction, Long> {
    List<SubscriptionTransaction> findByUserId(Long userId);
}
