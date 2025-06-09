package com.anjoriarts.service.artworks;

import com.anjoriarts.dto.ArtworkRequestDTO;
import com.anjoriarts.dto.ArtworkResponseDTO;
import com.anjoriarts.dto.ArtworkSearchRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ArtworksService {

    ArtworkRequestDTO saveArtwork(ArtworkRequestDTO dto);

    ArtworkRequestDTO updateArtwork(Long id, ArtworkRequestDTO dto);

    Page<ArtworkResponseDTO> searchArtworks(ArtworkSearchRequest request, Pageable pageable);

    Page<ArtworkResponseDTO> getFeaturedArtworks(Pageable pageable);

    Page<ArtworkResponseDTO> getAllArtworks(Pageable pageable);

 }
