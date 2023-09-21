package com.sit.dongddonong.dto;

import com.sit.dongddonong.model.PlayerHistory;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import java.util.Date;

@Getter
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
public class PlayerHistoryDto {
    @Schema(hidden = true)
    private Long id;
    @Schema(hidden = true)
    private Long gameId;
    private Long userId;
    @Schema(hidden = true)
    private Date createdAt;
    private String diffProfileImg;
    private String mode;
    private int twoPts;
    private int threePts;
    private int tryTwoPts;
    private int tryThreePts;
    @Schema(hidden = true)
    private int total;
    private String xyUrl;
    private int playTime;
    private Boolean win;

    public static PlayerHistoryDto fromEntity(PlayerHistory playerHistory) {
        PlayerHistoryDto playerHistoryDto = PlayerHistoryDto.builder()
                .id(playerHistory.getId())
                .gameId(playerHistory.getGame().getId())
                .createdAt(playerHistory.getCreatedAt())
                .diffProfileImg(playerHistory.getDiffProfileImg())
                .mode(playerHistory.getMode())
                .twoPts(playerHistory.getTwoPts())
                .threePts(playerHistory.getThreePts())
                .tryTwoPts(playerHistory.getTryTwoPts())
                .tryThreePts(playerHistory.getTryThreePts())
                .total(playerHistory.getTotal())
                .xyUrl(playerHistory.getXyUrl())
                .playTime(playerHistory.getPlayTime())
                .win(playerHistory.getWin())
                .build();
        if(playerHistory.getUser()!=null){
            playerHistoryDto = playerHistoryDto
                    .toBuilder()
                    .userId(playerHistory.getUser().getId())
                    .build();
        }
        return playerHistoryDto;
    }
}
