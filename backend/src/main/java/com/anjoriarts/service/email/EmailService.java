package com.anjoriarts.service.email;

import com.anjoriarts.dto.CustomOrderResponseDTO;
import com.anjoriarts.dto.OrderResponseDTO;

public interface EmailService {
    void sendOTP(String recipientEmail, String firstName, String term, String otp);

    void sendWelcomeEmail(String recipientEmail, String firstName);

    void sendCustomOrderArtistConfirmation(CustomOrderResponseDTO order);

    void sendCustomOrderUserConfirmation(CustomOrderResponseDTO order);

    void sendOrderArtistConfirmation(OrderResponseDTO order);

    void sendOrderUserConfirmation(OrderResponseDTO order);
}
