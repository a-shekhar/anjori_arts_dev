package com.anjoriarts.service.artworks;

import com.anjoriarts.common.Consonants;
import com.anjoriarts.dto.*;
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

            ArtworkEntity artwork =  ArtworkEntity.builder()
                    .title(dto.getTitle().trim())
                    .size(dto.getSize())
                    .price(dto.getPrice())
                    .tags(dto.getTags())
                    .surface(this.getSurface(dto))
                    .medium(this.getMediumEntities(dto))
                    .availability(this.getAvailability(dto))
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


    @Override
    @Transactional
    public ArtworkRequestDTO updateArtwork(Long id, ArtworkRequestDTO dto){
        try {
            Optional<ArtworkEntity> artworkOpt = artworkRepository.findById(id);
            if(artworkOpt.isEmpty()){
                throw new RuntimeException("Artwork not found..");
            }
            ArtworkEntity artwork = artworkOpt.get();

            if(!artwork.getTitle().equalsIgnoreCase(dto.getTitle().trim())){
                artwork.setSlug(this.generateSlug(dto.getTitle()).trim());
            }

            artwork.setTitle(dto.getTitle().trim());
            artwork.setSize(dto.getSize());
            artwork.setPrice(dto.getPrice());
            artwork.setTags(dto.getTags());
            artwork.setMedium(this.getMediumEntities(dto));
            artwork.setSurface(this.getSurface(dto));
            artwork.setAvailability(this.getAvailability(dto));
            artwork.setFeatured(dto.isFeatured());
            artwork.setDescription(dto.getDescription());
            artwork.setArtistNote(dto.getArtistNote());

            ZonedDateTime istNow = ZonedDateTime.now(ZoneId.of(Consonants.ZONE_ID));
            artwork.setUpdatedAt(istNow);

            String folderPath = String.format(Consonants.ARTWORKS_PATH, env, artwork.getSlug());

            // 🔄 Prepare updated image list
            List<ArtworkImagesEntity> updatedImages = new ArrayList<>();

            // ✅ 1. Preserve existing image entries (with updated displayOrder from dto.getImages())
            if (dto.getImages() != null && !dto.getImages().isEmpty()) {
                for (ArtworkImagesDTO img : dto.getImages()) {
                    ArtworkImagesEntity existing = artwork.getArtworkImages().stream()
                            .filter(i -> i.getId().equals(img.getId()))
                            .findFirst()
                            .orElse(null);

                    if (existing != null) {
                        existing.setDisplayOrder(img.getDisplayOrder());
                        updatedImages.add(existing);
                    }
                }
            }

            // ✅ 2. Upload new images (assign displayOrder based on index or custom logic)
            if (dto.getImageFiles() != null && !dto.getImageFiles().isEmpty()) {
                int nextDisplayOrder = updatedImages.stream()
                        .map(ArtworkImagesEntity::getDisplayOrder)
                        .max(Integer::compareTo)
                        .orElse(-1) + 1;

                for (MultipartFile file : dto.getImageFiles()) {
                    String imageUrl = cloudinaryService.upload(file, folderPath);

                    ArtworkImagesEntity newImage = ArtworkImagesEntity.builder()
                            .artwork(artwork)
                            .imageUrl(imageUrl)
                            .displayOrder(nextDisplayOrder++)
                            .build();

                    updatedImages.add(newImage);
                }
            }

            // 🔄 Set updated image list (preserved + new)
            artwork.getArtworkImages().clear();
            artwork.getArtworkImages().addAll(updatedImages); // Add updated list to same reference

            // 💾 Save the updated artwork
            ArtworkEntity savedArtwork = artworkRepository.save(artwork);

            dto.setId(savedArtwork.getId());

            return dto;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    @Transactional
    public Page<ArtworkResponseDTO> searchArtworks(ArtworkSearchRequest request, Pageable pageable) {
        Page<ArtworkEntity> page = null;
        if(request.getSearchBy().equalsIgnoreCase("Title")) {
            page = artworkRepository.findByTitleContainingIgnoreCase(request.getSearchTerm(), pageable);
        }
        // Convert each entity to DTO using map
        return page != null ? page.map(this::convertToResponseDto) : null;
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
    @Transactional
    public Page<ArtworkResponseDTO> getFeaturedArtworks(Pageable pageable) {
        Page<ArtworkEntity> entities = artworkRepository.findByFeaturedTrueOrderByCreatedAtDesc(pageable);
        return entities.map(this::convertToResponseDto);
    }


    @Override
    @Transactional
    public Page<ArtworkResponseDTO> getAllArtworks(Pageable pageable) {
        Page<ArtworkEntity> page = artworkRepository.findAll(pageable);
        // Convert each entity to DTO using map
        return page.map(this::convertToResponseDto);
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
                    .displayOrder(image.getDisplayOrder())
                    .build();

            imagesDTO.add(imageDTO);
        }


        MediumDTO mediumDTO = new MediumDTO();
        List<MediumDTO> mediumDTOs = new ArrayList<>();
        for(MediumEntity medium : entity.getMedium()){
            mediumDTO = MediumDTO.builder().code(medium.getCode())
                    .name(medium.getName()).build();
            mediumDTOs.add(mediumDTO);
        }

        return ArtworkResponseDTO.builder()
                .id(entity.getId())
                .title(entity.getTitle())
                .slug(entity.getSlug())
                .mediums(mediumDTOs)
                .surface(SurfaceDTO.builder().code(entity.getSurface().getCode())
                        .name(entity.getSurface().getName()).build())
                .size(entity.getSize())
                .price(entity.getPrice())
                .tags(allTags)
                .description(entity.getDescription())
                .availability(AvailabilityDTO.builder().code(entity.getAvailability().getCode())
                        .name(entity.getAvailability().getName()).build())
                .artistNote(entity.getArtistNote())
                .createdAt(CommonUtil.formatToLocal(entity.getCreatedAt().toString()))
                .images(imagesDTO)
                .build();
    }





    private List<MediumEntity> getMediumEntities (ArtworkRequestDTO dto) {
        List<MediumEntity> mediumEntities = new ArrayList<>();
        for (String medium : dto.getMediums()) {
            Optional<MediumEntity> mediumOpt = this.mediumRepo.findByCode(medium);
            MediumEntity mediumEnt = null;
            if (mediumOpt.isPresent()) {
                mediumEnt = mediumOpt.get();
            }
            mediumEntities.add(mediumEnt);
        }
      return mediumEntities;
    }

    private SurfaceEntity getSurface(ArtworkRequestDTO dto){
        Optional<SurfaceEntity> surfaceOpt = this.surfaceRepo.findByCode(dto.getSurface());
        SurfaceEntity surface = null;
        if(surfaceOpt.isPresent()){
            surface = surfaceOpt.get();
        }
        return surface;
    }

    private AvailabilityEntity getAvailability(ArtworkRequestDTO dto){
        Optional<AvailabilityEntity> availabilityOpt = this.availabilityRepo.findByCode(dto.getAvailability());
        AvailabilityEntity availability = null;
        if(availabilityOpt.isPresent()){
            availability = availabilityOpt.get();
        }
        return availability;
    }


}


