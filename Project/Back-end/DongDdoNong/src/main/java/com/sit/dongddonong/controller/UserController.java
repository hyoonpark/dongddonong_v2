package com.sit.dongddonong.controller;


import com.sit.dongddonong.dto.UserDto;
import com.sit.dongddonong.service.UserService;
import com.sit.dongddonong.util.ApiResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UserController {

    private final UserService userService;

    @ExceptionHandler(ChangeSetPersister.NotFoundException.class)
    private ApiResponse<String> notFoundHandle(ChangeSetPersister.NotFoundException exception) {
        return ApiResponse.fail(404, exception.getMessage());
    }

    @ExceptionHandler
    private ApiResponse<String> internalServerErrorHandler(Exception exception) {
        return ApiResponse.fail(500, exception.getMessage());
    }

    @GetMapping("/login")
    public ApiResponse<UserDto> login(@RequestParam String code) throws Exception {
        UserDto user = userService.login(code);
        return ApiResponse.ok(user);
    }

    @PostMapping("/logout")
    public ApiResponse<ResponseEntity<String>> logout(@RequestParam long userId) throws Exception {
        return ApiResponse.ok(userService.logout(userId));
    }
}