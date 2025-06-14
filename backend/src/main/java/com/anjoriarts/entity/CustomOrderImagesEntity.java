package com.anjoriarts.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "custom_order_images", schema = "orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class CustomOrderImagesEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "custom_order_id", nullable = false)
    private CustomOrderEntity customOrder;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "display_order")
    private int displayOrder;

}
