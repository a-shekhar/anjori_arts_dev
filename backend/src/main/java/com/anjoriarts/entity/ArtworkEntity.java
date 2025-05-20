package com.anjoriarts.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.List;


@Entity
@Table(name = "artworks")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@ToString
public class ArtworkEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "size")
    private String size;

    @Column(name = "medium")
    private String medium;

    @Column(name = "surface")
    private String surface;

    @Column(name = "price")
    private BigDecimal price;

    @Column(name = "slug")
    private String slug;

    @Column(name = "featured")
    private boolean featured;
    @Column(name = "tags")
    private String tags;

    @Column(name = "availability")
    private String availability;

    @Column(name = "description")
    private String description;

    @Column(name = "artist_note")
    private String artistNote;

    @Column(name = "created_at")
    private ZonedDateTime createdAt;

    @OneToMany(mappedBy = "artwork", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<ArtworkImagesEntity> artworkImages;
}
