package com.anjoriarts.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Table(name = "art_type")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@ToString
public class ArtTypeEntity {
    @Id
    private String code;

    private String name;
}
