package com.healthcare.subscription.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "subscription_plans")
public class SubscriptionPlan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name; // SILVER, GOLDEN
    private Double price;
    private Double pharmacyCreditLimit;
    private Integer consultationLimit;

    public SubscriptionPlan() {
    }

    public SubscriptionPlan(String name, Double price, Double pharmacyCreditLimit, Integer consultationLimit) {
        this.name = name;
        this.price = price;
        this.pharmacyCreditLimit = pharmacyCreditLimit;
        this.consultationLimit = consultationLimit;
    }

    // Getters and Setters
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

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Double getPharmacyCreditLimit() {
        return pharmacyCreditLimit;
    }

    public void setPharmacyCreditLimit(Double pharmacyCreditLimit) {
        this.pharmacyCreditLimit = pharmacyCreditLimit;
    }

    public Integer getConsultationLimit() {
        return consultationLimit;
    }

    public void setConsultationLimit(Integer consultationLimit) {
        this.consultationLimit = consultationLimit;
    }
}
