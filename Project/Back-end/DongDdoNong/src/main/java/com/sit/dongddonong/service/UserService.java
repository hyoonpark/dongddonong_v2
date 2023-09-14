package com.sit.dongddonong.service;

import com.sit.dongddonong.model.User;
import com.sit.dongddonong.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;

}
