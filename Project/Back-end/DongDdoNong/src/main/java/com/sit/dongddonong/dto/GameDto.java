package com.sit.dongddonong.dto;

import com.sit.dongddonong.model.Game;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GameDto {
    @Schema(hidden = true)
    private Long id;
    private Long userId;
    private Date gameDate;
    @Schema(hidden = true)
    private Date createdAt;
    @Schema(hidden = true)
    private boolean isAssigned;
//    private String location;
    private List<PlayerHistoryDto> playerHistories;


    public static GameDto fromEntity(Game game) {
        return GameDto.builder()
                .id(game.getId())
                .userId(game.getUserId())
                .isAssigned(game.getIsAssigned())
                .createdAt(game.getCreatedAt())
                .gameDate(game.getGameDate())
//                .location(game.getLocation())
                .playerHistories(game.getPlayerHistories().stream()
                        .map(PlayerHistoryDto::fromEntity)
                        .collect(Collectors.toList()))
                .build();
    }
}
