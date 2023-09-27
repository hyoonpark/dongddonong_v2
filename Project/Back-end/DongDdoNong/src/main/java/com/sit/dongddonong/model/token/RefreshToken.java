package com.sit.dongddonong.model.token;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RefreshToken {

    @Id
    @Column(name = "refresh_token_key", nullable = false) // 컬럼 이름을 변경
    private Long key;

    @Column
    private String token;

}