package com.anjoriarts.service.artworks;

import com.anjoriarts.dto.ArtworkRequestDTO;
import com.anjoriarts.dto.ArtworkResponseDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ArtworksService {

    ArtworkRequestDTO saveArtwork(ArtworkRequestDTO dto);

    Page<ArtworkResponseDTO> getFeaturedArtworks(Pageable pageable);

    Page<ArtworkResponseDTO> getAllArtworks(Pageable pageable);
}
