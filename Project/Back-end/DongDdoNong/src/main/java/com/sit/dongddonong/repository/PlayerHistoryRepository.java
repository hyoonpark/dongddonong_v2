package com.sit.dongddonong.repository;

import com.sit.dongddonong.model.PlayerHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlayerHistoryRepository extends JpaRepository<PlayerHistory,String> {
    List<PlayerHistory> findByUserId(Long userId);
    PlayerHistory findById(long playerHistoryId);
}
