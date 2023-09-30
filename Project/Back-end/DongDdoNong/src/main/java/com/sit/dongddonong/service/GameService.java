package com.sit.dongddonong.service;

import com.sit.dongddonong.dto.game.GameDto;
import com.sit.dongddonong.dto.game.PlayerHistoryDto;
import com.sit.dongddonong.model.game.Game;
import com.sit.dongddonong.model.game.PlayerHistory;
import com.sit.dongddonong.model.game.GameRepository;
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
    private final PlayerHistoryService playerHistoryService;

    private GameDto convertToDto(Game game) {
        return GameDto.fromEntity(game);
    }

    public void patchGame(GameDto gameDto) {
        Game game = gameRepository.findById(String.valueOf(gameDto.getId()))
                .orElseThrow(() -> new IllegalArgumentException("해당 경기가 없습니다. gameId=" + gameDto.getId()));

        List<PlayerHistoryDto> playerHistories = gameDto.getPlayerHistories();

        playerHistories.forEach(playerHistory -> game.putPlayerHistory(
                PlayerHistory.createPlayerHistory(playerHistory, game)
        ));

        gameRepository.save(game);

        if(game.getMode().equals("1")){
            game.getPlayerHistories().forEach(playerHistory ->
                    playerHistoryService.patchPlayerHistory(playerHistory.getId(), game.getUserId())
            );
        }

    }

    public List<GameDto> getAllGames() {
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

//    public void checkGameUserAssigned(long gameId) {
//        GameDto gameDto = getGame(gameId);
//        Game game = gameRepository.findById(String.valueOf(gameId))
//                .orElseThrow(() -> new IllegalArgumentException("해당 경기가 없습니다. gameId=" + gameId));
//        List<PlayerHistoryDto> playerHistories = gameDto.getPlayerHistories();
//        boolean allAssigned = playerHistories.stream()
//                .allMatch(ph -> ph.getUserId() != null);
//        if (allAssigned) {
//            game.updateGameIsAssigned(true);
//        }
//    }

    public GameDto getGame(long gameId) {
        return convertToDto(gameRepository.findById(String.valueOf(gameId)).orElse(null));
    }

    public List<GameDto> getAnalyzingGame(long userId, boolean isAnalyzing) {
        List<Game> games = gameRepository.findGamesByUserIdAndIsAnalyzingOrderByCreatedAtDesc(userId, isAnalyzing);
        return games.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
}
