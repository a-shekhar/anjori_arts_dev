package com.anjoriarts.repository;


import com.anjoriarts.entity.MediumEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MediumRepository extends JpaRepository<MediumEntity, String> {

    Optional<MediumEntity> findByCode(String code);
}
