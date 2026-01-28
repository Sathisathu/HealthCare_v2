package com.healthcare.pharmacy.service;

import com.healthcare.pharmacy.entity.Order;
import com.healthcare.pharmacy.entity.OrderItem;
import com.healthcare.pharmacy.entity.Product;
import com.healthcare.pharmacy.entity.User;
import com.healthcare.pharmacy.repository.OrderRepository;
import com.healthcare.pharmacy.repository.ProductRepository;
import com.healthcare.pharmacy.repository.UserRepository;
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
    private UserRepository userRepository;

    @Transactional
    public Order placeOrder(Long userId, List<OrderItem> items, String paymentType) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

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
            // 10 coins = Rs. 5 => 1 coin = Rs. 0.5.
            // Coins needed = Amount / 0.5 = Amount * 2
            double coinsNeeded = totalAmount * 2;
            if (user.getWalletBalance() < coinsNeeded) {
                throw new RuntimeException("Insufficient wallet balance. Needed: " + coinsNeeded + " coins");
            }
            user.setWalletBalance(user.getWalletBalance() - coinsNeeded);
            userRepository.save(user);
        }

        Order order = new Order();
        order.setCustomer(user);
        order.setOrderDate(LocalDateTime.now());
        order.setTotalAmount(totalAmount);
        order.setPaymentType(paymentType);
        order.setStatus("CONFIRMED");

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
}
