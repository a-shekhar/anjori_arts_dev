package com.anjoriarts.controller;

import com.anjoriarts.common.CommonResponse;
import com.anjoriarts.dto.ArtworkRequestDTO;
import com.anjoriarts.dto.ArtworkResponseDTO;
import com.anjoriarts.dto.ArtworkPageResponse;
import com.anjoriarts.service.artworks.ArtworksService;
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

    @GetMapping(value = "/artworks/featured", produces = "application/json")
    public ResponseEntity<ArtworkPageResponse> getPaginatedFeaturedArtworks(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size
    ) {
        try {
            Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
            Page<ArtworkResponseDTO> resultPage = artworksService.getFeaturedArtworks(pageable);

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
            logger.error("Error while fetching paginated featured artworks", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    // ✅ Updated this method only
    @GetMapping(value = "/artworks", produces = "application/json")
    public ResponseEntity<ArtworkPageResponse> getArtworks(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    ) {
        try {
            logger.info("Fetching all the artworks...");
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

            logger.info("Fetched all the artworks...");
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
                                        @RequestParam("featured") boolean featured,
                                        @RequestParam("images") List<MultipartFile> imageFiles,
                                        @RequestParam("description") String description,
                                        @RequestParam("availability") String availability,
                                        @RequestParam("artistNote") String artistNote
    ){
        logger.info("Adding the given artwork...");
        String errorMessage = validateData(title, size, medium, surface, price, imageFiles);

        if(errorMessage.isEmpty()) {
            ArtworkRequestDTO dto = new ArtworkRequestDTO(title, size, medium, surface,
                    Double.valueOf(price), tags, featured, imageFiles, description,
                    availability, artistNote);
            dto = artworksService.saveArtwork(dto);
            if(dto.getId() == null){
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(CommonResponse.failure("Upload failed. Please try again.", null));
            }
            logger.info("Added the given artwork...");
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
