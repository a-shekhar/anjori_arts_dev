package com.anjoriarts.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity(name = "artwork_images")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class ArtworkImagesEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "artwork_id", referencedColumnName = "id", nullable = false)
    @ToString.Exclude  // ✅ correct — placed on field
    @EqualsAndHashCode.Exclude
    private ArtworkEntity artwork;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "display_order")
    private int displayOrder;
}
