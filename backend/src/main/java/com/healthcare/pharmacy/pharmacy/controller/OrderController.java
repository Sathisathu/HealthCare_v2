package com.healthcare.pharmacy.pharmacy.controller;

import com.healthcare.pharmacy.pharmacy.entity.Order;
import com.healthcare.pharmacy.pharmacy.entity.OrderItem;
import com.healthcare.pharmacy.pharmacy.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:4200")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/place")
    public Order placeOrder(@RequestBody Map<String, Object> payload) {
        Long userId = Long.valueOf(payload.get("userId").toString());
        String paymentType = (String) payload.get("paymentType");

        Object itemsObj = payload.get("items");
        if (!(itemsObj instanceof List)) {
            throw new RuntimeException("Invalid items format");
        }

        List<?> itemsList = (List<?>) itemsObj;
        java.util.ArrayList<OrderItem> items = new java.util.ArrayList<>();

        for (Object obj : itemsList) {
            if (obj instanceof Map) {
                Map<?, ?> itemMap = (Map<?, ?>) obj;
                OrderItem item = new OrderItem();
                com.healthcare.pharmacy.pharmacy.entity.Product p = new com.healthcare.pharmacy.pharmacy.entity.Product();
                p.setId(Long.valueOf(itemMap.get("productId").toString()));
                item.setProduct(p);
                item.setQuantity((Integer) itemMap.get("quantity"));
                items.add(item);
            }
        }

        return orderService.placeOrder(userId, items, paymentType);
    }

    @GetMapping
    public List<Order> getAllOrders() {
        return orderService.getAllOrders();
    }
}
