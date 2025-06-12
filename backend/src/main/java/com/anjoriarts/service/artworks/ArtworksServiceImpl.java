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
import java.util.stream.Collectors;

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
    public ArtworkCreateRequestDTO saveArtwork(ArtworkCreateRequestDTO dto){
        try {
            ZonedDateTime istNow = ZonedDateTime.now(ZoneId.of(Consonants.ZONE_ID));

            String slug = this.generateSlug(dto.getTitle());

            ArtworkEntity artwork =  ArtworkEntity.builder()
                    .title(dto.getTitle().trim())
                    .size(dto.getSize())
                    .price(dto.getPrice())
                    .tags(dto.getTags())
                    .surface(this.getSurface(dto.getSurface()))
                    .medium(this.getMediumEntities(dto.getMediums()))
                    .availability(this.getAvailability(dto.getAvailability()))
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
    public ArtworkUpdateRequestDTO updateArtwork(
            Long id,
            ArtworkUpdateRequestDTO dto,
            List<MultipartFile> imageFiles,
            List<ImageMetaDTO> imageMetas
    ) {
        try {
            Optional<ArtworkEntity> artworkOpt = artworkRepository.findById(id);
            if (artworkOpt.isEmpty()) {
                throw new RuntimeException("Artwork not found.");
            }

            ArtworkEntity artwork = artworkOpt.get();

            if (!artwork.getTitle().equalsIgnoreCase(dto.getTitle().trim())) {
                artwork.setSlug(this.generateSlug(dto.getTitle()).trim());
            }

            artwork.setTitle(dto.getTitle().trim());
            artwork.setSize(dto.getSize());
            artwork.setPrice(dto.getPrice());
            artwork.setTags(dto.getTags());
            artwork.setMedium(this.getMediumEntities(dto.getMediums()));
            artwork.setSurface(this.getSurface(dto.getSurface()));
            artwork.setAvailability(this.getAvailability(dto.getAvailability()));
            artwork.setFeatured(dto.isFeatured());
            artwork.setDescription(dto.getDescription());
            artwork.setArtistNote(dto.getArtistNote());

            artwork.setUpdatedAt(ZonedDateTime.now(ZoneId.of(Consonants.ZONE_ID)));

            String folderPath = String.format(Consonants.ARTWORKS_PATH, env, artwork.getSlug());

            // 🔁 STEP 1: Delete removed images (not in dto.images)
            List<Long> retainedIds = dto.getImages() != null
                    ? dto.getImages().stream()
                    .map(ArtworkImagesDTO::getId)
                    .collect(Collectors.toList())
                    : new ArrayList<>();

            List<ArtworkImagesEntity> toDelete = artwork.getArtworkImages().stream()
                    .filter(img -> !retainedIds.contains(img.getId()))
                    .collect(Collectors.toList());

            for (ArtworkImagesEntity img : toDelete) {
                cloudinaryService.deleteImage(img.getImageUrl());
            }

            // 🔄 STEP 2: Build the updated image list
            List<ArtworkImagesEntity> updatedImages = new ArrayList<>();

            // ✅ 2A: Update existing images (from dto.getImages)
            if (dto.getImages() != null && !dto.getImages().isEmpty()) {
                for (ArtworkImagesDTO imgDto : dto.getImages()) {
                    ArtworkImagesEntity existing = artwork.getArtworkImages().stream()
                            .filter(i -> i.getId().equals(imgDto.getId()))
                            .findFirst()
                            .orElse(null);

                    if (existing != null) {
                        existing.setDisplayOrder(imgDto.getDisplayOrder());
                        updatedImages.add(existing);
                    }
                }
            }

            // ✅ 2B: Upload new images using matched displayOrder
            if (imageFiles != null && ! imageFiles.isEmpty()) {
                for (MultipartFile file : imageFiles) {
                    String imageUrl = cloudinaryService.upload(file, folderPath);

                    ImageMetaDTO meta = imageMetas.stream()
                            .filter(m -> m.getFileName().equals(file.getOriginalFilename()))
                            .findFirst()
                            .orElse(new ImageMetaDTO(file.getOriginalFilename(), 0)); // fallback

                    ArtworkImagesEntity newImage = ArtworkImagesEntity.builder()
                            .artwork(artwork)
                            .imageUrl(imageUrl)
                            .displayOrder(meta.getDisplayOrder())
                            .build();

                    updatedImages.add(newImage);
                }
            }

            // 🔁 STEP 3: Apply image list
            artwork.getArtworkImages().clear();
            artwork.getArtworkImages().addAll(updatedImages);

            // 💾 STEP 4: Save artwork
            ArtworkEntity savedArtwork = artworkRepository.save(artwork);
            dto.setId(savedArtwork.getId());

            logger.info("Artwork updated successfully...");

            return dto;

        } catch (Exception e) {
            throw new RuntimeException("Error updating artwork: " + e.getMessage(), e);
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


    private List<MediumEntity> getMediumEntities (List<String> mediums) {
        List<MediumEntity> mediumEntities = new ArrayList<>();
        for (String medium : mediums) {
            Optional<MediumEntity> mediumOpt = this.mediumRepo.findByCode(medium);
            MediumEntity mediumEnt = null;
            if (mediumOpt.isPresent()) {
                mediumEnt = mediumOpt.get();
            }
            mediumEntities.add(mediumEnt);
        }
      return mediumEntities;
    }


    private SurfaceEntity getSurface(String surfaceCode){
        Optional<SurfaceEntity> surfaceOpt = this.surfaceRepo.findByCode(surfaceCode);
        SurfaceEntity surface = null;
        if(surfaceOpt.isPresent()){
            surface = surfaceOpt.get();
        }
        return surface;
    }

    private AvailabilityEntity getAvailability(String availabilityCode){
        Optional<AvailabilityEntity> availabilityOpt = this.availabilityRepo.findByCode(availabilityCode);
        AvailabilityEntity availability = null;
        if(availabilityOpt.isPresent()){
            availability = availabilityOpt.get();
        }
        return availability;
    }

    @Override
    @Transactional
    public void deleteArtwork(Long artworkId){
        try {
            if (artworkId == null){
                throw new RuntimeException("Artwork Id is invalid " + null);
            }

            Optional<ArtworkEntity> artworkOpt = artworkRepository.findById(artworkId);
            if(artworkOpt.isEmpty()){
                throw new RuntimeException("Artwork with id " + artworkId + " not found...");
            }
            artworkRepository.deleteById(artworkId);
            String folderPath = String.format(Consonants.ARTWORKS_PATH, env, artworkOpt.get().getSlug());
            cloudinaryService.deleteFolder(folderPath);
            logger.info("Artwork deleted successfully...");
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}


