package com.healthcare.common.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "patients")
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String password;
    private Double walletBalance;
    private String phoneNumber;
    private String address;
    private String dateOfBirth;
    private String gender;
    private String bloodGroup;

    // Subscription Fields
    private String subscriptionType = "NONE"; // NONE, SILVER, GOLDEN
    private Double pharmacyCreditBalance = 0.0;
    private Integer remainingConsultations = 0;
    private java.time.LocalDate subscriptionExpiryDate;

    public Patient() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Double getWalletBalance() {
        return walletBalance;
    }

    public void setWalletBalance(Double walletBalance) {
        this.walletBalance = walletBalance;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(String dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getBloodGroup() {
        return bloodGroup;
    }

    public void setBloodGroup(String bloodGroup) {
        this.bloodGroup = bloodGroup;
    }

    public String getSubscriptionType() {
        return subscriptionType;
    }

    public void setSubscriptionType(String subscriptionType) {
        this.subscriptionType = subscriptionType;
    }

    public Double getPharmacyCreditBalance() {
        return pharmacyCreditBalance;
    }

    public void setPharmacyCreditBalance(Double pharmacyCreditBalance) {
        this.pharmacyCreditBalance = pharmacyCreditBalance;
    }

    public Integer getRemainingConsultations() {
        return remainingConsultations;
    }

    public void setRemainingConsultations(Integer remainingConsultations) {
        this.remainingConsultations = remainingConsultations;
    }

    public java.time.LocalDate getSubscriptionExpiryDate() {
        return subscriptionExpiryDate;
    }

    public void setSubscriptionExpiryDate(java.time.LocalDate subscriptionExpiryDate) {
        this.subscriptionExpiryDate = subscriptionExpiryDate;
    }
}
