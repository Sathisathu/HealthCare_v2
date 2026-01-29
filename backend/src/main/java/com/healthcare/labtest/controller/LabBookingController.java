package com.healthcare.labtest.controller;

import com.healthcare.labtest.entity.LabTestBooking;
import com.healthcare.labtest.service.LabBookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/lab/bookings")
@CrossOrigin(origins = "*")
public class LabBookingController {
    @Autowired
    private LabBookingService bookingService;

    @PostMapping("/book")
    public LabTestBooking bookTest(@RequestBody Map<String, Long> request) {
        return bookingService.bookTest(request.get("patientId"), request.get("slotId"));
    }

    @GetMapping("/patient/{patientId}")
    public List<LabTestBooking> getPatientBookings(@PathVariable Long patientId) {
        return bookingService.getPatientBookings(patientId);
    }

    @GetMapping
    public List<LabTestBooking> getAllBookings() {
        return bookingService.getAllBookings();
    }

    @PostMapping("/result/{bookingId}")
    public LabTestBooking uploadResult(@PathVariable Long bookingId, @RequestBody String resultData) {
        return bookingService.uploadResult(bookingId, resultData);
    }

    @GetMapping("/result/{bookingId}")
    public LabTestBooking getBookingResult(@PathVariable Long bookingId) {
        return bookingService.getBooking(bookingId);
    }
}
