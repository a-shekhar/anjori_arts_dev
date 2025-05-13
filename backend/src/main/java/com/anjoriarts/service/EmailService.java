package com.anjoriarts.service;

public interface EmailService {
    void sendOTP(String recipientEmail, String firstName, String term, String otp);

    void sendWelcomeEmail(String recipientEmail, String firstName);
}
