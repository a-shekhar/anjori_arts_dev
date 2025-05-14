package com.anjoriarts.service.email;

public interface EmailService {
    void sendOTP(String recipientEmail, String firstName, String term, String otp);

    void sendWelcomeEmail(String recipientEmail, String firstName);
}
