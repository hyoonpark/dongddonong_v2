package com.sit.dongddonong.dto.game;

import com.sit.dongddonong.model.game.Game;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class GameDto {
    @Schema(hidden = true)
    private Long id;
    private Long userId;
    private String gameDate;
    @Schema(hidden = true)
    private Date createdAt;
    @Schema(hidden = true)
    private Boolean isAssigned = false;
    @Schema(hidden = true)
    private List<PlayerHistoryDto> playerHistories;
    private String mode;
    @Schema(hidden = true)
    private String thumbnail;
    private String fileName;
    private String videoLength;
    @Schema(hidden = true)
    private Boolean isAnalyzing;

    public void updateAssignedTrue(){
        isAssigned = true;
    }
    public static GameDto fromEntity(Game game) {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String gameDate = format.format(game.getGameDate());

        return GameDto.builder()
                .id(game.getId())
                .userId(game.getUserId())
                .isAssigned(game.getIsAssigned())
                .createdAt(game.getCreatedAt())
                .gameDate(gameDate)
//                .location(game.getLocation())
                .playerHistories(game.getPlayerHistories().stream()
                        .map(PlayerHistoryDto::fromEntity)
                        .collect(Collectors.toList()))
                .mode(game.getMode())
                .build();
    }
}
