package com.anjoriarts.controller;

import com.anjoriarts.common.CommonResponse;
import com.anjoriarts.dto.ArtworkDTO;
import com.anjoriarts.service.ArtworksService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ArtworksController {

    Logger  logger = LoggerFactory.getLogger(getClass().getName());
    private final ArtworksService artworksService;

    public ArtworksController(ArtworksService artworksService){
        this.artworksService = artworksService;
    }

    @GetMapping("/home/featured-artworks")
    public ResponseEntity<?> getFeaturedArtworks(){
//        List<ArtworkDTO> featuredArtworks =  List.of(
//                new ArtworkDTO(1L, "Radha Krishna", "24×36", "Acrylic", "Canvas", 2250.0, "/images/radha.jpg", "radha-krishna"),
//                new ArtworkDTO(2L, "Floral Mandala", "12×12", "Ink", "Handmade Paper", 899.0, "/images/mandala.jpg", "floral-mandala"),
//                new ArtworkDTO(3L, "Totebag Art", "Standard Tote", "Fabric Paint", "Cotton Bag", 550.0, "/images/totebag.jpg", "totebag-art"),
//                new ArtworkDTO(4L, "Peacock Glory", "18×24", "Watercolor", "Canvas", 1850.0, "/images/peacock.jpg", "peacock-glory"),
//                new ArtworkDTO(5L, "Sunset Bliss", "20×20", "Acrylic", "Canvas", 1650.0, "/images/sunset.jpg", "sunset-bliss"),
//                new ArtworkDTO(6L, "Mountain Dreams", "30×30", "Oil", "Canvas", 3000.0, "/images/mountain.jpg", "mountain-dreams"),
//                new ArtworkDTO(7L, "Modern Tribal", "16×20", "Ink", "Handmade Paper", 950.0, "/images/tribal.jpg", "modern-tribal"),
//                new ArtworkDTO(8L, "Boho Vibe", "12×18", "Acrylic", "Canvas", 1200.0, "/images/boho.jpg", "boho-vibe"),
//                new ArtworkDTO(9L, "Meditative Mandala", "10×10", "Ink", "Paper", 750.0, "/images/meditation.jpg", "meditative-mandala"),
//                new ArtworkDTO(10L, "Nature’s Rhythm", "22×28", "Watercolor", "Canvas", 2000.0, "/images/nature.jpg", "natures-rhythm"),
//                new ArtworkDTO(11L, "Wild Bloom", "14×14", "Acrylic", "Canvas", 1300.0, "/images/flowers.jpg", "wild-bloom"),
//                new ArtworkDTO(12L, "Art on Wood", "Custom", "Acrylic", "Wood Slice", 999.0, "/images/wood.jpg", "art-on-wood")
//        );

        return ResponseEntity.ok(CommonResponse.success("Fetched featured artworks successfully.", null));
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
                                        @RequestParam("images") List<MultipartFile> images
                                        ){
        String errorMessage = validateData(title, size, medium, surface, price, images);

        if(errorMessage.isEmpty()) {
            ArtworkDTO dto = new ArtworkDTO(title, size, medium, surface,
                    Double.valueOf(price), tags, available, featured);
            //for( List<MultipartFile>)
            dto = artworksService.saveArtwork(dto);
            return ResponseEntity.ok(CommonResponse.success("Artwork added successfully!", null));
        }else {
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
            }else if (surface.trim().isEmpty()) {
                errorMsg = "Surface can't be empty.";
                return errorMsg;
            } else if (images.isEmpty()) {
                errorMsg = "Please select at-least one image.";
                return errorMsg;
            }
        }catch (NumberFormatException num){
            errorMsg = "Price should be numeric value value.";
            logger.error(errorMsg);
            return  errorMsg;
        }
        return errorMsg;
    }
}
