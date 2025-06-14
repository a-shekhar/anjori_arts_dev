package com.anjoriarts.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;


@Entity
@Table(name = "order_status", schema = "orders")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@ToString
public class OrderStatusEntity {
    @Id
    private String code;

    private String name;
}
