package com.healthcare.common.repository;

import com.healthcare.common.entity.WalletTransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface WalletTransactionRepository extends JpaRepository<WalletTransaction, Long> {
    List<WalletTransaction> findByStatus(String status);

    List<WalletTransaction> findByUserId(Long userId);
}
