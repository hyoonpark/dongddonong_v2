package com.sit.dongddonong.controller;


import com.sit.dongddonong.dto.UserDto;
import com.sit.dongddonong.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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

    private final UserService userService;

    @GetMapping("/login")
    public ResponseEntity login(@RequestParam String code) throws Exception {
        UserDto user = userService.login(code);
//        HttpHeaders headers = userService.setTokenHeaders(tokenDto);
//        return ResponseEntity.ok().headers(headers).body("accessToken: " + tokenDto.getAccessToken());
        return ResponseEntity.ok().body(user);

    }
}