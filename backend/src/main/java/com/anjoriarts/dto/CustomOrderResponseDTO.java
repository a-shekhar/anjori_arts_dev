package com.anjoriarts.dto;

import lombok.*;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CustomOrderResponseDTO {
    private String customOrderId;
    private String firstName;
    private String lastName;
    private String email;
    private String countryCode;
    private String phoneNo;
    private String artType;
    private String surface;
    private List<MediumDTO> mediums;
    private String budget;
    private String preferredSize;
    private String noOfCopies;
    private String additionalNotes;
    private List<String> imagesUrls;
    private boolean suggestOptions;
    private int imageCount;
}
