package com.sit.dongddonong.dto;

import lombok.*;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class GameDto {
//    private Long id;
    private Date match_date;
//    private Date createdAt;
    private String location;
    private List<PlayerHistoryDto> playerHistories;
}
