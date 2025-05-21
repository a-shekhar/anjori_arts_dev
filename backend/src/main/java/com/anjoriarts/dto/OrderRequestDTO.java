package com.anjoriarts.dto;

import lombok.*;

import java.math.BigInteger;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@ToString
public class OrderRequestDTO {
    private String firstName;
    private String lastName;
    private String email;
    private String countryCode;
    private String phoneNo;
    private Long artworkId;
    private Long userId;
}
