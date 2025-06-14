package com.anjoriarts.service.orders;

import com.anjoriarts.common.Consonants;
import com.anjoriarts.dto.CustomOrderRequestDTO;
import com.anjoriarts.dto.CustomOrderResponseDTO;
import com.anjoriarts.dto.MediumDTO;
import com.anjoriarts.entity.*;
import com.anjoriarts.repository.ArtTypeRepository;
import com.anjoriarts.repository.OrderStatusRepository;
import com.anjoriarts.repository.SurfaceRepository;
import com.anjoriarts.repository.UserRepository;
import com.anjoriarts.service.CloudinaryService;
import com.anjoriarts.service.CloudinaryServiceImpl;
import com.anjoriarts.service.CommonServiceImpl;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CustomOrderServiceImpl implements CustomOrderService{

    Logger logger = LoggerFactory.getLogger(getClass().getName());

    private final CustomOrderRepository customOrderRepo;
    private final ArtTypeRepository artTypeRepo;
    private final SurfaceRepository surfaceRepo;
    private final OrderStatusRepository orderStatusRepo;
    private final CloudinaryService cloudinaryService;
    private final UserRepository userRepository;
    private final CommonServiceImpl commonService;



    public CustomOrderServiceImpl(CustomOrderRepository customOrderRepo,
                                  ArtTypeRepository artTypeRepo,
                                  SurfaceRepository surfaceRepo,
                                  OrderStatusRepository orderStatusRepo,
                                  CloudinaryService cloudinaryService,
                                  UserRepository userRepository, CommonServiceImpl commonService){
        this.customOrderRepo = customOrderRepo;
        this.artTypeRepo = artTypeRepo;
        this.surfaceRepo = surfaceRepo;
        this.orderStatusRepo = orderStatusRepo;
        this.cloudinaryService = cloudinaryService;
        this.userRepository = userRepository;
        this.commonService = commonService;
    }

    @Value("${spring.application.env}")
    private String env;

    @Override
    @Transactional
    public CustomOrderResponseDTO saveCustomOrder(CustomOrderRequestDTO dto, List<MultipartFile> images) {
        try {
            logger.info("Saving custom order...");

            // fetch the user
            UserEntity user = null;
            if(dto.getUserId() != null){
                Optional<UserEntity> optUser = this.userRepository.findByUserId(dto.getUserId());
                if(optUser.isEmpty()){
                    throw new UsernameNotFoundException("User with Id " + dto.getUserId() + " not found..");
                }
                user = optUser.get();
            }

            Optional<ArtTypeEntity> artTypeOpt = artTypeRepo.findByCode(dto.getArtType());
            ArtTypeEntity artType = null;
            if(artTypeOpt.isPresent()){
                artType = artTypeOpt.get();
            }

            Optional<SurfaceEntity> surfaceOpt = surfaceRepo.findByCode(dto.getSurface());
            SurfaceEntity surface = null;
            if(surfaceOpt.isPresent()){
                surface = surfaceOpt.get();
            }

            Optional<OrderStatusEntity> orderStatusOpt = orderStatusRepo.findByCode(Consonants.ORDER_INITIAL_STATE);
            OrderStatusEntity orderStatus = null;
            if(orderStatusOpt.isEmpty()){
                throw new RuntimeException("No valid order status found..");
            }
            orderStatus = orderStatusOpt.get();

            CustomOrderEntity customOrder =
                    CustomOrderEntity.builder()
                            .user(user)
                            .firstName(dto.getFirstName())
                            .lastName(dto.getLastName())
                            .email(dto.getEmail())
                            .countryCode(dto.getCountryCode())
                            .phoneNo(dto.getPhoneNo())
                            .artType(artType)
                            .surface(surface)
                            .medium(commonService.getMediumEntities(dto.getMediums()))
                            .budget(dto.getBudget())
                            .preferredSize(dto.getPreferredSize())
                            .noOfCopies(dto.getNoOfCopies())
                            .additionalNotes(dto.getAdditionalNotes())
                            .status(orderStatus)
                            .createdAt(ZonedDateTime.now(ZoneId.of(Consonants.ZONE_ID)))
                            .build();

            CustomOrderEntity savedCustomOrder = this.customOrderRepo.save(customOrder);
            logger.info("Saved custom order with id {}", savedCustomOrder.getId());

            // upload images to cloudinary
            List<CustomOrderImagesEntity> imagesEntity = new ArrayList<>();

            String folderPath = String.format(Consonants.CUSTOM_ORDERS_PATH, env, savedCustomOrder.getId());
            int displayOrder = 0;

            if(images != null && !images.isEmpty()){
                for(MultipartFile image : images){
                    String imageUrl = cloudinaryService.upload(image, folderPath);
                    CustomOrderImagesEntity imageEntity = CustomOrderImagesEntity.builder()
                            .customOrder(savedCustomOrder)
                            .imageUrl(imageUrl)
                            .displayOrder(displayOrder++)
                            .build();
                    imagesEntity.add(imageEntity);
                }

                savedCustomOrder.setImages(imagesEntity);
                customOrderRepo.save(savedCustomOrder);
            }

            logger.info("Saved custom order images with id {}", savedCustomOrder.getId());
            return this.convertToCustomOrderResponseDTO(savedCustomOrder);

        } catch (Exception e) {
            logger.error("Error while saving Custom Order..", e);
            throw e;
        }
    }

    private CustomOrderResponseDTO convertToCustomOrderResponseDTO(CustomOrderEntity entity) {
        try {
            MediumDTO mediumDTO;
            List<MediumDTO> mediumDTOs = new ArrayList<>();
            for (MediumEntity medium : entity.getMedium()) {
                mediumDTO = MediumDTO.builder().code(medium.getCode())
                        .name(medium.getName()).build();
                mediumDTOs.add(mediumDTO);
            }

            return CustomOrderResponseDTO.builder()
                    .customOrderId(entity.getId())
                    .firstName(entity.getFirstName())
                    .lastName(entity.getLastName())
                    .email(entity.getEmail())
                    .countryCode(entity.getCountryCode())
                    .phoneNo(entity.getPhoneNo())
                    .artType(entity.getArtType().getName())
                    .suggestOptions(entity.isSuggestOptions())
                    .surface(entity.getSurface().getName())
                    .mediums(mediumDTOs)
                    .budget(entity.getBudget())
                    .preferredSize(entity.getPreferredSize())
                    .noOfCopies(entity.getNoOfCopies())
                    .additionalNotes(entity.getAdditionalNotes())
                    .imageCount(entity.getImages() != null ? entity.getImages().size() : 0)
                    .build();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
