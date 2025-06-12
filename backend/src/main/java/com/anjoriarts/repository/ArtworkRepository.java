package com.anjoriarts.repository;

import com.anjoriarts.entity.ArtworkEntity;
import org.antlr.v4.runtime.misc.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Pageable;

import java.util.Optional;


public interface ArtworkRepository extends JpaRepository<ArtworkEntity, Long> {

    boolean existsBySlug(String slug);

    Page<ArtworkEntity> findByFeaturedTrueOrderByCreatedAtDesc(Pageable pageable);

    Optional<ArtworkEntity> findById(Long artworkId);

    Page<ArtworkEntity> findByTitleContainingIgnoreCase(String title, Pageable pageable);

    void deleteById(Long artworkId);
}
