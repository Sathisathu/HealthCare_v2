package com.healthcare.labtest.controller;

import com.healthcare.labtest.entity.LabTest;
import com.healthcare.labtest.entity.LabTestSlot;
import com.healthcare.labtest.service.LabTestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/lab/tests")
@CrossOrigin(origins = "*")
public class LabTestController {
    @Autowired
    private LabTestService labTestService;

    @GetMapping
    public List<LabTest> getAllTests() {
        return labTestService.getAllTests();
    }

    @GetMapping("/slots")
    public List<LabTestSlot> getSlots(@RequestParam String testName, @RequestParam String date) {
        return labTestService.getSlots(testName, LocalDate.parse(date));
    }
}
