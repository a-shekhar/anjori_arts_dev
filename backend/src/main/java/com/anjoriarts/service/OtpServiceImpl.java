package com.anjoriarts.service;

import com.anjoriarts.common.Consonants;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class OtpServiceImpl implements OtpService{

     // thread safe map
    private final Map<String, OTPEntry> otpStore = new ConcurrentHashMap<>();

    public String generateOTP(String email){
        ZonedDateTime timeNow = ZonedDateTime.now(ZoneId.of(Consonants.ZONE_ID));
        ZonedDateTime expiresAt = ZonedDateTime.now().plusMinutes(Consonants.EXPIRATION_TIME_IN_MINUTES);
        String generatedOtp = String.valueOf(new Random().nextInt(100000, 999999));
        if(!otpStore.containsKey(email)){
            otpStore.put(email, new OTPEntry(String.valueOf(generatedOtp), timeNow, expiresAt));
        }else {
            OTPEntry otpDetails =  otpStore.get(email);
            ZonedDateTime resendTime = otpDetails.storedAt.plusMinutes(Consonants.RESEND_TIME_IN_MINUTES);
            if(timeNow.isBefore(resendTime)){
                long secondsDifference = Duration.between(timeNow, resendTime).getSeconds();
                return "Please try again after " + secondsDifference;
            }else{
                otpStore.put(email, new OTPEntry(String.valueOf(generatedOtp), timeNow, expiresAt));
            }
        }
        System.out.println("Generated otp is " + generatedOtp);
        return generatedOtp;
    }

    // class for storing expiration time
    private static class OTPEntry{
        private String otp;
        private ZonedDateTime storedAt;
        private ZonedDateTime expiresAt;
        public OTPEntry(String otp, ZonedDateTime storedAt,  ZonedDateTime expiresAt){
            this.otp = otp;
            this.storedAt = storedAt;
            this.expiresAt = expiresAt;
        }
    }
}
