package com.sit.dongddonong.repository;

import com.sit.dongddonong.model.PlayerHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface PlayerHistoryRepository extends JpaRepository<PlayerHistory,String> {
    List<PlayerHistory> findByUserId(Long userId);
    PlayerHistory findById(long playerHistoryId);

    @Query("SELECT ph FROM PlayerHistory ph " +
            "WHERE (:mode = 0 OR ph.mode = :mode) " +
            "AND ph.user.id = :userId " +
            "AND (:startDate IS NULL OR ph.createdAt BETWEEN :startDate AND :endDate)")
    List<PlayerHistory> findPlayerHistoriesByCondition(
            @Param("userId") Long userId,
            @Param("mode") String mode,
            @Param("startDate") Date startDate,
            @Param("endDate") Date endDate
    );
}
