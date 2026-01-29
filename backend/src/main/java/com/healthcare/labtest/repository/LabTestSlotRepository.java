package com.healthcare.labtest.repository;

import com.healthcare.labtest.entity.LabTestSlot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface LabTestSlotRepository extends JpaRepository<LabTestSlot, Long> {
    List<LabTestSlot> findByTestNameAndDate(String testName, LocalDate date);
}
