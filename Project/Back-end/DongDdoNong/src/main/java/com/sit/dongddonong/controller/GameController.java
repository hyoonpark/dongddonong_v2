package com.sit.dongddonong.controller;

import com.sit.dongddonong.dto.GameDto;
import com.sit.dongddonong.service.GameService;
import com.sit.dongddonong.util.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/game")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@Tag(name = "영상 분석 데이터", description = "영상 분석 데이터 API")
public class GameController {

    private final GameService gameService;

    @ExceptionHandler(ChangeSetPersister.NotFoundException.class)
    private ApiResponse<String> notFoundHandle(ChangeSetPersister.NotFoundException exception) {
        return ApiResponse.fail(404, exception.getMessage());
    }

    @ExceptionHandler
    private ApiResponse<String> internalServerErrorHandler(Exception exception) {
        return ApiResponse.fail(500, exception.getMessage());
    }
    @Operation(summary = "영상 분석 데이터", description = "영상 분석 데이터를 우리 서버에 넣습니다.")
    @PostMapping
    public ApiResponse<String> createGameAndPlayerHistories(@RequestBody GameDto gameDto) {
        gameService.createGameAndPlayerHistories(gameDto);
        return ApiResponse.ok("성공");
    }

//    @GetMapping("/{id}")
//    public ResponseEntity<String> findMatchesByUserId(@@PathVariable String uuid) throws Exception {
//        UserDto user = userService.login(code);
//        return ResponseEntity.ok().body(user);
//
//    }

}
