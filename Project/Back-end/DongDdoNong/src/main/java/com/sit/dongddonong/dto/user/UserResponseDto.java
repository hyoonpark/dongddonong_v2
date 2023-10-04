package com.sit.dongddonong.dto.user;

import lombok.*;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserResponseDto {
    private String profileImgUrl;
    private String nickName;
}
