-- Clear existing data
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE products;
SET FOREIGN_KEY_CHECKS = 1;

-- Insert Medicines (Images will be loaded by MedicineDataLoader based on ID)
INSERT INTO products (id, name, description, price, stock_quantity, category, dosage_form, strength, pack_size, is_prescription_required) VALUES 
(1, 'Pantoprazole', 'Proton pump inhibitor (PPI) for acid reduction.', 70.0, 100, 'Acid Reducer', 'Tablet', '40mg', '10 Tablets', true),
(2, 'Ranitidine', 'H2 blocker for stomach acid.', 10.0, 40, 'Antacid', 'Tablet', '150mg', '10 Tablets', false),
(3, 'ORS Powder', 'Oral Rehydration Salts.', 5.0, 500, 'Electrolyte & Rehydration Therapy', 'Sachet', '21.8g', 'Sachet', false),
(4, 'Vitamin C', 'Ascorbic acid supplement.', 30.0, 250, 'Dietary Supplement', 'Chewable Tablet', '500mg', '15 Tablets', false),
(5, 'Vitamin B', 'Vitamin B complex supplement.', 45.0, 200, 'Nutritional Supplement', 'Tablet', 'Standard', '30 Tablets', false),
(6, 'Calcium Ca', 'Calcium supplement for bone health.', 85.0, 150, 'Mineral Supplement', 'Tablet', '500mg', '30 Tablets', false),
(7, 'Iron Folic Acid', 'Iron and Folic Acid supplement.', 60.0, 180, 'Nutritional Supplement', 'Tablet', '100mg/0.5mg', '30 Tablets', false),
(8, 'Cough Syrup', 'Relieves cough and throat irritation.', 95.0, 120, 'Cough & Cold', 'Syrup', 'Standard', '100ml', false),
(9, 'Benadryl', 'Antihistamine for allergy relief.', 105.0, 90, 'Allergy', 'Syrup', '12.5mg/5ml', '150ml', false),
(10, 'Ascoril LS', 'Mucolytic and bronchodilator syrup.', 115.0, 70, 'Cough & Cold', 'Syrup', 'Standard', '100ml', true),
(11, 'Zincovit Sy', 'Multivitamin and multimineral syrup.', 145.0, 110, 'Nutritional Supplement', 'Syrup', 'Standard', '200ml', false),
(12, 'Digene Gel', 'Antacid and antigas gel.', 130.0, 95, 'Antacid', 'Syrup', 'Standard', '200ml', false),
(13, 'Gelusil', 'Antacid and antigas medication.', 20.0, 150, 'Antacid', 'Tablet/Liquid', 'Standard', '10 Tablets', false),
(14, 'Montelukast', 'Leukotriene receptor antagonist.', 85.0, 60, 'Allergy & Asthma', 'Tablet', '10mg', '10 Tablets', true),
(15, 'Salbutamol', 'Bronchodilator for asthma relief.', 150.0, 40, 'Respiratory Relief', 'Inhaler/Tablet', '100mcg', '1 unit', true),
(16, 'Asthalin', 'Salbutamol inhaler for respiratory relief.', 160.0, 55, 'Respiratory Relief', 'Inhaler', '100mcg', '200 MDI', true),
(17, 'Atorvastatin', 'Statin medication for cholesterol.', 110.0, 90, 'Cholesterol Management', 'Tablet', '10mg', '10 Tablets', true),
(18, 'Aspirin', 'NSAID and blood thinner.', 15.0, 180, 'Pain Relief', 'Tablet', '75mg', '14 Tablets', false),
(19, 'Clopidogrel', 'Antiplatelet medication (blood thinner).', 95.0, 75, 'Blood Thinner', 'Tablet', '75mg', '10 Tablets', true),
(20, 'Losartan', 'Angiotensin II receptor antagonist.', 55.0, 100, 'Blood Pressure Control', 'Tablet', '50mg', '15 Tablets', true),
(21, 'Amlodipine', 'Calcium channel blocker.', 45.0, 120, 'Blood Pressure & Heart Health', 'Tablet', '5mg', '15 Tablets', true),
(22, 'Metoprolol', 'Beta-blocker for heart health.', 40.0, 85, 'Heart & Blood Pressure', 'Tablet', '25mg', '10 Tablets', true),
(23, 'Ondansetron', 'Anti-nausea and vomiting medication.', 50.0, 65, 'Anti-Nausea & Vomiting', 'Tablet', '4mg', '10 Tablets', true),
(24, 'Domperidone', 'Dopamine antagonist for gastric motility.', 30.0, 110, 'Antiemetic & Gastrointestinal Motility Agent', 'Tablet', '10mg', '10 Tablets', true),
(25, 'Lactulose', 'Laxative for constipation relief.', 180.0, 45, 'Laxative', 'Syrup', '10g/15ml', '200ml', false),
(26, 'Isabgol Husk', 'Fiber supplement and bulk-forming laxative.', 150.0, 130, 'Digestive Health & Laxative', 'Powder', 'Natural', '100g', false);
