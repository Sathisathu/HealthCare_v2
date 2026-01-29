package com.healthcare.labtest.config;

import com.healthcare.labtest.entity.LabTest;
import com.healthcare.labtest.entity.LabTestSlot;
import com.healthcare.labtest.repository.LabTestRepository;
import com.healthcare.labtest.repository.LabTestSlotRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

@Configuration
public class LabDataInitializer {

    @Bean
    CommandLineRunner initLabData(LabTestRepository testRepository, LabTestSlotRepository slotRepository) {
        return args -> {
            if (testRepository.count() == 0) {
                List<LabTest> tests = Arrays.asList(
                        new LabTest("Complete Blood Count (CBC)", "Measures various components of blood.", 50.0,
                                "BLOOD_TEST"),
                        new LabTest("Lipid Profile", "Checks cholesterol and triglyceride levels.", 80.0, "BLOOD_TEST"),
                        new LabTest("Thyroid Profile (T3, T4, TSH)", "Evaluates thyroid function.", 120.0,
                                "BLOOD_TEST"),
                        new LabTest("X-Ray Chest", "Imaging of heart and lungs.", 150.0, "SCAN"),
                        new LabTest("MRI Brain", "Detailed imaging of brain structure.", 500.0, "SCAN"),
                        new LabTest("Ultrasound Abdomen", "Imaging of abdominal organs.", 250.0, "SCAN"));
                testRepository.saveAll(tests);
                System.out.println("Lab Tests Seeded!");

                // Seed slots for each test for the next 7 days
                String[] times = {
                        "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM",
                        "12:00 PM", "02:00 PM", "03:00 PM", "04:00 PM",
                        "05:00 PM", "06:00 PM"
                };

                for (LabTest test : tests) {
                    for (int i = 0; i < 7; i++) {
                        LocalDate date = LocalDate.now().plusDays(i);
                        for (String time : times) {
                            LabTestSlot slot = new LabTestSlot();
                            slot.setTestName(test.getTestName());
                            slot.setDate(date);
                            slot.setTime(time);
                            slot.setBooked(false);
                            slotRepository.save(slot);
                        }
                    }
                }
                System.out.println("Lab Test Slots (10 per day) Seeded!");
            }
        };
    }
}
