package com.sit.dongddonong.controller;


import com.sit.dongddonong.dto.TokenDto;
import com.sit.dongddonong.service.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final AuthService authService;

    @GetMapping("/login")
    public ResponseEntity login(@RequestParam String code) {
        TokenDto tokenDto = authService.login(code);
        HttpHeaders headers = authService.setTokenHeaders(tokenDto);

        return ResponseEntity.ok().headers(headers).body("accessToken: " + tokenDto.getAccessToken());
    }
}