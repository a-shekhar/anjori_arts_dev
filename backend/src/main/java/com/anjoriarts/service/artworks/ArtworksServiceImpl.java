package com.anjoriarts.service.artworks;

import com.anjoriarts.common.Consonants;
import com.anjoriarts.dto.ArtworkImagesDTO;
import com.anjoriarts.dto.ArtworkRequestDTO;
import com.anjoriarts.dto.ArtworkResponseDTO;
import com.anjoriarts.dto.ArtworkSearchRequest;
import com.anjoriarts.entity.*;
import com.anjoriarts.repository.ArtworkRepository;
import com.anjoriarts.repository.AvailabilityRepository;
import com.anjoriarts.repository.MediumRepository;
import com.anjoriarts.repository.SurfaceRepository;
import com.anjoriarts.service.CloudinaryServiceImpl;
import com.anjoriarts.util.CommonUtil;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class ArtworksServiceImpl implements ArtworksService{

    Logger logger = LoggerFactory.getLogger(getClass().getName());


    private final ArtworkRepository artworkRepository;
    private final SurfaceRepository surfaceRepo;
    private final MediumRepository mediumRepo;
    private final AvailabilityRepository availabilityRepo;
    private final CloudinaryServiceImpl cloudinaryService;


    public ArtworksServiceImpl(ArtworkRepository artworkRepository,
                               SurfaceRepository surfaceRepo,
                               MediumRepository mediumRepo,
                               AvailabilityRepository availabilityRepo,
                               CloudinaryServiceImpl cloudinaryService){
        this.artworkRepository = artworkRepository;
        this.surfaceRepo = surfaceRepo;
        this.mediumRepo = mediumRepo;
        this.availabilityRepo = availabilityRepo;
        this.cloudinaryService = cloudinaryService;
    }

    @Value("${spring.application.env}")
    private String env;

    @Override
    @Transactional
    public ArtworkRequestDTO saveArtwork(ArtworkRequestDTO dto){
        try {
            ZonedDateTime istNow = ZonedDateTime.now(ZoneId.of(Consonants.ZONE_ID));

            String slug = this.generateSlug(dto.getTitle());
            Optional<SurfaceEntity> surfaceOpt = this.surfaceRepo.findByCode(dto.getSurface());
            SurfaceEntity surface = null;
            if(surfaceOpt.isPresent()){
                surface = surfaceOpt.get();
            }

            Optional<AvailabilityEntity> availabilityOpt = this.availabilityRepo.findByCode(dto.getAvailability());
            AvailabilityEntity availability = null;
            if(availabilityOpt.isPresent()){
                availability = availabilityOpt.get();
            }

            List<MediumEntity> mediumEntities = new ArrayList<>();
            for(String medium : dto.getMediums()){
                Optional<MediumEntity> mediumOpt = this.mediumRepo.findByCode(medium);
                MediumEntity mediumEnt = null;
                if(mediumOpt.isPresent()){
                    mediumEnt = mediumOpt.get();
                }
                mediumEntities.add(mediumEnt);
            }

            ArtworkEntity artwork =  ArtworkEntity.builder()
                    .title(dto.getTitle())
                    .size(dto.getSize())
                    .price(dto.getPrice())
                    .tags(dto.getTags())
                    .surface(surface)
                    .medium(mediumEntities)
                    .availability(availability)
                    .slug(slug)
                    .featured(dto.isFeatured())
                    .description(dto.getDescription())
                    .artistNote(dto.getArtistNote())
                    .createdAt(istNow)
                    .build();


            // Support for multiple images
            List<ArtworkImagesEntity> imagesEntities = new ArrayList<>();
            // upload image to cloudinary
            String folderPath = String.format(Consonants.ARTWORKS_PATH, env, artwork.getSlug());
            int displayOrder = 0;

            if(dto.getImageFiles() != null && !dto.getImageFiles().isEmpty()){
                for(MultipartFile image : dto.getImageFiles()) {
                    String imageUrl = cloudinaryService.upload(image, folderPath);
                    ArtworkImagesEntity imagesEntity = ArtworkImagesEntity.builder()
                            .artwork(artwork)
                            .imageUrl(imageUrl)
                            .displayOrder(displayOrder++)
                            .build();
                    imagesEntities.add(imagesEntity);
                }
                artwork.setArtworkImages(imagesEntities);
            }
            ArtworkEntity savedArtwork = artworkRepository.save(artwork);
            dto.setId(savedArtwork.getId());
            logger.info("Artwork saved successfully...");
        }catch (Exception e){
            logger.error("Failed saving Artwork", e);
            throw e;
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

    @Override
    public Page<ArtworkResponseDTO> searchArtworks(ArtworkSearchRequest request, Pageable pageable) {
        Page<ArtworkEntity> page = null;
        if(request.getSearchBy().equalsIgnoreCase("Title")) {
            page = artworkRepository.findByTitleContainingIgnoreCase(request.getSearchTerm(), pageable);
        }
        // Convert each entity to DTO using map
        return page != null ? page.map(this::convertToResponseDto) : null;
    }

    private ArtworkResponseDTO convertToResponseDto(ArtworkEntity entity) {
        String[] tags = entity.getTags().split(",");
        List<String> allTags = Arrays.stream(tags).toList();

        List<ArtworkImagesDTO> imagesDTO = new ArrayList<>();

        for(ArtworkImagesEntity image : entity.getArtworkImages()){
            ArtworkImagesDTO imageDTO = ArtworkImagesDTO
                    .builder()
                    .id(image.getId())
                    .artworkId(entity.getId())
                    .imageUrl(image.getImageUrl())
                    //.altText(image.getAltText())
                    .displayOrder(image.getDisplayOrder())
                   // .main(image.isMain())
                    .build();

            imagesDTO.add(imageDTO);
        }


        return ArtworkResponseDTO.builder()
                .id(entity.getId())
                .title(entity.getTitle())
                .slug(entity.getSlug())
                .medium(CommonUtil.normalizeString(entity.getMedium().stream()
                        .map(MediumEntity::getName)
                        .toList()))
//                .surface(entity.getSurface().stream()
//                        .map(MediumEntity::getName)
//                        .toList())
                .size(entity.getSize())
                .price(entity.getPrice())
                .tags(allTags)
                .description(entity.getDescription())
//                .availability(entity.getAvailability())
                .artistNote(entity.getArtistNote())
                .createdAt(CommonUtil.formatToLocal(entity.getCreatedAt().toString()))
                .images(imagesDTO)
                .build();
    }

}


