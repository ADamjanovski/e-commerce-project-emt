package com.backend;

import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

class BackendApplicationTests {

	@Test
	void passwordEncoderBeanEncodesPasswords() {
		PasswordEncoder passwordEncoder = new BackendApplication().passwordEncoder();

		String rawPassword = "password123";
		String encodedPassword = passwordEncoder.encode(rawPassword);

		assertNotNull(encodedPassword);
		assertTrue(passwordEncoder.matches(rawPassword, encodedPassword));
	}

}
