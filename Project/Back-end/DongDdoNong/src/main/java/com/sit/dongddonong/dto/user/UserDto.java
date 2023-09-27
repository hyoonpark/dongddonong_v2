package com.sit.dongddonong.dto.user;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private long id;
    private String type;
    private String profileImgUrl;
    private String name;
    private String nickName;
//    private long playTime;
    private String email;
    private String accessToken;

//    public static UserDto userToDto(User user){
//        return UserDto.builder()
//                .id(user.getId())
//                .name(user.getName())
//                .nickName(user.getNickName())
//                .type(user.getType())
//                .playTime(user.getPlayTime())
//                .profileImgUrl(user.getProfileImgUrl())
//                .email(user.getEmail())
//                .build();
//    }
}
