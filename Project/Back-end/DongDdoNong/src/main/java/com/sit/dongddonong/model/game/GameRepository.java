package com.sit.dongddonong.model.game;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GameRepository extends JpaRepository<Game,String> {
    List<Game> findAllByUserIdOrderByCreatedAtDesc(Long userId);
    List<Game> findAllByUserIdAndIsAssignedOrderByCreatedAtDesc(Long userId, boolean isAssigned);
    List<Game> findAllByUserIdAndIsAssignedAndIsAnalyzingOrderByCreatedAtDesc(
            Long userId, boolean isAssigned, boolean isAnalyzing);

    List<Game> findGamesByUserIdAndIsAnalyzingOrderByCreatedAtDesc(Long userId, boolean isAnalyzing);

    List<Game> findAllByIsAnalyzingFalse();

}
