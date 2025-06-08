package com.anjoriarts.dto;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class AvailabilityDTO {
    private String code;
    private String name;
}
