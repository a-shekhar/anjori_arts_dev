package com.anjoriarts.service;

import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

public interface CloudinaryService {
    String upload(MultipartFile file, String folder);

    String uploadImagesWithConfig(MultipartFile file, Map<String, Object> config);
}
