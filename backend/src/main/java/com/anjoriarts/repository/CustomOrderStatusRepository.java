package com.anjoriarts.repository;

import com.anjoriarts.entity.CustomOrderStatusEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CustomOrderStatusRepository extends JpaRepository<CustomOrderStatusEntity, String> {

    Optional<CustomOrderStatusEntity> findByCode(String code);
}
