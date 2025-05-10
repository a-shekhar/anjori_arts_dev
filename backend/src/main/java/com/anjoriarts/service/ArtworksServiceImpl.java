package com.anjoriarts.service;

import com.anjoriarts.dto.ArtworkDTO;
import com.anjoriarts.entity.ArtworkEntity;
import com.anjoriarts.repository.ArtworksRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class ArtworksServiceImpl implements ArtworksService{

    Logger logger = LoggerFactory.getLogger(getClass().getName());

    private final ArtworksRepository artworksRepository;

    public ArtworksServiceImpl(ArtworksRepository artworksRepository){
        this.artworksRepository = artworksRepository;
    }

    public ArtworkDTO saveArtwork(ArtworkDTO dto){
        try {
            ArtworkEntity artwork = new ArtworkEntity();
            artwork.setTitle(dto.getTitle());
            artwork.setSize(dto.getSize());
            artwork.setMedium(dto.getMedium());
            artwork.setSurface(dto.getSurface());
            artwork.setPrice(dto.getPrice());
            artwork.setSlug(this.generateSlug(dto.getTitle()));
            artwork.setAvailable(dto.isAvailable());
            artwork.setFeatured(dto.isFeatured());
            artworksRepository.save(artwork);
            logger.info("Artwork saved successfully...");
        }catch (Exception e){
            logger.error("Failed saving Artwork");
        }
        return dto;
    }

    private String generateSlug(String title){
        logger.info("given title is: " + title);
        String baseSlug = title.toLowerCase()
                .replaceAll("[^a-z0-9\\s]", "")   // remove special chars
                .replaceAll("\\s+", "-"); // remove spaces

        String slug = baseSlug;
        int count = 1;
        while(artworksRepository.existsBySlug(slug)){
            slug = baseSlug + "-" + (count++);
        }
        return slug;
    }
}
