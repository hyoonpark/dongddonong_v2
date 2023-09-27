package com.sit.dongddonong.controller;

import com.sit.dongddonong.dto.upload.UploadRequestDto;
import com.sit.dongddonong.service.UploadService;
import com.sit.dongddonong.util.ApiResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/game/upload")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UploadController {
    private final UploadService uploadService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiResponse<String> uploadFile(@ModelAttribute UploadRequestDto uploadRequestDto) {
        try{
            uploadService.saveFileAndCreateGame(uploadRequestDto);
        }
        catch (Exception e){
            ApiResponse.ok("실패");
        }
        return ApiResponse.ok("성공");
    }
}