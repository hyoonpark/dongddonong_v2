package com.sit.dongddonong.service;

import com.sit.dongddonong.dto.game.PlayerHistoryDto;
import com.sit.dongddonong.model.game.Game;
import com.sit.dongddonong.model.game.PlayerHistory;
import com.sit.dongddonong.model.user.User;
import com.sit.dongddonong.model.game.GameRepository;
import com.sit.dongddonong.model.game.PlayerHistoryRepository;
import com.sit.dongddonong.model.user.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class PlayerHistoryService {
    private final PlayerHistoryRepository playerHistoryRepository;
    private final UserRepository userRepository;
    private final GameRepository gameRepository;


    public List<PlayerHistoryDto> getPlayerHistory(long userId){
        List<PlayerHistory> playerHistories = playerHistoryRepository.findByUserId(userId);
        return playerHistories.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    private PlayerHistoryDto convertToDto(PlayerHistory playerHistory) {
        return PlayerHistoryDto.fromEntity(playerHistory);
    }

    public void patchPlayerHistory(long playerHistoryId, long userId) {
        PlayerHistory playerHistory = playerHistoryRepository.findById(playerHistoryId);
        User user = userRepository.findById(userId).orElse(null);
        if (playerHistory != null && user != null) {
            playerHistory = playerHistory.toBuilder()
                    .user(user)
                    .build();

            playerHistoryRepository.save(playerHistory);

            // 부모 객체인 Game의 모든 유저가 할당 되어있는지 확인하고,
            // 할당 다 되었다면 isAssigned 를 true 로 변경
            checkGameUserAssigned(playerHistory.getGame().getId());
        }
    }

    public void checkGameUserAssigned(long gameId) {
        Game game = gameRepository.findById(String.valueOf(gameId))
                .orElseThrow(() -> new IllegalArgumentException("해당 경기가 없습니다. gameId=" + gameId));
        boolean allAssigned = game.getPlayerHistories().stream()
                .allMatch(ph -> ph.getUser() != null);
        if (allAssigned) {
            game.updateGameIsAssigned(true);
        }
    }

    public List<PlayerHistoryDto> getPlayerHistoriesByCondition(long userId, String mode, String startDate, String endDate) throws ParseException {

        SimpleDateFormat format = new SimpleDateFormat("yyyyMMdd");

        Date start = startDate != null ? format.parse(startDate) : null;
        Date end = endDate != null ? format.parse(endDate) : null;

        List<PlayerHistory> playerHistories = playerHistoryRepository.findPlayerHistoriesByCondition(userId, start, end, mode);
        return playerHistories.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public void savePlayerHistory(PlayerHistory playerHistory){
        playerHistoryRepository.save(playerHistory);
    }
}
