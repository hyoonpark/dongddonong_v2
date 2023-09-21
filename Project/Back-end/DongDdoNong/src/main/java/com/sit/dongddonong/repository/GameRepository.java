package com.sit.dongddonong.repository;

import com.sit.dongddonong.model.Game;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GameRepository extends JpaRepository<Game,String> {
    List<Game> findAllByUserIdOrderByCreatedAtDesc(Long userId);

    List<Game> findAllByUserIdAndIsAssignedOrderByCreatedAtDesc(Long userId, boolean isAssigned);

}
