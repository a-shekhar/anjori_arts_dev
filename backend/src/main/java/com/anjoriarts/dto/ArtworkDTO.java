package com.anjoriarts.dto;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class ArtworkDTO {
    private Long id;
    private String title;
    private String size;
    private String medium;
    private String surface;
    private Double price;
    private String tags;
    private String slug;
    private boolean available;
    private boolean featured;


    // Uploaded images (optional, used for POST/upload only)
    private List<MultipartFile> imageFiles;

    public ArtworkDTO(String title, String size, String medium, String surface,
                      Double price, String tags, boolean available, boolean featured,
                      List<MultipartFile> imageFiles) {
        this.title = title;
        this.size = size;
        this.medium = medium;
        this.surface = surface;
        this.price = price;
        this.tags = tags;
        this.available = available;
        this.featured = featured;
        this.imageFiles = imageFiles;
    }
}
