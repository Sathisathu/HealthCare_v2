package com.healthcare.labtest.config;

import com.healthcare.labtest.entity.LabTest;
import com.healthcare.labtest.repository.LabTestRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;
import java.util.List;

@Configuration
public class LabTestInitializer {

        @Bean
        public CommandLineRunner seedLabTests(LabTestRepository repository) {
                return args -> {
                        if (repository.count() == 0) {
                                List<LabTest> tests = Arrays.asList(
                                                new LabTest("Complete Blood Count (CBC)",
                                                                "Evaluates overall health and detects disorders like anemia and infection.",
                                                                20.0,
                                                                "BLOOD_TEST"),
                                                new LabTest("Lipid Profile",
                                                                "Measures cholesterol and triglycerides to assess heart health.",
                                                                35.0, "BLOOD_TEST"),
                                                new LabTest("Thyroid Profile", "Check thyroid function (T3, T4, TSH).",
                                                                40.0, "BLOOD_TEST"),
                                                new LabTest("Liver Function Test (LFT)",
                                                                "Screen and monitor liver damage.", 45.0,
                                                                "BLOOD_TEST"),
                                                new LabTest("Kidney Function Test (KFT)",
                                                                "Assess how well kidneys are working.", 45.0,
                                                                "BLOOD_TEST"),
                                                new LabTest("Glucose (Fasting)", "Measure blood sugar after fasting.",
                                                                15.0, "BLOOD_TEST"),
                                                new LabTest("Glucose (PPBS)", "Measure blood sugar after meals.", 15.0,
                                                                "BLOOD_TEST"),
                                                new LabTest("HbA1c", "Average blood sugar over past 3 months.", 30.0,
                                                                "BLOOD_TEST"),
                                                new LabTest("Urine Routine",
                                                                "Detects urinary tract infections and kidney disorders.",
                                                                20.0,
                                                                "BLOOD_TEST"),
                                                new LabTest("Vitamin D Total", "Screen for Vitamin D deficiency.", 50.0,
                                                                "BLOOD_TEST"),
                                                new LabTest("Vitamin B12", "Nerve function and blood cell health.",
                                                                50.0, "BLOOD_TEST"),
                                                new LabTest("Widal Test (Typhoid)", "Typhoid fever serology.", 25.0,
                                                                "BLOOD_TEST"),
                                                new LabTest("Pregnancy Test (Beta hCG)",
                                                                "Confirm pregnancy and estimate gestational age.",
                                                                30.0, "BLOOD_TEST"),
                                                new LabTest("COVID-19 RT-PCR", "Gold standard for COVID-19 detection.",
                                                                60.0, "BLOOD_TEST"),
                                                new LabTest("Chest X-Ray", "Imaging of the chest, lungs, heart.", 80.0,
                                                                "SCAN"),
                                                new LabTest("MRI Brain", "Detailed imaging of brain structures.", 250.0,
                                                                "SCAN"),
                                                new LabTest("CT Scan Abdomen",
                                                                "Cross-sectional imaging of abdominal organs.", 150.0,
                                                                "SCAN"),
                                                new LabTest("Ultrasound Abdomen", "Imaging using sound waves.", 100.0,
                                                                "SCAN"));
                                repository.saveAll(tests);
                                System.out.println("Lab Tests Seeded Successfully!");
                        }
                };
        }
}
