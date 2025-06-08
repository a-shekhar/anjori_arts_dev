package com.anjoriarts.controller;

import com.anjoriarts.common.CommonResponse;
import com.anjoriarts.dto.AvailabilityOptionDTO;
import com.anjoriarts.dto.MediumOptionDTO;
import com.anjoriarts.dto.SurfaceOptionDTO;
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
}
