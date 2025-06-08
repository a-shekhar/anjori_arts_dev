package com.anjoriarts.util;

import com.anjoriarts.dto.AvailabilityOptionDTO;
import com.anjoriarts.dto.MediumOptionDTO;
import com.anjoriarts.dto.SurfaceOptionDTO;
import com.anjoriarts.repository.AvailabilityRepository;
import com.anjoriarts.repository.MediumRepository;
import com.anjoriarts.repository.SurfaceRepository;
import jakarta.annotation.PostConstruct;
import lombok.Getter;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Getter
public class Cache {

    private final SurfaceRepository surfaceRepo;
    private final MediumRepository mediumRepo;
    private final AvailabilityRepository availabilityRepo;

    private List<SurfaceOptionDTO> surfaceOptions;
    private List<MediumOptionDTO> mediumOptions;
    private List<AvailabilityOptionDTO> availabilityOptions;

    public Cache(SurfaceRepository surfaceRepo, MediumRepository mediumRepo, AvailabilityRepository availabilityRepo) {
        this.surfaceRepo = surfaceRepo;
        this.mediumRepo = mediumRepo;
        this.availabilityRepo = availabilityRepo;
    }

    @PostConstruct
    public void loadSurfaceOptions() {
        this.surfaceOptions = surfaceRepo.findAll().stream()
                .map(s -> new SurfaceOptionDTO(s.getCode(), s.getName()))
                .toList();
    }

    @PostConstruct
    public void loadMediumOptions() {
        this.mediumOptions = mediumRepo.findAll().stream()
                .map(s -> new MediumOptionDTO(s.getCode(), s.getName()))
                .toList();
    }

    @PostConstruct
    public void loadAvailabilityOptions() {
        this.availabilityOptions = availabilityRepo.findAll().stream()
                .map(s -> new AvailabilityOptionDTO(s.getCode(), s.getName()))
                .toList();
    }
}
