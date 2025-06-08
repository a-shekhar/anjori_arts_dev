package com.anjoriarts.repository;

import com.anjoriarts.entity.SurfaceEntity;
import com.anjoriarts.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SurfaceRepository extends JpaRepository<SurfaceEntity, String> {

    Optional<SurfaceEntity> findByCode(String code);
}
