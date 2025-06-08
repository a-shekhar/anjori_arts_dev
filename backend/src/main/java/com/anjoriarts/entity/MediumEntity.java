package com.anjoriarts.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Table(name = "medium")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@ToString
public class MediumEntity {
    @Id
    private String code;

    private String name;
}
