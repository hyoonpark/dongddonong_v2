package com.sit.dongddonong.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.sit.dongddonong.dto.MemberDto;
import com.sit.dongddonong.service.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RequiredArgsConstructor
@RequestMapping("/auth")
@Slf4j
@RestController
public class AuthController {

    private final AuthService authService;

    @GetMapping("/login")
    public ResponseEntity login(@RequestParam String code) throws JsonProcessingException {
        MemberDto memberDto = authService.getMember(authService.login(code));
        log.info(memberDto.toString());

        return ResponseEntity.ok("ok");
    }
}