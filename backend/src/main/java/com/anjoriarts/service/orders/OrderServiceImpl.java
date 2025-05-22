package com.anjoriarts.service.orders;


import com.anjoriarts.common.Consonants;
import com.anjoriarts.dto.OrderRequestDTO;
import com.anjoriarts.dto.OrderResponseDTO;
import com.anjoriarts.entity.ArtworkEntity;
import com.anjoriarts.entity.OrderEntity;
import com.anjoriarts.entity.UserEntity;
import com.anjoriarts.repository.ArtworkRepository;
import com.anjoriarts.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Optional;

@Service
public class OrderServiceImpl implements OrderService{

    Logger logger = LoggerFactory.getLogger(getClass().getName());

    private final OrderRepository orderRepository;
    private final ArtworkRepository artworkRepository;
    private final UserRepository userRepository;

    public OrderServiceImpl(OrderRepository orderRepository,
                            ArtworkRepository artworkRepository,
                            UserRepository userRepository){
        this.orderRepository = orderRepository;
        this.artworkRepository = artworkRepository;
        this.userRepository = userRepository;
    }


    @Override
    public OrderResponseDTO saveOrderDetails(OrderRequestDTO dto) {
        try{
            // fetch the artwork
            Optional<ArtworkEntity> artworkOpt = artworkRepository.findById(dto.getArtworkId());

            if(artworkOpt.isEmpty()){
                logger.error("Artwork with id " + dto.getArtworkId() + " not found..");
                return null;
            }

            ArtworkEntity artwork = artworkOpt.get();

            // fetch the user
            UserEntity user = null;
            if(dto.getUserId() != null){
                Optional<UserEntity> optUser = this.userRepository.findByUserId(dto.getUserId());
                if(optUser.isEmpty()){
                    throw new UsernameNotFoundException("User with Id " + dto.getUserId() + " not found..");
                }
                user = optUser.get();
            }

            ZonedDateTime timeNow = ZonedDateTime.now(ZoneId.of(Consonants.ZONE_ID));
            String status = Consonants.ORDER_INITIAL_STATE;

            OrderEntity order = OrderEntity.builder()
                    .artwork(artwork)
                    .user(user)
                    .firstName(dto.getFirstName())
                    .lastName(dto.getLastName())
                    .email(dto.getEmail())
                    .countryCode(dto.getCountryCode())
                    .phoneNo(dto.getPhoneNo())
                    .status(status)
                    .createdAt(timeNow)
                    .build();

            OrderEntity savedOrder = orderRepository.save(order);

            return  this.convertToDto(savedOrder, artwork);

        } catch (Exception e) {
            logger.error("Error saving order details " + e.getMessage());
            throw e;
        }
    }

    private OrderResponseDTO convertToDto(OrderEntity order, ArtworkEntity artwork) {
        return OrderResponseDTO.builder()
                .id(order.getId())
                .artworkId(artwork.getId())
                .firstName(order.getFirstName())
                .lastName(order.getLastName())
                .email(order.getEmail())
                .countryCode(order.getCountryCode())
                .phoneNo(order.getPhoneNo())
                .status(order.getStatus())
                .createdAt(order.getCreatedAt())
                .artworkTitle(artwork.getTitle())
                .build();
    }
}
