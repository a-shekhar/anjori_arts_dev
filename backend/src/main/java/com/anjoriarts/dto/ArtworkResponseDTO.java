package com.anjoriarts.dto;

import lombok.*;

import java.math.BigDecimal;
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
    private List<MediumDTO> mediums;
    private SurfaceDTO surface;
    private String size;
    private BigDecimal price;
    private List<String> tags;
    private String description;
    private AvailabilityDTO availability;
    private String createdAt;
    private String artistNote;
    private List<ArtworkImagesDTO> images;
}
