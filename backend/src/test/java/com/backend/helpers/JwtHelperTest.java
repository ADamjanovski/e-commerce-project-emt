package com.backend.helpers;

import com.backend.constants.JwtConstants;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.userdetails.User;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.Base64;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class JwtHelperTest {

    @Test
    void generateTokenCreatesValidTokenForUser() {
        JwtConstants jwtConstants = new JwtConstants();
        jwtConstants.SECRET_KEY = Base64.getEncoder().encodeToString("01234567890123456789012345678901".getBytes());
        jwtConstants.EXPIRATION_TIME = 60_000L;
        jwtConstants.HEADER = "Authorization";
        jwtConstants.TOKEN_PREFIX = "Bearer ";

        JwtHelper jwtHelper = new JwtHelper();
        ReflectionTestUtils.setField(jwtHelper, "jwtConstants", jwtConstants);

        User user = new User("alice", "password", java.util.Collections.emptyList());

        String token = jwtHelper.generateToken(user);

        assertEquals("alice", jwtHelper.extractUsername(token));
        assertTrue(jwtHelper.isValid(token, user));
    }
}
