package com.anjoriarts.repository;

import com.anjoriarts.entity.AvailabilityEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AvailabilityRepository extends JpaRepository<AvailabilityEntity, String> {

    Optional<AvailabilityEntity> findByCode(String code);
}
