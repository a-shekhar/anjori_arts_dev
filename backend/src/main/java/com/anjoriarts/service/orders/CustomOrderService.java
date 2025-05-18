package com.anjoriarts.service.orders;

import com.anjoriarts.dto.CustomOrderRequestDTO;
import com.anjoriarts.dto.CustomOrderResponseDTO;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface CustomOrderService {

    CustomOrderResponseDTO saveCustomOrder(CustomOrderRequestDTO dto, List<MultipartFile> images);
}
