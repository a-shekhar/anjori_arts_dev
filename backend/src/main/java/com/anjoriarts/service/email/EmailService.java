package com.anjoriarts.service.email;

import com.anjoriarts.dto.CustomOrderResponseDTO;

public interface EmailService {
    void sendOTP(String recipientEmail, String firstName, String term, String otp);

    void sendWelcomeEmail(String recipientEmail, String firstName);

    void sendCustomOrderArtistConfirmation(CustomOrderResponseDTO order);

    void sendCustomOrderUserConfirmation(CustomOrderResponseDTO order);
}
