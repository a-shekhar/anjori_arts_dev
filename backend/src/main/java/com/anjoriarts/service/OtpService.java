package com.anjoriarts.service;

public interface OtpService {

     String generateOTP(String email);

     boolean verifyOtp(String email, String otp);
}
