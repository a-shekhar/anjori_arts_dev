package com.anjoriarts.repository;

import com.anjoriarts.entity.ArtworkEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import org.springframework.data.domain.Pageable;


public interface ArtworksRepository extends JpaRepository<ArtworkEntity, Long> {

    boolean existsBySlug(String slug);

    List<ArtworkEntity> findByFeaturedTrueOrderByCreatedAtDesc(Pageable pageable);
}
