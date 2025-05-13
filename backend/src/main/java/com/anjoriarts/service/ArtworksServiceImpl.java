package com.anjoriarts.service;

import com.anjoriarts.dto.ArtworkRequestDTO;
import com.anjoriarts.dto.ArtworkResponseDTO;
import com.anjoriarts.entity.ArtworkEntity;
import com.anjoriarts.repository.ArtworkRepository;
import com.anjoriarts.util.CommonUtil;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Arrays;
import java.util.List;

@Service
public class ArtworksServiceImpl implements ArtworksService{

    Logger logger = LoggerFactory.getLogger(getClass().getName());

    private final ArtworkRepository artworkRepository;
    private final CloudinaryServiceImpl cloudinaryService;


    public ArtworksServiceImpl(ArtworkRepository artworkRepository, CloudinaryServiceImpl cloudinaryService){
        this.artworkRepository = artworkRepository;
        this.cloudinaryService = cloudinaryService;
    }

    @Value("${spring.application.env}")
    private String env;

    @Override
    @Transactional
    public ArtworkRequestDTO saveArtwork(ArtworkRequestDTO dto){
        try {
            ArtworkEntity artwork = new ArtworkEntity();
            artwork.setTitle(dto.getTitle());
            artwork.setSize(dto.getSize());
            artwork.setMedium(dto.getMedium());
            artwork.setSurface(dto.getSurface());
            artwork.setPrice(dto.getPrice());
            artwork.setSlug(this.generateSlug(dto.getTitle()));
            artwork.setFeatured(dto.isFeatured());
            artwork.setTags(dto.getTags());
            ZonedDateTime istNow = ZonedDateTime.now(ZoneId.of("Asia/Kolkata"));
            artwork.setCreatedAt(istNow);
            // upload image to cloudinary
            String folderPath = String.format("Anjori/arts/%s/artworks/%s", env, artwork.getSlug());

            if(dto.getImageFiles() != null && !dto.getImageFiles().isEmpty())     {
                String imageUrl = cloudinaryService.upload(dto.getImageFiles().getFirst(),
                        folderPath); // Currently will support only one upload
                artwork.setImageUrl(imageUrl);
                logger.info("Generated image url is: " + imageUrl);
            }
            artwork.setDescription(dto.getDescription());
            artwork.setAvailability(dto.getAvailability());
            artwork.setArtistNote(dto.getArtistNote());

            ArtworkEntity savedArtwork = artworkRepository.save(artwork);
            dto.setId(savedArtwork.getId());
            logger.info("Artwork saved successfully...");
        }catch (Exception e){
            logger.error("Failed saving Artwork");
        }
        return dto;
    }

    private String generateSlug(String title){
        logger.info("given title is: " + title);
        String baseSlug = title.toLowerCase()
                .replaceAll("[^a-z0-9\\s]", "")   // remove special chars
                .replaceAll("\\s+", "-"); // remove spaces

        String slug = baseSlug;
        int count = 1;
        while(artworkRepository.existsBySlug(slug)){
            slug = baseSlug + "-" + (count++);
        }
        return slug;
    }

    @Override
    public Page<ArtworkResponseDTO> getFeaturedArtworks(Pageable pageable) {
        Page<ArtworkEntity> entities = artworkRepository.findByFeaturedTrueOrderByCreatedAtDesc(pageable);
        return entities.map(this::convertToResponseDto);
    }


    @Override
    public Page<ArtworkResponseDTO> getAllArtworks(Pageable pageable) {
        Page<ArtworkEntity> page = artworkRepository.findAll(pageable);

        // Convert each entity to DTO using map
        return page.map(this::convertToResponseDto);
    }

    private ArtworkResponseDTO convertToResponseDto(ArtworkEntity entity) {
        String[] tags = entity.getTags().split(",");
        List<String> allTags = Arrays.stream(tags).toList();
        return new ArtworkResponseDTO(
                entity.getId(),
                entity.getTitle(),
                entity.getMedium(),
                entity.getSurface(),
                entity.getSize(),
                entity.getPrice(),
                entity.getImageUrl(),
                allTags,
                entity.getDescription(),
                entity.getAvailability(),
                CommonUtil.formatToLocal(entity.getCreatedAt().toString()),
                entity.getArtistNote()
        );
    }

}


