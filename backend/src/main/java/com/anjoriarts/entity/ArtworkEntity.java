package com.anjoriarts.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.ZonedDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Entity
@Table(name = "artworks")
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
    private Double price;
    @Column(name = "slug")
    private String slug;

    @Column(name = "featured")
    private boolean featured;
    @Column(name = "tags")
    private String tags;
//    @OneToMany(mappedBy = "artwork", cascade = CascadeType.ALL, orphanRemoval = true)
//    private ArtworkImagesEntity artworkImages;
    @Column(name = "availability")
    private String availability;

    @Column(name = "description")
    private String description;

    @Column(name = "artist_note")
    private String artistNote;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "created_at")
    private ZonedDateTime createdAt;
}
