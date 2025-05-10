package com.anjoriarts.repository;

import com.anjoriarts.entity.ArtworkEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArtworksRepository extends JpaRepository<ArtworkEntity, Long> {

    boolean existsBySlug(String slug);
}
