package com.anjoriarts.controller;

import com.anjoriarts.common.CommonResponse;
import com.anjoriarts.common.Consonants;
import com.anjoriarts.dto.OrderRequestDTO;
import com.anjoriarts.dto.OrderResponseDTO;
import com.anjoriarts.service.orders.OrderService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class OrderController {

    Logger logger = LoggerFactory.getLogger(getClass().getName());

    private final OrderService orderService;

    public OrderController(OrderService orderService){
        this.orderService = orderService;
    }

    @PostMapping("/order/confirm-now")
    public ResponseEntity<?> confirmNow(@RequestBody OrderRequestDTO dto){
        try {
            OrderResponseDTO savedOrder = this.orderService.saveOrderDetails(dto);
            if(savedOrder.getId() ==  null){
                return ResponseEntity.ok().body(CommonResponse.success("Order creation failed...", null));
            }
            return ResponseEntity.ok().body(CommonResponse.success("Order created...", null));
        } catch (Exception e) {
            return ResponseEntity.ok().body(CommonResponse.failure(Consonants.INTERNAL_SERVER_ERROR, null));
        }
    }
}
