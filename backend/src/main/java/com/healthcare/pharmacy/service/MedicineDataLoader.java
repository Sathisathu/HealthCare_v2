package com.healthcare.pharmacy.service;

import com.healthcare.pharmacy.entity.Product;
import com.healthcare.pharmacy.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Component;
import org.springframework.util.StreamUtils;

import java.io.InputStream;
import java.util.Optional;

@Component
public class MedicineDataLoader implements CommandLineRunner {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ResourceLoader resourceLoader;

    @Override
    public void run(String... args) throws Exception {
        System.out.println("Checking and Loading Medicine Images...");

        // We know we have ids 1 to 26 from data.sql
        for (long i = 1; i <= 26; i++) {
            loadImageForProduct(i);
        }

        System.out.println("Medicine Image Check Complete.");
    }

    private void loadImageForProduct(Long id) {
        Optional<Product> optProduct = productRepository.findById(id);
        if (optProduct.isPresent()) {
            Product product = optProduct.get();

            // Only load image if it's missing
            if (product.getImage() == null) {
                // Try to find matching image: medicine_1.jpg, .png, etc.
                String[] extensions = { ".jpg", ".jpeg", ".png" };
                boolean found = false;

                for (String ext : extensions) {
                    String imageName = "medicine_" + id + ext;
                    String path = "classpath:static/images/medicines/" + imageName;
                    Resource resource = resourceLoader.getResource(path);

                    if (resource.exists()) {
                        try (InputStream is = resource.getInputStream()) {
                            byte[] imageBytes = StreamUtils.copyToByteArray(is);
                            product.setImage(imageBytes);

                            if (ext.equals(".png")) {
                                product.setImageType("image/png");
                            } else {
                                product.setImageType("image/jpeg");
                            }

                            productRepository.save(product);
                            // System.out.println("Loaded image for: " + product.getName());
                            found = true;
                            break;
                        } catch (Exception e) {
                            System.err.println("Error loading image " + imageName + ": " + e.getMessage());
                        }
                    }
                }

                if (!found) {
                    System.out.println("No image found for ID " + id + " (" + product.getName() + ")");
                }
            }
        }
    }
}
