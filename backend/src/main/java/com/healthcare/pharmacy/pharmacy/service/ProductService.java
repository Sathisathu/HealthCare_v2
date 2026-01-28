package com.healthcare.pharmacy.pharmacy.service;

import com.healthcare.pharmacy.pharmacy.entity.Product;
import com.healthcare.pharmacy.pharmacy.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id).orElseThrow(() -> new RuntimeException("Product not found"));
    }

    public void addProduct(Product product) {
        productRepository.save(product);
    }
}
