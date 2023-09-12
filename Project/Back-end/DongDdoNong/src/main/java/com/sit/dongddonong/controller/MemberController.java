package com.sit.dongddonong.controller;

import com.sit.dongddonong.model.Member;
import com.sit.dongddonong.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/member")
public class MemberController {

    private final MemberService memberService;
    @GetMapping
    public List<Member> all() {
        return memberService.findAll();
    }

}
