package com.sit.dongddonong.controller;

import com.sit.dongddonong.dto.game.GameDto;
import com.sit.dongddonong.dto.game.PlayerHistoryDto;
import com.sit.dongddonong.service.GameService;
import com.sit.dongddonong.service.PlayerHistoryService;
import com.sit.dongddonong.util.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/game")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@Tag(name = "경기 영상 분석 데이터", description = "경기 영상 분석 데이터 API")
public class GameController {

    private final GameService gameService;
    private final PlayerHistoryService playerHistoryService;

    @ExceptionHandler(ChangeSetPersister.NotFoundException.class)
    private ApiResponse<String> notFoundHandle(ChangeSetPersister.NotFoundException exception) {
        return ApiResponse.fail(404, exception.getMessage());
    }

    @ExceptionHandler
    private ApiResponse<String> internalServerErrorHandler(Exception exception) {
        return ApiResponse.fail(500, exception.getMessage());
    }

    @Operation(summary = "영상 분석 데이터(분석 데이터 넣기)", description = "영상 분석 데이터를 우리 서버에 넣습니다.")
    @PatchMapping
    public ApiResponse<String> patchGame(@RequestBody GameDto gameDto) {
        gameService.patchGame(gameDto);
        return ApiResponse.ok("성공");
    }

    @Operation(summary = "경기 가져오기", description = "해당 경기를 가져옵니다.")
    @GetMapping("/{gameId}")
    public ApiResponse<GameDto> getGame(@PathVariable long gameId) {
        return ApiResponse.ok(gameService.getGame(gameId));
    }

    @Operation(summary = "경기 모두 가져오기(개발용)", description = "모든 경기를 가져옵니다.")
    @GetMapping("all")
    public ApiResponse<List<GameDto>> getAllGames() {
        return ApiResponse.ok(gameService.getAllGames());
    }

    @Operation(summary = "할당 여부에 따라 경기 가져오기(미할당된 경기 할당 필요)", description = "isAssigned 여부에 따라 경기를 가져온다. ")
    @GetMapping("/assign/{userId}")
    public ApiResponse<List<GameDto>> getAllByAssignedGames(@PathVariable("userId") long userId, @RequestParam(defaultValue = "false") boolean isAssigned) {
        return ApiResponse.ok(gameService.getAllByAssignedGames(userId, isAssigned));
    }

    @Operation(summary = "경기에 유저 할당하기", description = "경기를 유저랑 매핑한다.")
    @PatchMapping("/assign/{PlayerHistoryId}")
    public ApiResponse<String> putPlayerHistory(@PathVariable("PlayerHistoryId") long playerHistoryId, @RequestParam long userId) {
        playerHistoryService.patchPlayerHistory(playerHistoryId, userId);
        return ApiResponse.ok("성공");
    }

    @Operation(summary = "경기 목록 필터 (mode, 기간)", description = "경기를 mode, 기간별로 가져온다. (mode가 0이면 mode 전체, date가 null이면 전체)")
    @GetMapping("/player-histories/{userId}")
    public ApiResponse<List<PlayerHistoryDto>> getPlayerHistoriesByCondition(
            @PathVariable("userId") long userId,
            @RequestParam(required = false, defaultValue = "0") String mode,
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate)
            throws ParseException {
        List<PlayerHistoryDto> result = playerHistoryService.getPlayerHistoriesByCondition(userId, mode, startDate, endDate);
        return ApiResponse.ok(result);
    }

    @Operation(summary = "분석중인 경기 가져오기", description = "분석 중인 경기들을 가져옵니다.")
    @GetMapping("/analyze/{userId}")
    public ApiResponse<List<GameDto>> getAnalyzingGame(@PathVariable long userId, @RequestParam boolean isAnalyzing) {
        return ApiResponse.ok(gameService.getAnalyzingGame(userId, isAnalyzing));
    }
}
