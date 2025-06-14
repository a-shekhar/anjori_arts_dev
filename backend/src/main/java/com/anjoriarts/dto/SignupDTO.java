package com.anjoriarts.dto;

import lombok.*;


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
    private String phoneNo;
    private String username;
    private String password;
    private String otp;
}
