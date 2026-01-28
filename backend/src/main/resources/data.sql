-- Clear existing data to avoid duplicates on restart
SET FOREIGN_KEY_CHECKS = 0;
DELETE FROM order_items;
DELETE FROM orders;
DELETE FROM products;
DELETE FROM users;
SET FOREIGN_KEY_CHECKS = 1;

INSERT INTO products (name, description, price, stock_quantity, category, image_url, dosage_form, strength, pack_size, is_prescription_required) VALUES 
('Paracetamol', 'Pain reliever and fever reducer', 10.0, 100, 'Analgesics', 'https://via.placeholder.com/150', 'Tablet', '500mg', '10 tablets', false),
('Amoxicillin', 'Antibiotic for bacterial infections', 50.0, 50, 'Antibiotics', 'https://via.placeholder.com/150', 'Capsule', '250mg', '15 capsules', true),
('Cetirizine', 'Antihistamine for allergies', 15.0, 200, 'Antihistamines', 'https://via.placeholder.com/150', 'Tablet', '10mg', '10 tablets', false),
('Cough Syrup', 'Relief from dry and chesty cough', 80.0, 30, 'Syrups', 'https://via.placeholder.com/150', 'Syrup', '100ml', '1 bottle', false),
('Aspirin', 'Blood thinner and pain reliever', 12.0, 150, 'Analgesics', 'https://via.placeholder.com/150', 'Tablet', '75mg', '14 tablets', false),
('Metformin', 'Medication for type 2 diabetes', 40.0, 80, 'Antidiabetics', 'https://via.placeholder.com/150', 'Tablet', '500mg', '30 tablets', true),
('Atorvastatin', 'Medication to lower cholesterol', 60.0, 60, 'Statins', 'https://via.placeholder.com/150', 'Tablet', '20mg', '28 tablets', true),
('Omeprazole', 'Relief from acid reflux and heartburn', 25.0, 120, 'Antacids', 'https://via.placeholder.com/150', 'Capsule', '20mg', '14 capsules', false),
('Vitamin C', 'Immune system support booster', 30.0, 300, 'Supplements', 'https://via.placeholder.com/150', 'Tablet', '1000mg', '60 tablets', false),
('Multivitamin Syrup', 'Daily nutritional support for kids', 120.0, 40, 'Supplements', 'https://via.placeholder.com/150', 'Syrup', '200ml', '1 bottle', false);

INSERT INTO users (name, email, role, wallet_balance) VALUES 
('Test Customer', 'customer@example.com', 'CUSTOMER', 1000.0),
('Admin User', 'admin@example.com', 'ADMIN', 0.0);
