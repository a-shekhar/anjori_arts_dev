package com.anjoriarts.service.email;

public interface OtpService {

     String generateOTP(String email);

     boolean verifyOtp(String email, String otp);
}
