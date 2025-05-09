package com.anjoriarts.controller;

import com.anjoriarts.common.CommonResponse;
import com.anjoriarts.dto.ArtworkDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ArtworksController {

    @GetMapping("/home/featured-artworks")
    public ResponseEntity<?> getFeaturedArtworks(){
        List<ArtworkDTO> featuredArtworks =  List.of(
                new ArtworkDTO(1L, "Radha Krishna", "24×36", "Acrylic", "Canvas", 2250.0, "/images/radha.jpg", "radha-krishna"),
                new ArtworkDTO(2L, "Floral Mandala", "12×12", "Ink", "Handmade Paper", 899.0, "/images/mandala.jpg", "floral-mandala"),
                new ArtworkDTO(3L, "Totebag Art", "Standard Tote", "Fabric Paint", "Cotton Bag", 550.0, "/images/totebag.jpg", "totebag-art"),
                new ArtworkDTO(4L, "Peacock Glory", "18×24", "Watercolor", "Canvas", 1850.0, "/images/peacock.jpg", "peacock-glory"),
                new ArtworkDTO(5L, "Sunset Bliss", "20×20", "Acrylic", "Canvas", 1650.0, "/images/sunset.jpg", "sunset-bliss"),
                new ArtworkDTO(6L, "Mountain Dreams", "30×30", "Oil", "Canvas", 3000.0, "/images/mountain.jpg", "mountain-dreams"),
                new ArtworkDTO(7L, "Modern Tribal", "16×20", "Ink", "Handmade Paper", 950.0, "/images/tribal.jpg", "modern-tribal"),
                new ArtworkDTO(8L, "Boho Vibe", "12×18", "Acrylic", "Canvas", 1200.0, "/images/boho.jpg", "boho-vibe"),
                new ArtworkDTO(9L, "Meditative Mandala", "10×10", "Ink", "Paper", 750.0, "/images/meditation.jpg", "meditative-mandala"),
                new ArtworkDTO(10L, "Nature’s Rhythm", "22×28", "Watercolor", "Canvas", 2000.0, "/images/nature.jpg", "natures-rhythm"),
                new ArtworkDTO(11L, "Wild Bloom", "14×14", "Acrylic", "Canvas", 1300.0, "/images/flowers.jpg", "wild-bloom"),
                new ArtworkDTO(12L, "Art on Wood", "Custom", "Acrylic", "Wood Slice", 999.0, "/images/wood.jpg", "art-on-wood")
        );

        return ResponseEntity.ok(CommonResponse.success("Fetched featured artworks successfully.", featuredArtworks));
    }
}
