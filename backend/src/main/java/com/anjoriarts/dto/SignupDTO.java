package com.anjoriarts.dto;

import lombok.*;

import java.math.BigInteger;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class SignupDTO {
    private String userId;
    private String firstName;
    private String lastName;
    private String email;
    private BigInteger phoneNo;
    private String userName;
    private String password;
    private String otp;
}
