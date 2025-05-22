package com.anjoriarts.service.orders;

import com.anjoriarts.common.Consonants;
import com.anjoriarts.dto.CustomOrderRequestDTO;
import com.anjoriarts.dto.CustomOrderResponseDTO;
import com.anjoriarts.entity.CustomOrderEntity;
import com.anjoriarts.entity.CustomOrderImagesEntity;
import com.anjoriarts.entity.UserEntity;
import com.anjoriarts.repository.UserRepository;
import com.anjoriarts.service.CloudinaryService;
import com.anjoriarts.service.CloudinaryServiceImpl;
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

    private final CustomOrderRepository customOrderRepository;
    private final CloudinaryService cloudinaryService;
    private final UserRepository userRepository;


    public CustomOrderServiceImpl(CustomOrderRepository customOrderRepository,
                                  CloudinaryService cloudinaryService,
                                  UserRepository userRepository){
        this.customOrderRepository = customOrderRepository;
        this.cloudinaryService = cloudinaryService;
        this.userRepository = userRepository;
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

            CustomOrderEntity customOrder =
                    CustomOrderEntity.builder()
                            .user(user)
                            .firstName(dto.getFirstName())
                            .lastName(dto.getLastName())
                            .email(dto.getEmail())
                            .countryCode(dto.getCountryCode())
                            .phoneNo(dto.getPhoneNo())
                            .artType(dto.getArtType())
                            .surface(dto.getSurface())
                            .medium(dto.getMedium())
                            .budget(dto.getBudget())
                            .preferredSize(dto.getPreferredSize())
                            .noOfCopies(dto.getNoOfCopies())
                            .additionalNotes(dto.getAdditionalNotes())
                            .status(Consonants.ORDER_INITIAL_STATE)
                            .createdAt(ZonedDateTime.now(ZoneId.of(Consonants.ZONE_ID)))
                            .build();

            CustomOrderEntity savedCustomOrder = this.customOrderRepository.save(customOrder);
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
                customOrderRepository.save(savedCustomOrder);
            }

            logger.info("Saved custom order images with id {}", savedCustomOrder.getId());
            return this.convertToCustomOrderResponseDTO(savedCustomOrder);

        } catch (Exception e) {
            logger.error("Error while saving Custom Order..", e);
            throw e;
        }
    }

    private CustomOrderResponseDTO convertToCustomOrderResponseDTO(CustomOrderEntity entity) {
        return CustomOrderResponseDTO.builder()
                        .customOrderId(entity.getId())
                        .firstName(entity.getFirstName())
                        .lastName(entity.getLastName())
                        .email(entity.getEmail())
                        .countryCode(entity.getCountryCode())
                        .phoneNo(entity.getPhoneNo())
                        .artType(entity.getArtType())
                        .suggestOptions(entity.isSuggestOptions())
                        .surface(entity.getSurface())
                        .medium(entity.getMedium())
                        .budget(entity.getBudget())
                        .preferredSize(entity.getPreferredSize())
                        .noOfCopies(entity.getNoOfCopies())
                        .additionalNotes(entity.getAdditionalNotes())
                        .imageCount(entity.getImages() != null ? entity.getImages().size() : 0)
                        .build();
    }
}
