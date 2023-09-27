package com.sit.dongddonong.model.game;

import com.sit.dongddonong.dto.upload.UploadRequestDto;
import jakarta.persistence.*;
import lombok.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
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

    @Column
    private String mode;

    @Column
    private String thumbnail;

    @Column
    private String fileName;

    @Column
    private String videoLength;

    @Column
    private Boolean isAnalyzing;

    @PrePersist
    protected void onCreate() {
        createdAt = new Date();
    }

    public static Game createGame(UploadRequestDto uploadRequestDto, String thumbnail) {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

        Date gameDate;
        try{
            gameDate = format.parse(uploadRequestDto.getGameDate());
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }

        return Game.builder()
                .userId(uploadRequestDto.getUserId())
                .gameDate(gameDate)
                .thumbnail(thumbnail)
                .videoLength(uploadRequestDto.getVideoLength())
                .fileName(uploadRequestDto.getFileName())
                .mode(uploadRequestDto.getMode())
                .isAssigned(false)
                .isAnalyzing(true)
                .playerHistories(new ArrayList<>())
                .build();
    }


    public void updateGameIsAssigned(Boolean isAssigned) {
        this.isAssigned = isAssigned;
    }

    public void putPlayerHistory(PlayerHistory playerHistory) {
        this.playerHistories.add(playerHistory);
    }
}
