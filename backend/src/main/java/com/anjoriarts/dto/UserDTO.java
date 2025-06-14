package com.anjoriarts.dto;

import lombok.*;

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
    private String phoneNo;
    private String username;
    private String password;
    private String profileImageUrl;
    private String role;
}
