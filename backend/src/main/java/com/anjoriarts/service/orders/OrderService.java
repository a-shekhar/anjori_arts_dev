package com.anjoriarts.service.orders;

import com.anjoriarts.dto.OrderRequestDTO;
import com.anjoriarts.dto.OrderResponseDTO;

public interface OrderService {

    OrderResponseDTO saveOrderDetails(OrderRequestDTO dto);
}
