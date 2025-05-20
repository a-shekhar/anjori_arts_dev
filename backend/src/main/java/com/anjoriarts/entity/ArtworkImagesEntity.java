package com.anjoriarts.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity(name = "artwork_images")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@ToString
public class ArtworkImagesEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "artwork_id", referencedColumnName = "id", nullable = false)
    private ArtworkEntity artwork;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "alt_text")
    private String altText;

    @Column(name = "display_order")
    private int displayOrder;

    @Column(name = "is_main")
    private boolean main;
}
