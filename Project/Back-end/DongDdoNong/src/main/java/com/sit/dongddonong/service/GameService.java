package com.sit.dongddonong.service;

import com.sit.dongddonong.dto.GameDto;
import com.sit.dongddonong.dto.PlayerHistoryDto;
import com.sit.dongddonong.model.Game;
import com.sit.dongddonong.model.PlayerHistory;
import com.sit.dongddonong.repository.GameRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GameService {
    private final GameRepository gameRepository;

    public void createGameAndPlayerHistories(GameDto gameDto) {
        Game game = Game.createGame(
                gameDto.getGameDate(), gameDto.getLocation()
        );

        List<PlayerHistoryDto> playerHistories = gameDto.getPlayerHistories();

        playerHistories.forEach(playerHistory -> game.putPlayerHistory(
                PlayerHistory.createPlayerHistory(playerHistory, game)
        ));

        gameRepository.save(game);
    }

    // 여러 작업을 묶어 작업해야 하기때문에 Transactional
    @Transactional
    public List<GameDto> getAllGames(){
        List<Game> games = gameRepository.findAll(Sort.by(Sort.Direction.DESC, "createdAt"));
        return games.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    private GameDto convertToDto(Game game) {
        return GameDto.fromEntity(game);
    }

}
