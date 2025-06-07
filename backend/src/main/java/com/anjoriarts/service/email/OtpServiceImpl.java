package com.anjoriarts.service.email;

import com.anjoriarts.common.Consonants;
import com.anjoriarts.entity.UserEntity;
import com.anjoriarts.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Map;
import java.util.Optional;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class OtpServiceImpl implements OtpService{

     // thread safe map
    private final Map<String, OTPEntry> otpStore = new ConcurrentHashMap<>();
    private final UserRepository userRepository;

    public OtpServiceImpl(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    public String generateOTP(String email, String term){
        if(!term.equalsIgnoreCase("Signup")){
            Optional<UserEntity> user = userRepository.findByEmail(email);
            if(user.isEmpty()){
                return "";
            }
        }
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

        return generatedOtp;
    }

    @Override
    public boolean verifyOtp(String email, String otp) {
        if(!otpStore.containsKey(email)){
            return false;
        }
        ZonedDateTime timeNow = ZonedDateTime.now(ZoneId.of(Consonants.ZONE_ID));
        if(timeNow.isAfter(otpStore.get(email).expiresAt)){
            return false;
        }

        return otp.equals(otpStore.get(email).otp);
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
