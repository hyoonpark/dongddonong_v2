package com.sit.dongddonong.model.game;

import com.sit.dongddonong.dto.game.PlayerHistoryDto;
import com.sit.dongddonong.model.user.User;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
@ToString
public class PlayerHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn
    private Game game;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private User user;

    @Column
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;
    @Column
    private String diffProfileImg;
    @Column
    private String mode;
    @Column
    private int twoPts;
    @Column
    private int threePts;
    @Column
    private int tryTwoPts;
    @Column
    private int tryThreePts;
    @Column
    private int total;
    @Column
    private String xyUrl;
    @Column
    private int playTime;
    @Column
    private Boolean win;
    @PrePersist
    protected void onCreate() {
        createdAt = new Date();
        total = twoPts + threePts * 2;
    }

    public void updateUser(User user){
        this.user = user;
    }

    public static PlayerHistory createPlayerHistory(PlayerHistoryDto playerHistoryDto, Game game) {
        return PlayerHistory.builder()
                .game(game)
                .diffProfileImg(playerHistoryDto.getDiffProfileImg())
                .mode(playerHistoryDto.getMode())
                .twoPts(playerHistoryDto.getTwoPts())
                .threePts(playerHistoryDto.getThreePts())
                .tryTwoPts(playerHistoryDto.getTryTwoPts())
                .tryThreePts(playerHistoryDto.getTryThreePts())
                .total(playerHistoryDto.getTwoPts() + playerHistoryDto.getThreePts() * 2)
                .xyUrl(playerHistoryDto.getXyUrl())
                .playTime(playerHistoryDto.getPlayTime())
                .win(playerHistoryDto.getWin())
                .build();
    }
}