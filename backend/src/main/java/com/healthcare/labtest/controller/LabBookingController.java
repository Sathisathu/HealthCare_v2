package com.healthcare.labtest.controller;

import com.healthcare.labtest.entity.LabTestBooking;
import com.healthcare.labtest.service.LabBookingService;
import com.healthcare.labtest.service.LabTestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/lab/bookings")
@CrossOrigin(origins = "*")
public class LabBookingController {

    @Autowired
    private LabTestService labTestService; // Switched to LabTestService

    @Autowired
    private LabBookingService labBookingService; // Keep for existing read methods if needed, but better to migrate.

    @PostMapping("/book")
    public LabTestBooking bookTest(@RequestBody BookingRequest request) { // Use DTO
        LabTestBooking booking = labTestService.bookTest(request.getPatientId(), request.getTestName(),
                java.time.LocalDate.parse(request.getDate()), request.getTime(), request.getPaymentType());
        System.out.println(
                "DEBUG: Booking created. ID: " + booking.getId() + ", PaymentStatus: " + booking.getPaymentStatus());
        return booking;
    }

    @GetMapping("/patient/{patientId}")
    public List<LabTestBooking> getPatientBookings(@PathVariable Long patientId) {
        return labBookingService.getPatientBookings(patientId);
    }

    @GetMapping
    public List<LabTestBooking> getAllBookings() {
        return labBookingService.getAllBookings();
    }

    @PostMapping("/result/{bookingId}")
    public LabTestBooking uploadResult(@PathVariable Long bookingId, @RequestBody String resultData) {
        return labBookingService.uploadResult(bookingId, resultData);
    }

    @GetMapping("/result/{bookingId}")
    public LabTestBooking getBookingResult(@PathVariable Long bookingId) {
        return labBookingService.getBooking(bookingId);
    }

    @PutMapping("/{id}/payment")
    public LabTestBooking updatePaymentStatus(@PathVariable Long id, @RequestBody Map<String, String> request) {
        String status = request.get("status");
        return labTestService.updatePaymentStatus(id, status);
    }

    public static class BookingRequest {
        private Long patientId;
        private String testName;
        private String date;
        private String time;
        private String paymentType;

        // Getters and Setters
        public Long getPatientId() {
            return patientId;
        }

        public void setPatientId(Long patientId) {
            this.patientId = patientId;
        }

        public String getTestName() {
            return testName;
        }

        public void setTestName(String testName) {
            this.testName = testName;
        }

        public String getDate() {
            return date;
        }

        public void setDate(String date) {
            this.date = date;
        }

        public String getTime() {
            return time;
        }

        public void setTime(String time) {
            this.time = time;
        }

        public String getPaymentType() {
            return paymentType;
        }

        public void setPaymentType(String paymentType) {
            this.paymentType = paymentType;
        }
    }
}
