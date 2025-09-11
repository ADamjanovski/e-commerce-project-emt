package com.backend.service.application;

import com.backend.dto.CreateUserDto;
import com.backend.dto.DisplayUserDto;
import com.backend.dto.LoginResponseDto;
import com.backend.dto.LoginUserDto;

import java.util.Optional;

public interface UserApplicationService {

    Optional<DisplayUserDto> register(CreateUserDto createUserDto);

    Optional<LoginResponseDto> login(LoginUserDto loginUserDto);

    Optional<DisplayUserDto> findByUsername(String username);
}
