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
    private Long id;
    @Schema(hidden = true)
    private Long userId;
    @Schema(hidden = true)
    private String gameDate;
    @Schema(hidden = true)
    private Date createdAt;
    @Schema(hidden = true)
    private Boolean isAssigned = false;
    private List<PlayerHistoryDto> playerHistories;
    @Schema(hidden = true)
    private String mode;
    @Schema(hidden = true)
    private String thumbnail;
    @Schema(hidden = true)
    private String fileName;
    @Schema(hidden = true)
    private String videoLength;
    @Schema(hidden = true)
    private Boolean isAnalyzing;

    public static GameDto fromEntity(Game game) {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String gameDate = format.format(game.getGameDate());

        return GameDto.builder()
                .id(game.getId())
                .userId(game.getUserId())
                .gameDate(gameDate)
                .createdAt(game.getCreatedAt())
                .isAssigned(game.getIsAssigned())
                .playerHistories(game.getPlayerHistories().stream()
                        .map(PlayerHistoryDto::fromEntity)
                        .collect(Collectors.toList()))
                .mode(game.getMode())
                .thumbnail(game.getThumbnail())
                .fileName(game.getFileName())
                .videoLength(game.getVideoLength())
                .isAnalyzing(game.getIsAnalyzing())
                .build();
    }
}
