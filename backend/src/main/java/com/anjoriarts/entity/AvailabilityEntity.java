package com.anjoriarts.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Table(name = "availability")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@ToString
public class AvailabilityEntity {
    @Id
    private String code;
    
    private String name;
}
