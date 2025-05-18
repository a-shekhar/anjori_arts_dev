package com.anjoriarts.controller;

import com.anjoriarts.common.CommonResponse;
import com.anjoriarts.common.Consonants;
import com.anjoriarts.dto.CustomOrderRequestDTO;
import com.anjoriarts.dto.CustomOrderResponseDTO;
import com.anjoriarts.service.email.EmailService;
import com.anjoriarts.service.orders.CustomOrderService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CustomOrderController {
    Logger logger = LoggerFactory.getLogger(getClass().getName());

    private final CustomOrderService customOrderService;
    private final EmailService emailService;

    public CustomOrderController(CustomOrderService customOrderService, EmailService emailService){
        this.customOrderService = customOrderService;
        this.emailService = emailService;
    }

    @PostMapping("/custom-order")
    public ResponseEntity<?> createCustomOrder(@RequestPart("order") CustomOrderRequestDTO dto, @RequestPart(value = "images", required = false) List<MultipartFile> images){
        try {
            if(dto.isSuggestOptions()){
                dto.setSurface(null);
                dto.setMedium(null);
            }

          CustomOrderResponseDTO savedCustomOrder= this.customOrderService.saveCustomOrder(dto, images);

          if(savedCustomOrder.getCustomOrderId() == null){
                return ResponseEntity.ok().body(CommonResponse.failure("Custom Order creation failed. Please try again..", null));
            }
            // add emails to both artist and users
            this.emailService.sendCustomOrderArtistConfirmation(savedCustomOrder);
            this.emailService.sendCustomOrderUserConfirmation(savedCustomOrder);
            return ResponseEntity.ok().body(CommonResponse.success("Custom order created.", null));
        } catch (Exception e) {
            logger.error(e.getMessage());
            return ResponseEntity.ok().body(CommonResponse.failure(Consonants.INTERNAL_SERVER_ERROR, null));
        }
    }
}
