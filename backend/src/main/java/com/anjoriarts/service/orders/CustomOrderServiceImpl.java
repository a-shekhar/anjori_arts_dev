package com.anjoriarts.service.orders;

import com.anjoriarts.common.Consonants;
import com.anjoriarts.dto.CustomOrderRequestDTO;
import com.anjoriarts.dto.CustomOrderResponseDTO;
import com.anjoriarts.entity.CustomOrderEntity;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.ZoneId;
import java.time.ZonedDateTime;

@Service
public class CustomOrderServiceImpl implements CustomOrderService{

    Logger logger = LoggerFactory.getLogger(getClass().getName());

    private final CustomOrderRepository customOrderRepository;

    public CustomOrderServiceImpl(CustomOrderRepository customOrderRepository){
        this.customOrderRepository = customOrderRepository;
    }


    @Override
    public CustomOrderResponseDTO saveCustomOrder(CustomOrderRequestDTO dto) {
        try {
            logger.error("Saving custom order...");

            CustomOrderEntity customOrder =
                    CustomOrderEntity.builder()
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
                        .phoneNo(entity.getPhoneNo())
                        .artType(entity.getArtType())
                        .surface(entity.getSurface())
                        .medium(entity.getMedium())
                        .budget(entity.getBudget())
                        .preferredSize(entity.getPreferredSize())
                        .noOfCopies(entity.getNoOfCopies())
                        .additionalNotes(entity.getAdditionalNotes())
                        .build();
    }
}
