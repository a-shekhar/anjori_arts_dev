package com.anjoriarts.controller;

import com.anjoriarts.common.CommonResponse;
import com.anjoriarts.dto.ArtworkDTO;
import com.anjoriarts.dto.ArtworkResponseDTO;
import com.anjoriarts.dto.ArtworkPageResponse; // ✅ Updated import
import com.anjoriarts.service.ArtworksService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ArtworksController {

    Logger logger = LoggerFactory.getLogger(getClass().getName());
    private final ArtworksService artworksService;

    public ArtworksController(ArtworksService artworksService){
        this.artworksService = artworksService;
    }

    @GetMapping("/home/featured-artworks")
    public ResponseEntity<?> getFeaturedArtworks(){
        try {
            logger.info("Fetching all the featured artworks ===>");
            List<ArtworkDTO> featuredArtworks = artworksService.getFeaturedArtworks();
            return ResponseEntity.ok(CommonResponse.success("Fetched featured artworks successfully.", featuredArtworks));
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(CommonResponse.failure("Error while fetching feature artworks", null));
        }
    }

    // ✅ Updated this method only
    @GetMapping(value = "/artworks", produces = "application/json")
    public ResponseEntity<ArtworkPageResponse> getArtworks(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    ) {
        try {
            Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
            Page<ArtworkResponseDTO> resultPage = artworksService.getAllArtworks(pageable);

            ArtworkPageResponse response = new ArtworkPageResponse(
                    resultPage.getContent(),
                    resultPage.getTotalPages(),
                    resultPage.getTotalElements(),
                    resultPage.getNumber(),
                    resultPage.getSize(),
                    resultPage.isFirst(),
                    resultPage.isLast()
            );

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            logger.error("Error while fetching paginated artworks", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/artworks/add")
    public ResponseEntity<?> addArtWork(@RequestParam("title") String title,
                                        @RequestParam("size") String size,
                                        @RequestParam("medium") String medium,
                                        @RequestParam("surface") String surface,
                                        @RequestParam("price") String price,
                                        @RequestParam("tags") String tags,
                                        @RequestParam("available") boolean available,
                                        @RequestParam("featured") boolean featured,
                                        @RequestParam("images") List<MultipartFile> imageFiles
    ){
        String errorMessage = validateData(title, size, medium, surface, price, imageFiles);

        if(errorMessage.isEmpty()) {
            ArtworkDTO dto = new ArtworkDTO(title, size, medium, surface,
                    Double.valueOf(price), tags, available, featured, imageFiles);
            dto = artworksService.saveArtwork(dto);
            if(dto.getId() == null){
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(CommonResponse.failure("Upload failed. Please try again.", null));
            }
            return ResponseEntity.ok(CommonResponse.success("Artwork added successfully!", null));
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(CommonResponse.failure(errorMessage, null));
        }
    }

    private String validateData(String title, String size, String paintType, String surface,
                                String price, List<MultipartFile> images ){
        String errorMsg = "";
        try {
            if (title.trim().isEmpty()) {
                errorMsg = "Title can't be empty. Please enter unique Title name";
                return errorMsg;
            } else if (size.trim().isEmpty()) {
                errorMsg = "Size can't be empty.";
                return errorMsg;
            } else if (price.trim().isEmpty()) {
                errorMsg = "Price can't be empty.";
                return errorMsg;
            } else if (Integer.parseInt(price) <= 0) {
                errorMsg = "Price is not valid.";
                return errorMsg;
            } else if (paintType.trim().isEmpty()) {
                errorMsg = "Medium can't be empty.";
                return errorMsg;
            } else if (surface.trim().isEmpty()) {
                errorMsg = "Surface can't be empty.";
                return errorMsg;
            } else if (images.isEmpty()) {
                errorMsg = "Please select at-least one image.";
                return errorMsg;
            }
        } catch (NumberFormatException num){
            errorMsg = "Price should be numeric value.";
            logger.error(errorMsg);
            return  errorMsg;
        }
        return errorMsg;
    }
}
