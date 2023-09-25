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
@Transactional
public class GameService {
    private final GameRepository gameRepository;

    private GameDto convertToDto(Game game) {
        return GameDto.fromEntity(game);
    }

    public void createGameAndPlayerHistories(GameDto gameDto) {

        Game game = Game.createGame(gameDto);

        List<PlayerHistoryDto> playerHistories = gameDto.getPlayerHistories();

        playerHistories.forEach(playerHistory -> game.putPlayerHistory(
                PlayerHistory.createPlayerHistory(playerHistory, game)
        ));

        gameRepository.save(game);
    }

    // 여러 작업을 묶어 작업해야 하기때문에 Transactional

    public List<GameDto> getAllGamesByUser(long userId){
        List<Game> games = gameRepository.findAllByUserIdOrderByCreatedAtDesc(userId);
        return games.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<GameDto> getAllGames(){
        List<Game> games = gameRepository.findAll(Sort.by(Sort.Order.desc("createdAt")));
        return games.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<GameDto> getAllByAssignedGames(long userId, boolean isAssigned) {
        List<Game> games = gameRepository.findAllByUserIdAndIsAssignedOrderByCreatedAtDesc(userId, isAssigned);
        return games.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public void checkGameUserAssigned(long gameId){
        GameDto gameDto = getGame(gameId);
        Game game = gameRepository.findById(String.valueOf(gameId))
                .orElseThrow(() -> new IllegalArgumentException("해당 경기가 없습니다. gameId=" + gameId));;
        List<PlayerHistoryDto> playerHistories = gameDto.getPlayerHistories();
        boolean allAssigned = playerHistories.stream()
                .allMatch(ph -> ph.getUserId() != null);
        if(allAssigned){
            game.updateGame(true);
        }
    }
    public GameDto getGame(long gameId){
        return convertToDto(gameRepository.findById(String.valueOf(gameId)).orElse(null));
    }
}
