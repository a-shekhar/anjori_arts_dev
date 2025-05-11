package com.anjoriarts.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@ToString
public class ArtworkRequestDTO {
    private Long id;
    private String title;
    private String medium;
    private String surface;
    private String size;
    private Double price;
    private String tags;
    private  boolean featured;
    private String description;
    private String availability;
    private String createdAt;
    private String artistNote;
    private List<MultipartFile> imageFiles;

    public ArtworkRequestDTO(String title, String size, String medium, String surface,
                             Double price, String tags, boolean featured, List<MultipartFile> imageFiles, String description, String availability, String artistNote) {
        this.title = title;
        this.size = size;
        this.medium = medium;
        this.surface = surface;
        this.price = price;
        this.tags = tags;
        this.imageFiles = imageFiles;
        this.featured = featured;
        this.description = description;
        this.availability = availability;
        this.artistNote = artistNote;
    }
}
