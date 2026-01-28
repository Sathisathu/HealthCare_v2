-- Clear existing data to avoid duplicates on restart
SET FOREIGN_KEY_CHECKS = 0;
DELETE FROM order_items;
DELETE FROM appointments;
DELETE FROM doctor_availability;
DELETE FROM orders;
DELETE FROM products;
DELETE FROM users;
DELETE FROM doctors;
SET FOREIGN_KEY_CHECKS = 1;

-- Doctors
INSERT INTO doctors (id, name, specialization, consultation_fee, business_contact_number, profile_image_url, address) VALUES 
(1, 'Dr. Sarah Smith', 'Cardiologist', 500.0, '+1234567890', 'https://randomuser.me/api/portraits/women/1.jpg', 'Heart Clinic, 123 Main St'),
(2, 'Dr. James Wilson', 'Dermatologist', 400.0, '+1234567891', 'https://randomuser.me/api/portraits/men/2.jpg', 'Skin Care Center, 456 Elm St'),
(3, 'Dr. Maria Garcia', 'Pediatrician', 350.0, '+1234567892', 'https://randomuser.me/api/portraits/women/3.jpg', 'Children Hospital, 789 Oak St');

-- Availability (Next 3 days for Dr. Sarah Smith - ONLINE & OFFLINE)
INSERT INTO doctor_availability (doctor_id, date, slot_time, consultation_type, is_available) VALUES 
(1, CURDATE(), '09:00 AM', 'ONLINE', true),
(1, CURDATE(), '10:00 AM', 'ONLINE', true),
(1, CURDATE(), '11:00 AM', 'ONLINE', false),
(1, CURDATE(), '02:00 PM', 'OFFLINE', true),
(1, CURDATE(), '03:00 PM', 'OFFLINE', true),
(1, DATE_ADD(CURDATE(), INTERVAL 1 DAY), '09:00 AM', 'ONLINE', true),
(1, DATE_ADD(CURDATE(), INTERVAL 1 DAY), '02:00 PM', 'OFFLINE', true);

-- Availability (Next 2 days for Dr. James Wilson)
INSERT INTO doctor_availability (doctor_id, date, slot_time, consultation_type, is_available) VALUES 
(2, CURDATE(), '11:00 AM', 'ONLINE', true),
(2, CURDATE(), '12:00 PM', 'ONLINE', true),
(2, DATE_ADD(CURDATE(), INTERVAL 1 DAY), '10:00 AM', 'OFFLINE', true);

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

INSERT INTO users (id, name, email, role, wallet_balance) VALUES 
(1, 'Test Customer', 'customer@example.com', 'CUSTOMER', 1000.0),
(2, 'Admin User', 'admin@example.com', 'ADMIN', 0.0);
