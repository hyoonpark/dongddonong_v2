package com.sit.dongddonong.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class GameUpdateRequestDto {
    private Boolean isAssigned;

    @Builder
    public GameUpdateRequestDto(Boolean isAssigned){
        this.isAssigned = isAssigned;
    }

}
