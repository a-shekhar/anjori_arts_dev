package com.anjoriarts.util;

import com.anjoriarts.dto.*;
import com.anjoriarts.repository.*;
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
    private final ArtTypeRepository artTypeRepo;
    private final CustomOrderStatusRepository customOrderStatusRepo;

    private List<SurfaceOptionDTO> surfaceOptions;
    private List<MediumOptionDTO> mediumOptions;
    private List<AvailabilityOptionDTO> availabilityOptions;
    private List<ArtTypeOptionDTO> artTypeOptions;
    private List<CustomOrderStatusOptionDTO> customOrderStatusOptions;

    public Cache(SurfaceRepository surfaceRepo, MediumRepository mediumRepo,
                 AvailabilityRepository availabilityRepo, ArtTypeRepository artTypeRepo,
                 CustomOrderStatusRepository customOrderStatusRepo) {
        this.surfaceRepo = surfaceRepo;
        this.mediumRepo = mediumRepo;
        this.availabilityRepo = availabilityRepo;
        this.artTypeRepo = artTypeRepo;
        this.customOrderStatusRepo = customOrderStatusRepo;
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

    @PostConstruct
    public void loadArtTypeOptions() {
        this.artTypeOptions = artTypeRepo.findAll().stream()
                .map(s -> new ArtTypeOptionDTO(s.getCode(), s.getName()))
                .toList();
    }

    @PostConstruct
    public void loadCustomOrderStatusOptions() {
        this.customOrderStatusOptions = customOrderStatusRepo.findAll().stream()
                .map(s -> new CustomOrderStatusOptionDTO(s.getCode(), s.getName()))
                .toList();
    }
}
