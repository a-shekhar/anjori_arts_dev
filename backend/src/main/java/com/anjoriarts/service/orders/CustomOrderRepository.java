package com.anjoriarts.service.orders;

import com.anjoriarts.entity.CustomOrderEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomOrderRepository extends JpaRepository<CustomOrderEntity, Long> {

}
