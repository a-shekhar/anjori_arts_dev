package com.anjoriarts.dto;

import lombok.*;

import java.math.BigInteger;
import java.time.ZonedDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@ToString
public class OrderResponseDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String countryCode;
    private String phoneNo;
    private Long artworkId;
    private Long userId;
    private String status;
    private ZonedDateTime createdAt;
    private String artworkTitle;
}
