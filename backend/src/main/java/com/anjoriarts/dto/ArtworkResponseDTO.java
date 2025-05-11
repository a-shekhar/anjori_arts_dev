package com.anjoriarts.dto;

import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@ToString
public class ArtworkResponseDTO {
    private Long id;
    private String title;
    private String medium;
    private String surface;
    private String size;
    private Double price;
    private String imageUrl;
    private List<String> tags;
    private String description;
    private String availability;
    private String createdAt;
    private String artistNote;


    public ArtworkResponseDTO(Long id, String title, String medium, String surface, String size,
                              Double price, String imageUrl, List<String> tags, String description,
                              String availability, String createdAt, String artistNote) {
        this.id = id;
        this.title = title;
        this.medium = medium;
        this.surface = surface;
        this.size = size;
        this.price = price;
        this.imageUrl = imageUrl;
        this.tags = tags;
        this.description = description;
        this.availability = availability;
        this.createdAt = createdAt;
        this.artistNote = artistNote;
    }

}
