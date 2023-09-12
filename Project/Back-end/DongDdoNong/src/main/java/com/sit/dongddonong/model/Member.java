package com.sit.dongddonong.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Entity
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String type;
    @Column
    private String profileImgUrl;
    @Column
    private String name;
    @Column
    private String nickName;
    @Column
    private long playTime;
}
