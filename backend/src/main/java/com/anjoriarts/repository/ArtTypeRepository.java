package com.anjoriarts.repository;

import com.anjoriarts.entity.ArtTypeEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ArtTypeRepository extends JpaRepository<ArtTypeEntity, String> {

    Optional<ArtTypeEntity> findByCode(String code);
}
