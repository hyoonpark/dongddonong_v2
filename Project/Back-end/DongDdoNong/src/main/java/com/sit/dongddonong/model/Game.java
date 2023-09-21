package com.sit.dongddonong.model;

import com.sit.dongddonong.dto.GameDto;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class Game {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false)
    private Long userId;

    @Column
    private Boolean isAssigned;

    @Column
    private Date gameDate;

//    @Column
//    private String location;

    @OneToMany(mappedBy = "game", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PlayerHistory> playerHistories = new ArrayList<>();

    @Column
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = new Date();
        isAssigned = false;
    }

    public static Game createGame(GameDto gameDto) {
        return Game.builder()
                .userId(gameDto.getUserId())
                .isAssigned(gameDto.isAssigned())
                .gameDate(gameDto.getGameDate())
//                .location(gameDto.getLocation())
                .playerHistories(new ArrayList<>())
                .build();
    }

    public void putPlayerHistory(PlayerHistory playerHistory) {
        this.playerHistories.add(playerHistory);
    }
}
