package com.healthcare.labtest.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "lab_tests")
public class LabTest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String testName;
    private String description;
    private Double price;
    private String testType; // e.g., "BLOOD_TEST", "SCAN"

    public LabTest() {
    }

    public LabTest(String testName, String description, Double price, String testType) {
        this.testName = testName;
        this.description = description;
        this.price = price;
        this.testType = testType;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTestName() {
        return testName;
    }

    public void setTestName(String testName) {
        this.testName = testName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getTestType() {
        return testType;
    }

    public void setTestType(String testType) {
        this.testType = testType;
    }
}
