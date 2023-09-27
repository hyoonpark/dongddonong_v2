package com.sit.dongddonong.model.game;

import com.sit.dongddonong.model.game.Game;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GameRepository extends JpaRepository<Game,String> {
    List<Game> findAllByUserIdOrderByCreatedAtDesc(Long userId);

    List<Game> findAllByUserIdAndIsAssignedOrderByCreatedAtDesc(Long userId, boolean isAssigned);

}
