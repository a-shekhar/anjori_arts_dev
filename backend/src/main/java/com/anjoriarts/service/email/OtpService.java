package com.anjoriarts.service.email;

public interface OtpService {

     String generateOTP(String email, String term);

     boolean verifyOtp(String email, String otp);
}
