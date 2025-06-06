package com.anjoriarts.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
public class CloudinaryServiceImpl  implements CloudinaryService{

    Logger logger = LoggerFactory.getLogger(getClass().getName());

    private  final Cloudinary cloudinary;

    public CloudinaryServiceImpl(Cloudinary cloudinary){
        this.cloudinary = cloudinary;
    }

    @Override
    public String upload(MultipartFile file, String folder)  {
        try {
            Map uploadResult = cloudinary.uploader().upload(
                    file.getBytes(), ObjectUtils.asMap(
                            "folder", folder
                    )
            );
            logger.info("File uploaded successfully ===> " + uploadResult);
            return uploadResult.get("secure_url").toString();
        }catch (IOException e){
            logger.error("File could not be uploaded", e);
            throw new RuntimeException(e);
        }
    }

    @Override
    public String uploadImagesWithConfig(MultipartFile file, Map<String, Object> config) {
        try {
            Map uploadResult = cloudinary.uploader().upload(file.getBytes(), config);
            logger.info("File uploaded successfully ===> " + uploadResult);
            return uploadResult.get("secure_url").toString();
        }catch (IOException e){
            logger.error("File could not be uploaded", e);
            throw new RuntimeException(e);
        }
    }
}
