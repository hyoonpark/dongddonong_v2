package com.sit.dongddonong.dto;

import lombok.*;

@Getter
@Setter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class PlayerHistoryDto {
//    private Long id;
//    private Long matchId;
//    private Long userId;
//    private Date createdAt;
    private String diffProfileImg;
    private String mode;
    private int twoPts;
    private int threePts;
    private int tryTwoPts;
    private int tryThreePts;
//    private int total;
    private String xyUrl;
    private int playTime;
}
