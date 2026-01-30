-- Clear existing data to avoid duplicates on restart
SET FOREIGN_KEY_CHECKS = 0;
DELETE FROM order_items;
DELETE FROM orders;
DELETE FROM products;
SET FOREIGN_KEY_CHECKS = 1;

-- Products
INSERT INTO products (id, name, description, price, stock_quantity, category, image_url, dosage_form, strength, pack_size, is_prescription_required) VALUES 
(1, 'Paracetamol', 'Pain reliever and fever reducer', 10.0, 100, 'Analgesics', 'https://via.placeholder.com/150', 'Tablet', '500mg', '10 tablets', false),
(2, 'Amoxicillin', 'Antibiotic for bacterial infections', 50.0, 50, 'Antibiotics', 'https://via.placeholder.com/150', 'Capsule', '250mg', '15 capsules', true),
(3, 'Cetirizine', 'Antihistamine for allergies', 15.0, 200, 'Antihistamines', 'https://via.placeholder.com/150', 'Tablet', '10mg', '10 tablets', false),
(4, 'Cough Syrup', 'Relief from dry and chesty cough', 80.0, 30, 'Syrups', 'https://via.placeholder.com/150', 'Syrup', '100ml', '1 bottle', false),
(5, 'Aspirin', 'Blood thinner and pain reliever', 12.0, 150, 'Analgesics', 'https://via.placeholder.com/150', 'Tablet', '75mg', '14 tablets', false),
(6, 'Metformin', 'Medication for type 2 diabetes', 40.0, 80, 'Antidiabetics', 'https://via.placeholder.com/150', 'Tablet', '500mg', '30 tablets', true),
(7, 'Atorvastatin', 'Medication to lower cholesterol', 60.0, 60, 'Statins', 'https://via.placeholder.com/150', 'Tablet', '20mg', '28 tablets', true),
(8, 'Omeprazole', 'Relief from acid reflux and heartburn', 25.0, 120, 'Antacids', 'https://via.placeholder.com/150', 'Capsule', '20mg', '14 capsules', false),
(9, 'Vitamin C', 'Immune system support booster', 30.0, 300, 'Supplements', 'https://via.placeholder.com/150', 'Tablet', '1000mg', '60 tablets', false),
(10, 'Multivitamin Syrup', 'Daily nutritional support for kids', 120.0, 40, 'Supplements', 'https://via.placeholder.com/150', 'Syrup', '200ml', '1 bottle', false);
