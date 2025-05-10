package com.anjoriarts.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface CloudinaryService {
    String upload(MultipartFile file, String folder);
}
