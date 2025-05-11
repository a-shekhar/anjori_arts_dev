package com.anjoriarts.service;

import com.anjoriarts.dto.ArtworkDTO;
import com.anjoriarts.dto.ArtworkResponseDTO;
import com.anjoriarts.entity.ArtworkEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ArtworksService {
    ArtworkDTO saveArtwork(ArtworkDTO dto);

    Page<ArtworkResponseDTO> getFeaturedArtworks(Pageable pageable);

    ArtworkDTO convertToDTO(ArtworkEntity artworkEntity);

    Page<ArtworkResponseDTO> getAllArtworks(Pageable pageable);
}
