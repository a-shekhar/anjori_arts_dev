package com.anjoriarts.controller;

import com.anjoriarts.common.CommonResponse;
import com.anjoriarts.dto.SignupDTO;
import com.anjoriarts.service.EmailService;
import com.anjoriarts.service.OtpService;
import com.anjoriarts.service.OtpServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final Logger logger = LoggerFactory.getLogger(getClass().getName());

    private final OtpService otpService;

    private final EmailService emailService;

    public AuthController(OtpServiceImpl otpService, EmailService emailService){
        this.otpService = otpService;
        this.emailService = emailService;
    }

    @PostMapping("/send-otp")
    public ResponseEntity<?> sendOtp(@RequestBody SignupDTO signupDTO){
        try {
            String generatedOtp = otpService.generateOTP(signupDTO.getEmail());

            if (generatedOtp.length() == 6) {
               // emailService.sendOTP(signupDTO.getEmail(), signupDTO.getFirstName(), "Signup", generatedOtp);
                return ResponseEntity.ok(CommonResponse.success("OTP Sent", generatedOtp));
            } else if (generatedOtp.startsWith("Please try again")) {
                return ResponseEntity.ok(CommonResponse.success("Please Try again after sometime.", generatedOtp));
            } else {
                return ResponseEntity.badRequest().body(CommonResponse.failure("Unknown OTP generation error", null));
            }

        } catch (Exception e) {
            logger.error("Failed to generate OTP", e);
            return ResponseEntity.badRequest().body(CommonResponse.failure("Internal Server Error", null));
        }
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestBody SignupDTO dto){
        try {
            boolean res = otpService.verifyOtp(dto.getEmail(), dto.getOtp());
            if(res) {
                return ResponseEntity.ok().body(CommonResponse.success("OTP verified. Redirecting you to Login..", dto.getOtp()));
            }
                return ResponseEntity.ok().body(CommonResponse.failure("OTP verification failed.", null));
        } catch (Exception e) {
            logger.error("Failed to verify OTP", e);
            return ResponseEntity.badRequest().body(CommonResponse.failure("Internal Server Error", null));
        }
    }
}
