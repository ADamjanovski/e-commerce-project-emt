package com.backend.service.domain;

import com.backend.model.domain.User;
import com.backend.model.enumaration.Role;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService  extends UserDetailsService {
    User register(String username, String password, String repeatPassword, String name, String surname, Role role);

    User login(String username, String password);

    User findByUsername(String username);

}
