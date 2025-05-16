package com.anjoriarts.dto;

import lombok.*;

import java.math.BigInteger;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class SignupDTO {
    private Long userId;
    private String firstName;
    private String lastName;
    private String email;
    private BigInteger phoneNo;
    private String username;
    private String password;
    private String otp;
}
