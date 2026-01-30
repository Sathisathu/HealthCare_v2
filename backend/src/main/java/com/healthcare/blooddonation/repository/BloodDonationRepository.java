package com.healthcare.blooddonation.repository;

import com.healthcare.blooddonation.entity.BloodDonationVolunteer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BloodDonationRepository extends JpaRepository<BloodDonationVolunteer, Long> {
    List<BloodDonationVolunteer> findByPatientId(Long patientId);
}
