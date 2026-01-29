package com.healthcare.labtest.service;

import com.healthcare.labtest.entity.LabTest;
import com.healthcare.labtest.entity.LabTestSlot;
import com.healthcare.labtest.repository.LabTestRepository;
import com.healthcare.labtest.repository.LabTestSlotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;

@Service
public class LabTestService {
    @Autowired
    private LabTestRepository labTestRepository;

    @Autowired
    private LabTestSlotRepository slotRepository;

    public List<LabTest> getAllTests() {
        return labTestRepository.findAll();
    }

    public List<LabTestSlot> getSlots(String testName, LocalDate date) {
        return slotRepository.findByTestNameAndDate(testName, date);
    }
}
