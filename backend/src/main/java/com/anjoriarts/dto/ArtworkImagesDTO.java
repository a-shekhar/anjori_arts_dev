package com.anjoriarts.dto;

import lombok.*;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@ToString
public class ArtworkImagesDTO {
    private Long id;
    private Long artworkId;
    private String imageUrl;
    private int displayOrder;
}
