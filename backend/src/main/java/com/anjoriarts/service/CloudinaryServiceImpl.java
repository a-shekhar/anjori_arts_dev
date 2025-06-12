package com.anjoriarts.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URI;
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

    @Override
    public boolean deleteFolder(String folderPath){
        try{
            // 1. Delete all resources inside the folder
            cloudinary.api().deleteResourcesByPrefix(
                    folderPath + "/", ObjectUtils.emptyMap());
            // 2. Delete the empty folder
            cloudinary.api().deleteFolder(folderPath, ObjectUtils.emptyMap());
            logger.info("Folder " + folderPath + "Deleted...");
            return true;
        } catch (Exception e) {
            logger.error("Error during deletion of cloudinary folder");
            throw new RuntimeException(e);
        }
    }

    @Override
    public boolean deleteImage(String imageUrl){
        String publicId = this.extractPublicIdFromUrl(imageUrl);
        try {
            cloudinary.uploader().destroy(publicId, Map.of());
            return true;
        } catch (Exception e) {
            throw new RuntimeException("Failed to delete image: " + imageUrl, e);
        }
    }

    // You must extract the publicId from the imageUrl
    private String extractPublicIdFromUrl(String imageUrl) {
        URI uri = URI.create(imageUrl);
        String path = uri.getPath();
        String trimmed = path.substring(path.indexOf("/upload/") + 8);
        return trimmed.substring(trimmed.indexOf("/") + 1, trimmed.lastIndexOf("."));
    }

}
