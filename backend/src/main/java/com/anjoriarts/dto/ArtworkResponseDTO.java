package com.anjoriarts.dto;

import lombok.*;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@ToString
public class ArtworkResponseDTO {
    private Long id;
    private String title;
    private String slug;
    private String medium;
    private String surface;
    private String size;
    private Double price;
    private List<String> tags;
    private String description;
    private String availability;
    private String createdAt;
    private String artistNote;
    private List<ArtworkImagesDTO> images;
}
