package com.anjoriarts.controller;

import com.anjoriarts.common.CommonResponse;
import com.anjoriarts.dto.*;
import com.anjoriarts.util.Cache;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CacheController {

    private final Cache cache;

    public CacheController(Cache cache) {
        this.cache = cache;
    }

    @GetMapping("/surfaces")
    public ResponseEntity<?> getAllSurfaces() {
        try {
            List<SurfaceOptionDTO> surfaces = cache.getSurfaceOptions();
            return ResponseEntity.ok().body(CommonResponse.success("Surface options fetched", surfaces));
        } catch (Exception e) {
            return ResponseEntity.ok().body(CommonResponse.failure("Surface options fetch failed", null));
        }
    }

    @GetMapping("/mediums")
    public ResponseEntity<?> getAllMediums() {
        try {
            List<MediumOptionDTO> mediums = cache.getMediumOptions();
            return ResponseEntity.ok().body(CommonResponse.success("Medium options fetched", mediums));
        } catch (Exception e) {
            return ResponseEntity.ok().body(CommonResponse.failure("Medium options fetch failed", null));
        }
    }


    @GetMapping("/availability")
    public ResponseEntity<?> getAllAvailability() {
        try {
            List<AvailabilityOptionDTO> availability = cache.getAvailabilityOptions();
            return ResponseEntity.ok().body(CommonResponse.success("Availability options fetched", availability));
        } catch (Exception e) {
            return ResponseEntity.ok().body(CommonResponse.failure("Availability options fetch failed", null));
        }
    }

    @GetMapping("/art-types")
    public ResponseEntity<?> getAllArtTypes() {
        try {
            List<ArtTypeOptionDTO> artTypes = cache.getArtTypeOptions();
            return ResponseEntity.ok().body(CommonResponse.success("Art Type options fetched", artTypes));
        } catch (Exception e) {
            return ResponseEntity.ok().body(CommonResponse.failure("Art Type options fetch failed", null));
        }
    }

    @GetMapping("/custom-order-status")
    public ResponseEntity<?> getCustomOrderStatuses() {
        try {
            List<CustomOrderStatusOptionDTO> status = cache.getCustomOrderStatusOptions();
            return ResponseEntity.ok().body(CommonResponse.success("Custom Order Status options fetched", status));
        } catch (Exception e) {
            return ResponseEntity.ok().body(CommonResponse.failure("Custom Order Status options fetch failed", null));
        }
    }
}
