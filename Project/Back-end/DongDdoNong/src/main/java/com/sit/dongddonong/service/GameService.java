package com.sit.dongddonong.service;

import com.sit.dongddonong.dto.game.GameDto;
import com.sit.dongddonong.dto.game.GameIdDto;
import com.sit.dongddonong.dto.game.PlayerHistoryDto;
import com.sit.dongddonong.model.game.Game;
import com.sit.dongddonong.model.game.GameRepository;
import com.sit.dongddonong.model.game.PlayerHistory;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class GameService {
    private final GameRepository gameRepository;
    private final PlayerHistoryService playerHistoryService;
    private final UserService userService;

    private GameDto convertToDto(Game game) {
        return GameDto.fromEntity(game);
    }

    public void patchGame(GameDto gameDto) throws IOException {
        Game game = gameRepository.findById(String.valueOf(gameDto.getId()))
                .orElseThrow(() -> new IllegalArgumentException("해당 경기가 없습니다. gameId=" + gameDto.getId()));

        List<PlayerHistoryDto> playerHistories = gameDto.getPlayerHistories();

        playerHistories.forEach(playerHistory -> {
            PlayerHistory ph = PlayerHistory.createPlayerHistory(playerHistory, game);
//                    playerHistoryService.savePlayerHistory(ph);
                    game.putPlayerHistory( ph );
                }
        );

        if (!playerHistories.isEmpty()) {
            game.updateIsAnalyzing(false);
        }
        gameRepository.save(game);

        if (game.getMode().equals("1")) {
            game.getPlayerHistories().forEach(playerHistory ->
                    playerHistoryService.patchPlayerHistory(playerHistory.getId(), game.getUserId())
            );
        }
        userService.kakaoAlert(game);
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

    public List<GameDto> getAllGamesByUserId(long userId) {
        List<Game> games = gameRepository.findAllByUserIdOrderByCreatedAtDesc(userId);
        return games.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public GameDto getGame(long gameId) {
        return convertToDto(gameRepository.findById(String.valueOf(gameId)).orElse(null));
    }

    public List<GameDto> getAnalyzingGame(long userId, boolean isAnalyzing) {
        List<Game> games = gameRepository.findGamesByUserIdAndIsAnalyzingOrderByCreatedAtDesc(userId, isAnalyzing);
        return games.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<GameIdDto> getStatusModalAnalyzingGame(long userId, boolean isAnalyzing) {
        List<Game> games = gameRepository.findGamesByUserIdAndIsAnalyzingOrderByCreatedAtDesc(userId, isAnalyzing);
        return games.stream()
                .map(game -> GameIdDto.builder().gameId(game.getId()).build())
                .toList();
    }

    public List<GameIdDto> getStatusModalAssignedGames(long userId, boolean isAssigned) {
        List<Game> games = gameRepository.findAllByUserIdAndIsAssignedOrderByCreatedAtDesc(userId, isAssigned);
        return games.stream()
                .map(game -> GameIdDto.builder().gameId(game.getId()).build())
                .toList();
    }
}
