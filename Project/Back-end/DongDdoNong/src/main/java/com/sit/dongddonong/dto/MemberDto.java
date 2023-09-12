package com.sit.dongddonong.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class MemberDto {
    private long id;
    private String type;
    private String profileImgUrl;
    private String name;
    private String nickName;
    private String playTime;

    @Override
    public String toString() {
        return "MemberDto{" +
                "id=" + id +
                ", type='" + type + '\'' +
                ", profileImgUrl='" + profileImgUrl + '\'' +
                ", name='" + name + '\'' +
                ", nickName='" + nickName + '\'' +
                ", playTime='" + playTime + '\'' +
                '}';
    }
}
