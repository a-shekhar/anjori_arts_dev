package com.anjoriarts.dto;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@ToString
public class ArtworkRequestDTO {
    private Long id;
    private String title;
    private String surface;
    private String size;
    private BigDecimal price;
    private String tags;
    private boolean featured;
    private String description;
    private String availability;
    private String createdAt;
    private String artistNote;
    private List<MultipartFile> imageFiles;
    private List<String> mediums;
    private List<ArtworkImagesDTO> images;
}
