package com.anjoriarts.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.ArrayList;
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

    @ManyToMany
    @JoinTable(
            name = "artwork_medium",
            joinColumns = @JoinColumn(name = "artwork_id"),
            inverseJoinColumns = @JoinColumn(name = "medium_code")
    )
    private List<MediumEntity> medium = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "surface_code", referencedColumnName = "code")
    private SurfaceEntity surface;

    @Column(name = "price")
    private BigDecimal price;

    @Column(name = "slug")
    private String slug;

    @Column(name = "featured")
    private boolean featured;

    @Column(name = "tags")
    private String tags;


    @ManyToOne
    @JoinColumn(name = "availability_code", referencedColumnName = "code")
    private AvailabilityEntity availability;

    @Column(name = "description")
    private String description;

    @Column(name = "artist_note")
    private String artistNote;

    @Column(name = "created_at")
    private ZonedDateTime createdAt;

    @OneToMany(mappedBy = "artwork", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<ArtworkImagesEntity> artworkImages;
}
