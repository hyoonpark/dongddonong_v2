package com.sit.dongddonong.service;

import com.sit.dongddonong.dto.PlayerHistoryDto;
import com.sit.dongddonong.model.PlayerHistory;
import com.sit.dongddonong.model.User;
import com.sit.dongddonong.repository.PlayerHistoryRepository;
import com.sit.dongddonong.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PlayerHistoryService {
    private final PlayerHistoryRepository playerHistoryRepository;
    private final UserRepository userRepository;

    public List<PlayerHistoryDto> getPlayerHistory(long userId){
        List<PlayerHistory> playerHistories = playerHistoryRepository.findByUserId(userId);
        return playerHistories.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    private PlayerHistoryDto convertToDto(PlayerHistory playerHistory) {
        return PlayerHistoryDto.fromEntity(playerHistory);
    }

    public void putPlayerHistory(long playerHistoryId, long userId) {
        PlayerHistory playerHistory = playerHistoryRepository.findById(playerHistoryId);
        User user = userRepository.findById(userId).orElse(null);
        if (playerHistory != null && user != null) {

            playerHistory = playerHistory.toBuilder()
                    .user(user)
                    .build();
            playerHistoryRepository.save(playerHistory);
        }
    }
}
