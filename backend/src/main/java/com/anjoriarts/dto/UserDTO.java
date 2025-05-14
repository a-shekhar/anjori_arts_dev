package com.anjoriarts.dto;

import lombok.*;

import java.math.BigInteger;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UserDTO {
    private Long userId;
    private String firstName;
    private String lastName;
    private String email;
    private String countryCode;
    private BigInteger phoneNo;
    private String username;
    private String password;
    private String publicImageUrl;
}
