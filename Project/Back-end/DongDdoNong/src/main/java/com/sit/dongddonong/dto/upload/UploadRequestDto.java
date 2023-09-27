package com.sit.dongddonong.dto.upload;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Builder
@NoArgsConstructor(access=AccessLevel.PROTECTED)
//@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UploadRequestDto {
    private MultipartFile file;
    private long userId;
    private String gameDate;
    private String mode;
    private String fileName;
    private String videoLength;
}
