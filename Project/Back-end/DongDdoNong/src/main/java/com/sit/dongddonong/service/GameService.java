package com.sit.dongddonong.service;

import com.sit.dongddonong.dto.GameDto;
import com.sit.dongddonong.dto.PlayerHistoryDto;
import com.sit.dongddonong.model.Game;
import com.sit.dongddonong.model.PlayerHistory;
import com.sit.dongddonong.repository.GameRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GameService {
    private final GameRepository gameRepository;

    public void createGameAndPlayerHistories(GameDto gameDto) {
        Game game = Game.createGame(
                gameDto.getMatch_date(), gameDto.getLocation()
        );

        List<PlayerHistoryDto> playerHistories = gameDto.getPlayerHistories();

        playerHistories.forEach(playerHistory -> game.putPlayerHistory(
                PlayerHistory.createPlayerHistory(playerHistory, game)
        ));

        gameRepository.save(game);
    }
}
