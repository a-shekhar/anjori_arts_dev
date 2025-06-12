package com.anjoriarts.service.artworks;

import com.anjoriarts.dto.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ArtworksService {

    ArtworkCreateRequestDTO saveArtwork(ArtworkCreateRequestDTO dto);

    ArtworkUpdateRequestDTO updateArtwork(Long id, ArtworkUpdateRequestDTO dto,  List<MultipartFile> imageFiles,
                                          List<ImageMetaDTO> imageMetas);

    Page<ArtworkResponseDTO> searchArtworks(ArtworkSearchRequest request, Pageable pageable);

    Page<ArtworkResponseDTO> getFeaturedArtworks(Pageable pageable);

    Page<ArtworkResponseDTO> getAllArtworks(Pageable pageable);

    void deleteArtwork(Long id);

 }
