package com.anjoriarts.service;

import com.anjoriarts.dto.ArtworkDTO;
import com.anjoriarts.entity.ArtworkEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ArtworksService {
    ArtworkDTO saveArtwork(ArtworkDTO dto);

    List<ArtworkDTO> getFeaturedArtworks();

    ArtworkDTO convertToDTO(ArtworkEntity artworkEntity);
}
