package com.backend.constants;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class JwtConstants {
    @Value("${jwt.secret}")
    public String SECRET_KEY;
    
    @Value("${jwt.expiration}")
    public Long EXPIRATION_TIME;
    
    @Value("${jwt.header}")
    public String HEADER;
    
    @Value("${jwt.prefix}")
    public String TOKEN_PREFIX;
}

