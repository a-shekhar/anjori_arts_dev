package com.anjoriarts.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CustomOrderRequestDTO {
    private String firstName;
    private String lastName;
    private String email;
    private String countryCode;
    private String phoneNo;
    private String artType;
    private String surface;
    private List<String> mediums;
    private String budget;
    private String preferredSize;
    private String noOfCopies;
    private String additionalNotes;
    private boolean suggestOptions;
    private Long userId;
}
