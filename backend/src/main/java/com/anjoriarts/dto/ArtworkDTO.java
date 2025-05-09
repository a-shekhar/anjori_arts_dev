package com.anjoriarts.dto;

import lombok.*;

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

}
