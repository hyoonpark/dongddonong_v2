package com.sit.dongddonong.model;

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

    @Column
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    @Column
    private Date gameDate;

    @Column
    private String location;

    @OneToMany(mappedBy = "game", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PlayerHistory> playerHistories = new ArrayList<>();

    @PrePersist
    protected void onCreate() {
        createdAt = new Date();
    }

    public static Game createGame(Date game_date, String location) {
        return Game.builder()
                .gameDate(game_date)
                .location(location)
                .playerHistories(new ArrayList<>())
                .build();
    }

    public void putPlayerHistory(PlayerHistory playerHistory) {
        this.playerHistories.add(playerHistory);
    }
}
