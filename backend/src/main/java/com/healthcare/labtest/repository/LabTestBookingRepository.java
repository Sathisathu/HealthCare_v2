package com.healthcare.labtest.repository;

import com.healthcare.labtest.entity.LabTestBooking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface LabTestBookingRepository extends JpaRepository<LabTestBooking, Long> {
    List<LabTestBooking> findByPatientId(Long patientId);
}
