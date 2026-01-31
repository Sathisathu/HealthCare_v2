package com.healthcare.pharmacy.service;

import com.healthcare.pharmacy.entity.Order;
import com.healthcare.pharmacy.entity.OrderItem;
import com.healthcare.pharmacy.entity.Product;
import com.healthcare.common.entity.Patient;
import com.healthcare.pharmacy.repository.OrderRepository;
import com.healthcare.pharmacy.repository.ProductRepository;
import com.healthcare.common.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Transactional
    public Order placeOrder(Long userId, List<OrderItem> items, String paymentType) {
        Patient user = patientRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Patient not found"));

        double totalAmount = 0;
        for (OrderItem item : items) {
            Product product = productRepository.findById(item.getProduct().getId())
                    .orElseThrow(() -> new RuntimeException("Product not found: " + item.getProduct().getId()));

            if (product.getStockQuantity() < item.getQuantity()) {
                throw new RuntimeException("Insufficient stock for product: " + product.getName());
            }

            item.setPriceAtPurchase(product.getPrice());
            totalAmount += product.getPrice() * item.getQuantity();

            // Update Stock
            product.setStockQuantity(product.getStockQuantity() - item.getQuantity());
            productRepository.save(product);
        }

        if ("WALLET".equalsIgnoreCase(paymentType)) {
            // 1 coin = Rs. 1
            double coinsNeeded = totalAmount;
            if (user.getWalletBalance() < coinsNeeded) {
                throw new RuntimeException("Insufficient wallet balance. Needed: " + coinsNeeded + " coins");
            }
            user.setWalletBalance(user.getWalletBalance() - coinsNeeded);
            patientRepository.save(user);
        } else if ("SUBSCRIPTION".equalsIgnoreCase(paymentType)) {
            // Check Subscription
            if ("NONE".equalsIgnoreCase(user.getSubscriptionType()) ||
                    user.getSubscriptionExpiryDate() == null ||
                    user.getSubscriptionExpiryDate().isBefore(java.time.LocalDate.now())) {
                throw new RuntimeException("No active subscription found.");
            }

            if (user.getPharmacyCreditBalance() < totalAmount) {
                throw new RuntimeException(
                        "Insufficient pharmacy credits. Available: " + user.getPharmacyCreditBalance());
            }

            // Deduct Credits
            user.setPharmacyCreditBalance(user.getPharmacyCreditBalance() - totalAmount);
            patientRepository.save(user);
        }

        Order order = new Order();
        order.setCustomer(user);
        order.setOrderDate(LocalDateTime.now());
        order.setTotalAmount(totalAmount);
        order.setPaymentType(paymentType);
        order.setStatus("CONFIRMED");
        if ("WALLET".equalsIgnoreCase(paymentType) || "SUBSCRIPTION".equalsIgnoreCase(paymentType)) {
            order.setPaymentStatus("PAID");
        } else {
            order.setPaymentStatus("PENDING");
        }
        order.setReceiptUrl("ORD-" + System.currentTimeMillis());

        // Fix bidirectional relationship
        for (OrderItem item : items) {
            item.setOrder(order);
        }
        order.setOrderItems(items);

        return orderRepository.save(order);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @Transactional
    public Order updatePaymentStatus(Long id, String status) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        System.out.println("DEBUG: updatePaymentStatus called for Order ID: " + id + " with status: " + status);

        if ("PAID".equalsIgnoreCase(status) && !"PAID".equalsIgnoreCase(order.getPaymentStatus())) {
            // Fetch fresh patient record
            Patient customer = patientRepository.findById(order.getCustomer().getId())
                    .orElseThrow(() -> new RuntimeException("Customer record not found"));

            double amount = order.getTotalAmount();
            double coinsNeeded = amount;

            if (customer.getWalletBalance() == null) {
                customer.setWalletBalance(0.0);
            }

            System.out.println("DEBUG: Payment for Order " + id + ". Customer: " + customer.getName()
                    + ", Current Balance: " + customer.getWalletBalance() + ", Needed: " + coinsNeeded);

            if (customer.getWalletBalance() < coinsNeeded) {
                throw new RuntimeException("Insufficient wallet balance. Needed: " + coinsNeeded + " coins. You have: "
                        + customer.getWalletBalance());
            }

            customer.setWalletBalance(customer.getWalletBalance() - coinsNeeded);
            patientRepository.saveAndFlush(customer);

            System.out.println("DEBUG: Wallet deducted successfully for Customer " + customer.getId()
                    + ". New Balance: " + customer.getWalletBalance());
        }

        order.setPaymentStatus(status);
        return orderRepository.save(order);
    }
}
