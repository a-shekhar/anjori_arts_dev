package com.anjoriarts.controller;

import com.anjoriarts.common.CommonResponse;
import com.anjoriarts.dto.*;
import com.anjoriarts.service.*;
import com.anjoriarts.service.auth.AuthService;
import com.anjoriarts.service.email.EmailService;
import com.anjoriarts.service.email.OtpService;
import com.anjoriarts.service.email.OtpServiceImpl;
import com.anjoriarts.service.user.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final Logger logger = LoggerFactory.getLogger(getClass().getName());

    private final OtpService otpService;
    private final EmailService emailService;
    private final AuthService authService;
    private final AppStatsService appStatsService;
    private final UserService userService;

    public AuthController(OtpServiceImpl otpService, EmailService emailService,
                          AuthService authService, AppStatsService appStatsService,
                          UserService userService){
        this.otpService = otpService;
        this.emailService = emailService;
        this.authService = authService;
        this.appStatsService = appStatsService;
        this.userService = userService;
    }

    @PostMapping("/send-otp")
    public ResponseEntity<?> sendOtp(@RequestBody SignupDTO signupDTO){
        try {
            String generatedOtp = otpService.generateOTP(signupDTO.getEmail());

            if (generatedOtp.length() == 6) {
           //     emailService.sendOTP(signupDTO.getEmail(), signupDTO.getFirstName(), "Signup", generatedOtp);
                System.out.println("OTP is" + generatedOtp);
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

    @PostMapping("/resend-otp")
    public  ResponseEntity<?> resendOtp(@RequestBody SignupDTO dto){
        return this.sendOtp(dto);
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestBody SignupDTO dto){
        try {
            boolean res = otpService.verifyOtp(dto.getEmail(), dto.getOtp());
            if(res) {
                String err = this.validateUser(dto);
                if(!err.isEmpty()){
                    return ResponseEntity.ok(CommonResponse.failure(err, dto));
                }
                dto = authService.saveUser(dto);
                if(dto.getUserId() ==  null){
                    return ResponseEntity.ok(CommonResponse.failure("Signup failed. Please try again.", null));
                }
                emailService.sendWelcomeEmail(dto.getEmail(), dto.getFirstName());
                appStatsService.trackActiveUser();
                return ResponseEntity.ok().body(CommonResponse.success("OTP verified. Redirecting you to Login..", dto));
            }
                return ResponseEntity.ok().body(CommonResponse.failure("OTP verification failed.", null));
        } catch (Exception e) {
            logger.error("Failed to create user.", e);
            return ResponseEntity.badRequest().body(CommonResponse.failure("Internal Server Error", null));
        }
    }

    private String validateUser(SignupDTO dto) {
        String err ="";
        if(dto.getFirstName().trim().isEmpty() || dto.getFirstName().trim().length() < 2){
           err = "First name must be at least 2 characters";
           return err;
        }else if(dto.getLastName().trim().isEmpty() || dto.getLastName().trim().length() < 2){
            err = "Last name must be at least 2 characters";
            return err;
        } else if(dto.getEmail().trim().isEmpty()) {
            err = "Email can't be empty";
            return err;
        }else if(dto.getPassword().trim().isEmpty() || dto.getPassword().trim().length() < 6){
            err = "Password must be at least 6 characters";
            return err;
        }
        return err;
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginDTO dto, HttpServletRequest request){
        try {
            UserDTO userDTO = authService.authenticateAndLogin(dto, request);
            if(userDTO == null){
                return ResponseEntity.ok().body(CommonResponse.failure("Invalid credentials!!!", null));
            }
            return ResponseEntity.ok().body(CommonResponse.success("Login successful, Redirecting you to profile!!!", userDTO));
        } catch (Exception e) {
            logger.error("Login failed for {}  Error is", dto.getIdentifier(), e);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(CommonResponse.failure("Login failed. Please try again..", null));

        }
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody ForgotPasswordDTO dto){
        try {
            String generatedOtp = otpService.generateOTP(dto.getEmail());

            if (generatedOtp.length() == 6) {
                emailService.sendOTP(dto.getEmail(), "User", "Forgot Password", generatedOtp);
                return ResponseEntity.ok().body(CommonResponse.success("Reset Email OTP sent..", dto.getEmail()));
            } else if (generatedOtp.startsWith("Please try again")) {
                return ResponseEntity.ok(CommonResponse.success("Please Try again after sometime.", generatedOtp));
            } else {
                return ResponseEntity.badRequest().body(CommonResponse.failure("Unknown OTP generation error", null));
            }
        } catch (Exception e) {
            logger.error(e.getMessage());
            return ResponseEntity.ok().body(CommonResponse.failure("Reset password failed..", null));
        }

    }


    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordDTO dto){
        try {
            boolean res = otpService.verifyOtp(dto.getEmail(), dto.getOtp());

            if (res) {
                UserDTO userDTO = userService.updatePassword(dto.getEmail(), dto.getNewPassword());
                return ResponseEntity.ok().body(CommonResponse.success("User password reset successfully..", userDTO));
            } else {
                return ResponseEntity.badRequest().body(CommonResponse.failure("OTP verification failed..", null));
            }
        } catch (UsernameNotFoundException e){
            logger.error(e.getMessage());
            return ResponseEntity.ok().body(CommonResponse.failure("Invalid credentials..", null));
        } catch (Exception e) {
            logger.error(e.getMessage());
            return ResponseEntity.ok().body(CommonResponse.failure("Reset password failed..", null));
        }

    }
}
