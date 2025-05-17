package com.anjoriarts.dto;

import lombok.*;

import java.math.BigInteger;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CustomOrderResponseDTO {
    private Long customOrderId;
    private String firstName;
    private String lastName;
    private String email;
    private String countryCode;
    private BigInteger phoneNo;
    private String artType;
    private String surface;
    private String medium;
    private String budget;
    private String preferredSize;
    private String noOfCopies;
    private String additionalNotes;
    private List<String> imagesUrls;
}
