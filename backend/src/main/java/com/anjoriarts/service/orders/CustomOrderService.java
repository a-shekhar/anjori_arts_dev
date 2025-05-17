package com.anjoriarts.service.orders;

import com.anjoriarts.dto.CustomOrderRequestDTO;
import com.anjoriarts.dto.CustomOrderResponseDTO;

public interface CustomOrderService {

    CustomOrderResponseDTO saveCustomOrder(CustomOrderRequestDTO dto);
}
