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
    private String paintType;
    private String surface;
    private Double price;
    private String url;
    private String slug;
    private boolean available;
    private boolean featured;
    private List<MultipartFile> images;

}
