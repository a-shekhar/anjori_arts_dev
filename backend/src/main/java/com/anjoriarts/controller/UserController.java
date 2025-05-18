package com.anjoriarts.controller;

import com.anjoriarts.common.CommonResponse;
import com.anjoriarts.common.Consonants;
import com.anjoriarts.dto.UserDTO;
import com.anjoriarts.service.user.UserService;
import jakarta.servlet.http.HttpSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;

@RestController
@RequestMapping("/api/user")
public class UserController {

    Logger logger = LoggerFactory.getLogger(getClass().getName());
    private final UserService userService;

    public UserController(UserService userService){
        this.userService = userService;
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getUserProfile(Principal principal) {
        try {
            if (principal == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(CommonResponse.failure("User not found!!!", null));
            }
            UserDTO userDTO = userService.fetchAndConvertToUserDto(principal.getName());
           if(userDTO == null){
               return ResponseEntity.ok().body(CommonResponse.failure("User not found!!!", null));
           }
            return ResponseEntity.ok().body(CommonResponse.success("User profile loaded", userDTO));
        } catch (Exception e) {
            logger.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(CommonResponse.failure("User not found!!!", null));
        }
    }


    @PutMapping("/profile")
    public ResponseEntity<?> updateUserProfile(@RequestPart("profile") UserDTO userDTO,
                                               @RequestPart(value = "profileImage", required = false) MultipartFile profileImage,
                                               Principal principal) {
        try {
            if (principal == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(CommonResponse.failure("User not found!!!", null));
            }
            userDTO = userService.updateUserProfile(principal, userDTO, profileImage);
            return ResponseEntity.ok().body(CommonResponse.success("User profile updated", userDTO));
        } catch (Exception e) {
            logger.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(CommonResponse.failure(Consonants.INTERNAL_SERVER_ERROR, null));
        }
    }
}
