package com.anjoriarts.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class ArtworkSearchRequest {
    private String searchBy;
    private String searchTerm;
}
