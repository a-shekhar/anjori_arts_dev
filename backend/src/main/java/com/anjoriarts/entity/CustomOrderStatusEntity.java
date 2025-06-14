package com.anjoriarts.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;


@Entity
@Table(name = "custom_order_status", schema = "orders")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@ToString
public class CustomOrderStatusEntity {
    @Id
    private String code;

    private String name;
}
