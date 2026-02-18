package com.espalhai.repository;

import com.espalhai.model.Ad;
import com.espalhai.model.enums.AdStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface AdRepository extends JpaRepository<Ad, Long> {
    List<Ad> findByStatus(AdStatus status);
    
    @Query("SELECT a FROM Ad a WHERE (:categoryId IS NULL OR a.categoria.id = :categoryId) AND (:status IS NULL OR a.status = :status)")
    List<Ad> findByFilters(@Param("categoryId") Long categoryId, @Param("status") AdStatus status);
}
