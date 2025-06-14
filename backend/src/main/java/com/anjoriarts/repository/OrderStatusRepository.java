package com.anjoriarts.repository;

import com.anjoriarts.entity.OrderStatusEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface OrderStatusRepository extends JpaRepository<OrderStatusEntity, String> {

    Optional<OrderStatusEntity> findByCode(String code);
}
